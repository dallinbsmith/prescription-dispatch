#!/bin/bash

# Ralph Loop with Drift Detection
# Executes implementation plan step-by-step with verification checkpoints

# Don't use set -e as claude commands may return non-zero

PROJECT_DIR="${1:-.}"
MAX_ITERATIONS="${2:-100}"
TOOL="${3:-claude}"

cd "$PROJECT_DIR"

# Input directory
AI_COMPOSE_DIR="ai-compose"

# State files (live inside ai-compose)
STATE_FILE="$AI_COMPOSE_DIR/ralph-state.json"
PROGRESS_FILE="$AI_COMPOSE_DIR/progress.txt"

# All possible input files (all optional except IMPLEMENTATION_PLAN.md)
# These all live inside the ai-compose directory
INPUT_FILES=(
  "CORE_PRINCIPLES.md"
  "ARCHITECTURE_SPECIFICATION.md"
  "DESIGN_SPECIFICATION.md"
  "TECHNICAL_SPECIFICATION.md"
  "PROJECT_REQUEST.md"
  "PROJECT_RULES.md"
  "IMPLEMENTATION_PLAN.md"
  "EXISTING_CODE.md"
)

# Track which inputs exist
declare -a AVAILABLE_INPUTS

check_inputs() {
  echo "Checking $AI_COMPOSE_DIR/ directory..."

  # Check ai-compose directory exists
  if [[ ! -d "$AI_COMPOSE_DIR" ]]; then
    echo "ERROR: $AI_COMPOSE_DIR/ directory not found"
    echo "Create it with: mkdir $AI_COMPOSE_DIR"
    exit 1
  fi

  # IMPLEMENTATION_PLAN.md is required
  if [[ ! -f "$AI_COMPOSE_DIR/IMPLEMENTATION_PLAN.md" ]]; then
    echo "ERROR: $AI_COMPOSE_DIR/IMPLEMENTATION_PLAN.md is required (contains the numbered steps)"
    exit 1
  fi

  # Check all inputs, track which exist
  for input in "${INPUT_FILES[@]}"; do
    local filepath="$AI_COMPOSE_DIR/$input"
    if [[ -f "$filepath" ]]; then
      AVAILABLE_INPUTS+=("$filepath")
      echo "  ✓ $input"
    else
      echo "  - $input (not found, skipping)"
    fi
  done

  echo ""
  echo "Found ${#AVAILABLE_INPUTS[@]} input file(s) in $AI_COMPOSE_DIR/"
}

init_state() {
  if [[ ! -f "$STATE_FILE" ]]; then
    local step_count
    step_count=$(grep -cE "^[0-9]+\." "$AI_COMPOSE_DIR/IMPLEMENTATION_PLAN.md" || echo "0")

    jq -n \
      --argjson total "$step_count" \
      --argjson inputs "$(printf '%s\n' "${AVAILABLE_INPUTS[@]}" | jq -R . | jq -s .)" \
      '{
        current_step: 1,
        total_steps: $total,
        completed_steps: [],
        verification_results: [],
        drift_reviews: [],
        available_inputs: $inputs,
        status: "in_progress",
        iteration: 0
      }' > "$STATE_FILE"

    echo "Initialized state with $step_count steps."
  else
    echo "Resuming from existing state."
  fi
}

get_state() {
  jq -r ".$1" "$STATE_FILE"
}

update_state() {
  local tmp
  tmp=$(mktemp)
  jq "$1" "$STATE_FILE" > "$tmp" && mv "$tmp" "$STATE_FILE"
}

build_context() {
  echo "<CONTEXT>"

  # Include all available input files
  for input in "${AVAILABLE_INPUTS[@]}"; do
    if [[ -f "$input" ]]; then
      local filename
      filename=$(basename "$input" .md)
      echo "<$filename>"
      cat "$input"
      echo "</$filename>"
    fi
  done

  echo "<PROGRESS>"
  if [[ -f "$PROGRESS_FILE" ]]; then
    cat "$PROGRESS_FILE"
  else
    echo "No progress yet."
  fi
  echo "</PROGRESS>"

  echo "<STATE>"
  cat "$STATE_FILE"
  echo "</STATE>"
  echo "</CONTEXT>"
}

# Build dynamic verification instructions based on available inputs
build_verify_against() {
  local items=()
  [[ -f "$AI_COMPOSE_DIR/CORE_PRINCIPLES.md" ]] && items+=("CORE_PRINCIPLES")
  [[ -f "$AI_COMPOSE_DIR/ARCHITECTURE_SPECIFICATION.md" ]] && items+=("ARCHITECTURE_SPECIFICATION")
  [[ -f "$AI_COMPOSE_DIR/DESIGN_SPECIFICATION.md" ]] && items+=("DESIGN_SPECIFICATION")
  [[ -f "$AI_COMPOSE_DIR/TECHNICAL_SPECIFICATION.md" ]] && items+=("TECHNICAL_SPECIFICATION")
  [[ -f "$AI_COMPOSE_DIR/PROJECT_REQUEST.md" ]] && items+=("PROJECT_REQUEST")
  [[ -f "$AI_COMPOSE_DIR/PROJECT_RULES.md" ]] && items+=("PROJECT_RULES")

  if [[ ${#items[@]} -eq 0 ]]; then
    echo "the implementation plan"
  else
    local IFS=", "
    echo "${items[*]}"
  fi
}

run_step_execution() {
  local step=$1
  local context
  context=$(build_context)
  local verify_against
  verify_against=$(build_verify_against)

  cat <<EOF
$context

<TASK>
You are executing step $step of the IMPLEMENTATION_PLAN.

INSTRUCTIONS:
1. Read the IMPLEMENTATION_PLAN and identify step $step
2. Execute ONLY step $step - do not proceed to other steps
3. After implementation, verify your work against: $verify_against
4. Document what you implemented and any deviations

OUTPUT FORMAT:
<STEP_EXECUTION>
<STEP_NUMBER>$step</STEP_NUMBER>
<DESCRIPTION>[What this step required]</DESCRIPTION>
<IMPLEMENTATION>[What you actually did]</IMPLEMENTATION>
<FILES_MODIFIED>[List of files changed]</FILES_MODIFIED>
</STEP_EXECUTION>

<VERIFICATION>
EOF

  # Add verification sections for each available spec
  [[ -f "$AI_COMPOSE_DIR/CORE_PRINCIPLES.md" ]] && cat <<EOF
<CORE_PRINCIPLES_CHECK>
[For each principle, confirm compliance or note deviation]
</CORE_PRINCIPLES_CHECK>
EOF

  [[ -f "$AI_COMPOSE_DIR/ARCHITECTURE_SPECIFICATION.md" ]] && cat <<EOF
<ARCHITECTURE_SPEC_CHECK>
[Confirm alignment with architecture specification]
</ARCHITECTURE_SPEC_CHECK>
EOF

  [[ -f "$AI_COMPOSE_DIR/DESIGN_SPECIFICATION.md" ]] && cat <<EOF
<DESIGN_SPEC_CHECK>
[Confirm alignment with design specification]
</DESIGN_SPEC_CHECK>
EOF

  [[ -f "$AI_COMPOSE_DIR/TECHNICAL_SPECIFICATION.md" ]] && cat <<EOF
<TECHNICAL_SPEC_CHECK>
[Confirm alignment with technical specification]
</TECHNICAL_SPEC_CHECK>
EOF

  [[ -f "$AI_COMPOSE_DIR/PROJECT_RULES.md" ]] && cat <<EOF
<PROJECT_RULES_CHECK>
[For each rule, confirm compliance or note deviation]
</PROJECT_RULES_CHECK>
EOF

  cat <<EOF
<ISSUES_FOUND>[Any issues or deviations - "None" if compliant]</ISSUES_FOUND>
<CORRECTIVE_ACTIONS>[Actions taken to fix issues - "None" if compliant]</CORRECTIVE_ACTIONS>
</VERIFICATION>

<STEP_RESULT>
<STATUS>[PASS or FAIL]</STATUS>
<SUMMARY>[One-line summary]</SUMMARY>
</STEP_RESULT>
</TASK>
EOF
}

run_drift_review() {
  local current_step=$1
  local context
  context=$(build_context)

  cat <<EOF
$context

<TASK>
DRIFT REVIEW - Steps 1 through $current_step

You are conducting a comprehensive drift review. This occurs every 5 steps to ensure
the implementation remains aligned with specifications.

INSTRUCTIONS:
1. Review ALL completed steps (1 through $current_step)
2. Check the cumulative implementation against all available specifications
3. Identify any drift, inconsistencies, or hallucinations
4. Recommend corrective actions if needed

OUTPUT FORMAT:
<DRIFT_REVIEW>
<REVIEW_SCOPE>Steps 1-$current_step</REVIEW_SCOPE>

<CUMULATIVE_ANALYSIS>
EOF

  [[ -f "$AI_COMPOSE_DIR/CORE_PRINCIPLES.md" ]] && cat <<EOF
<CORE_PRINCIPLES_ALIGNMENT>
[How well does the cumulative work align with core principles? Score 1-10]
[Details on any drift]
</CORE_PRINCIPLES_ALIGNMENT>
EOF

  [[ -f "$AI_COMPOSE_DIR/ARCHITECTURE_SPECIFICATION.md" ]] && cat <<EOF
<ARCHITECTURE_SPEC_ALIGNMENT>
[How well does implementation match architecture spec? Score 1-10]
[Details on any drift]
</ARCHITECTURE_SPEC_ALIGNMENT>
EOF

  [[ -f "$AI_COMPOSE_DIR/DESIGN_SPECIFICATION.md" ]] && cat <<EOF
<DESIGN_SPEC_ALIGNMENT>
[How well does implementation match design spec? Score 1-10]
[Details on any drift]
</DESIGN_SPEC_ALIGNMENT>
EOF

  [[ -f "$AI_COMPOSE_DIR/TECHNICAL_SPECIFICATION.md" ]] && cat <<EOF
<TECHNICAL_SPEC_ALIGNMENT>
[How well does implementation match technical spec? Score 1-10]
[Details on any drift]
</TECHNICAL_SPEC_ALIGNMENT>
EOF

  [[ -f "$AI_COMPOSE_DIR/PROJECT_REQUEST.md" ]] && cat <<EOF
<PROJECT_REQUEST_ALIGNMENT>
[Are we still solving the right problem? Score 1-10]
[Details on any drift]
</PROJECT_REQUEST_ALIGNMENT>
EOF

  [[ -f "$AI_COMPOSE_DIR/PROJECT_RULES.md" ]] && cat <<EOF
<PROJECT_RULES_COMPLIANCE>
[Are all rules still being followed? Score 1-10]
[List any violations]
</PROJECT_RULES_COMPLIANCE>
EOF

  cat <<EOF
</CUMULATIVE_ANALYSIS>

<DRIFT_DETECTED>
[List specific instances of drift, or "None detected"]
</DRIFT_DETECTED>

<HALLUCINATIONS_DETECTED>
[List any features/code that weren't in the spec, or "None detected"]
</HALLUCINATIONS_DETECTED>

<CORRECTIVE_ACTIONS_REQUIRED>
[Specific fixes needed, or "None required"]
</CORRECTIVE_ACTIONS_REQUIRED>

<REVIEW_RESULT>
<STATUS>[ALIGNED or DRIFT_DETECTED or CRITICAL_DRIFT]</STATUS>
<OVERALL_SCORE>[Average of alignment scores]</OVERALL_SCORE>
<SUMMARY>[Brief summary of review findings]</SUMMARY>
</REVIEW_RESULT>
</DRIFT_REVIEW>
</TASK>
EOF
}

run_final_verification() {
  local context
  context=$(build_context)

  cat <<EOF
$context

<TASK>
FINAL VERIFICATION - Complete Project Review

This is the final verification pass. The implementation is complete.
You must now verify the ENTIRE project against ALL available specifications.

INSTRUCTIONS:
1. Review the complete implementation
2. Verify against every item in each available specification
3. Check for any hallucinations (features not in spec)
4. Check for any omissions (spec items not implemented)
5. Provide final verdict

OUTPUT FORMAT:
<FINAL_VERIFICATION>
<SCOPE>Complete project review</SCOPE>
EOF

  [[ -f "$AI_COMPOSE_DIR/CORE_PRINCIPLES.md" ]] && cat <<EOF

<CORE_PRINCIPLES_AUDIT>
[For EACH principle in CORE_PRINCIPLES.md:]
<PRINCIPLE name="[principle name]">
  <STATUS>[COMPLIANT or VIOLATION]</STATUS>
  <EVIDENCE>[Specific code/behavior demonstrating compliance or violation]</EVIDENCE>
</PRINCIPLE>
</CORE_PRINCIPLES_AUDIT>
EOF

  [[ -f "$AI_COMPOSE_DIR/ARCHITECTURE_SPECIFICATION.md" ]] && cat <<EOF

<ARCHITECTURE_SPEC_AUDIT>
[For EACH item in ARCHITECTURE_SPECIFICATION.md:]
<ARCHITECTURE_ITEM id="[item id/name]">
  <STATUS>[IMPLEMENTED or PARTIAL or MISSING]</STATUS>
  <EVIDENCE>[Where/how it's implemented]</EVIDENCE>
</ARCHITECTURE_ITEM>
</ARCHITECTURE_SPEC_AUDIT>
EOF

  [[ -f "$AI_COMPOSE_DIR/DESIGN_SPECIFICATION.md" ]] && cat <<EOF

<DESIGN_SPEC_AUDIT>
[For EACH item in DESIGN_SPECIFICATION.md:]
<DESIGN_ITEM id="[item id/name]">
  <STATUS>[IMPLEMENTED or PARTIAL or MISSING]</STATUS>
  <EVIDENCE>[Where/how it's implemented]</EVIDENCE>
</DESIGN_ITEM>
</DESIGN_SPEC_AUDIT>
EOF

  [[ -f "$AI_COMPOSE_DIR/TECHNICAL_SPECIFICATION.md" ]] && cat <<EOF

<TECHNICAL_SPEC_AUDIT>
[For EACH requirement in TECHNICAL_SPECIFICATION.md:]
<REQUIREMENT id="[requirement id/name]">
  <STATUS>[IMPLEMENTED or PARTIAL or MISSING]</STATUS>
  <EVIDENCE>[Where/how it's implemented]</EVIDENCE>
</REQUIREMENT>
</TECHNICAL_SPEC_AUDIT>
EOF

  [[ -f "$AI_COMPOSE_DIR/PROJECT_REQUEST.md" ]] && cat <<EOF

<PROJECT_REQUEST_AUDIT>
[For EACH objective in PROJECT_REQUEST.md:]
<OBJECTIVE name="[objective]">
  <STATUS>[MET or PARTIAL or UNMET]</STATUS>
  <EVIDENCE>[How it's satisfied]</EVIDENCE>
</OBJECTIVE>
</PROJECT_REQUEST_AUDIT>
EOF

  [[ -f "$AI_COMPOSE_DIR/PROJECT_RULES.md" ]] && cat <<EOF

<PROJECT_RULES_AUDIT>
[For EACH rule in PROJECT_RULES.md:]
<RULE name="[rule]">
  <STATUS>[FOLLOWED or VIOLATED]</STATUS>
  <EVIDENCE>[Specific compliance or violation]</EVIDENCE>
</RULE>
</PROJECT_RULES_AUDIT>
EOF

  cat <<EOF

<HALLUCINATION_CHECK>
<UNAUTHORIZED_FEATURES>
[List any implemented features NOT in the specifications]
</UNAUTHORIZED_FEATURES>
<SCOPE_CREEP>
[Any functionality that exceeds the original request]
</SCOPE_CREEP>
</HALLUCINATION_CHECK>

<OMISSION_CHECK>
<MISSING_REQUIREMENTS>
[List any spec requirements that weren't implemented]
</MISSING_REQUIREMENTS>
</OMISSION_CHECK>

<FINAL_VERDICT>
<STATUS>[APPROVED or NEEDS_REVISION]</STATUS>
<COMPLIANCE_SCORE>[Percentage of requirements met]</COMPLIANCE_SCORE>
<CRITICAL_ISSUES>[List critical issues, or "None"]</CRITICAL_ISSUES>
<MINOR_ISSUES>[List minor issues, or "None"]</MINOR_ISSUES>
<SUMMARY>[Final assessment summary]</SUMMARY>
</FINAL_VERDICT>
</FINAL_VERIFICATION>
</TASK>
EOF
}

execute_with_tool() {
  local prompt="$1"
  local mode="$2"
  local result
  local exit_code
  local prompt_file

  # Write prompt to temp file to avoid argument length limits
  prompt_file=$(mktemp)
  printf '%s' "$prompt" > "$prompt_file"

  if [[ "$TOOL" == "claude" ]]; then
    # Use -p for print mode, read prompt from file via stdin
    result=$(claude -p < "$prompt_file" 2>&1) || exit_code=$?
  else
    result=$($TOOL < "$prompt_file" 2>&1) || exit_code=$?
  fi

  rm -f "$prompt_file"

  if [[ -n "$exit_code" && "$exit_code" -ne 0 ]]; then
    echo "WARNING: Tool exited with code $exit_code" >&2
  fi

  echo "$result"
}

append_progress() {
  local entry="$1"
  echo "" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
  echo "$(date -Iseconds)" >> "$PROGRESS_FILE"
  echo "$entry" >> "$PROGRESS_FILE"
}

main() {
  echo "=== Ralph Loop with Drift Detection ==="
  echo "Project: $PROJECT_DIR"
  echo "Tool: $TOOL"
  echo ""

  check_inputs
  init_state

  local iteration=0

  while [[ $iteration -lt $MAX_ITERATIONS ]]; do
    iteration=$((iteration + 1))
    update_state ".iteration = $iteration"

    local current_step
    current_step=$(get_state "current_step")
    local total_steps
    total_steps=$(get_state "total_steps")
    local status
    status=$(get_state "status")

    echo ""
    echo "=== Iteration $iteration | Step $current_step of $total_steps ==="

    if [[ "$status" == "complete" ]]; then
      echo "Project complete. Running final verification..."

      local final_prompt
      final_prompt=$(run_final_verification)
      local final_result
      final_result=$(execute_with_tool "$final_prompt" "final")

      append_progress "FINAL VERIFICATION:
$final_result"

      echo ""
      echo "=== RALPH LOOP COMPLETE ==="
      echo "$final_result"

      # Clean up state file for fresh start next time
      rm -f "$STATE_FILE"
      echo ""
      echo "Cleaned up $STATE_FILE for next run."
      exit 0
    fi

    # Execute current step
    echo "Executing step $current_step..."
    local step_prompt
    step_prompt=$(run_step_execution "$current_step")
    local step_result
    step_result=$(execute_with_tool "$step_prompt" "step")

    append_progress "STEP $current_step EXECUTION:
$step_result"

    # Check if step passed (basic check - could be enhanced)
    if echo "$step_result" | grep -q "<STATUS>PASS</STATUS>"; then
      echo "Step $current_step: PASS"
      update_state ".completed_steps += [$current_step]"

      # Check if drift review is needed (every 5 steps)
      if [[ $((current_step % 5)) -eq 0 ]]; then
        echo ""
        echo "--- Drift Review (every 5 steps) ---"
        local drift_prompt
        drift_prompt=$(run_drift_review "$current_step")
        local drift_result
        drift_result=$(execute_with_tool "$drift_prompt" "drift")

        append_progress "DRIFT REVIEW (Steps 1-$current_step):
$drift_result"

        update_state ".drift_reviews += [{\"after_step\": $current_step, \"result\": \"completed\"}]"

        if echo "$drift_result" | grep -q "CRITICAL_DRIFT"; then
          echo "CRITICAL DRIFT DETECTED - Manual intervention required"
          update_state '.status = "drift_detected"'
          exit 1
        fi
      fi

      # Move to next step
      local next_step=$((current_step + 1))
      if [[ $next_step -gt $total_steps ]]; then
        update_state '.status = "complete"'
        echo "All steps complete. Final verification will run on next iteration."
      else
        update_state ".current_step = $next_step"
      fi

    else
      echo "Step $current_step: FAIL - Will retry"
    fi

    # Commit progress
    if git rev-parse --git-dir > /dev/null 2>&1; then
      git add -A
      git commit -m "Ralph: Step $current_step iteration $iteration" --allow-empty 2>/dev/null || true
    fi

    echo ""
    echo "Iteration $iteration complete. Continuing..."
    sleep 1

  done

  echo "Max iterations reached."
  exit 1
}

main
