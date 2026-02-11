import { jest } from "@jest/globals";
import type { Patient, Prescription, User } from "@rx/types";

export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: "user-123",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  role: "patient",
  platform: "patient",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  ...overrides,
});

export const createMockPatient = (overrides: Partial<Patient> = {}): Patient => ({
  ...createMockUser(),
  role: "patient" as const,
  dateOfBirth: new Date("1990-01-15"),
  allergies: [],
  medications: [],
  ...overrides,
});

export const createMockPrescription = (
  overrides: Partial<Prescription> = {}
): Prescription => ({
  id: "rx-123",
  patientId: "patient-123",
  prescriberId: "prescriber-123",
  drugName: "Test Medication",
  dosage: "10mg",
  quantity: 30,
  refillsRemaining: 2,
  status: "pending",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  ...overrides,
});

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface MockResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
  text: () => Promise<string>;
}

export const createMockResponse = (response: unknown, status = 200): MockResponse => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(response),
  text: () => Promise.resolve(JSON.stringify(response)),
});

export const mockFetch = (response: unknown, status = 200): (() => Promise<MockResponse>) => {
  const mockResponse = createMockResponse(response, status);
  return jest.fn<() => Promise<MockResponse>>().mockResolvedValue(mockResponse);
};
