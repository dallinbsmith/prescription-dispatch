export interface PatientProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    street1: string;
    street2: string | null;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  } | null;
  user: {
    email: string;
    phone: string | null;
  };
  allergies: Allergy[];
  medications: Medication[];
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: string;
  reaction: string | null;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string | null;
  frequency: string | null;
  isActive: boolean;
}
