import { PractitionerAvailability } from './practitionerAvailability';
import { PatientAvailability } from './patientAvailability';
import { Practitioner } from './practitioner';

export interface Referral {
  Id: number;
  PatientId: number;
  PatientFullName: string;
  PatientLocation: string;
  PatientPrimaryPhoneNumber: string;
  Symptom: string;
  Status: string;
  ReferralDate: Date;
  PractitionerId: number;
  PractitionerFullName: string;
  PractitionerPrimaryPhoneNumber: string;
  PractitionerPracticeName: string;
  PractitionerPhotoUrl: string;
  PractitionerLocationID: number;
  AppointmentDate: Date;
  ConfirmedByPatient: boolean;
  PatientAvailability: PatientAvailability[];
  PractitionerAvailability: PractitionerAvailability[];
  Practitioner: Practitioner;
  FromPractitioner: Practitioner;
  FromPractitionerId: number;
  Location: Location;
  IsActive: boolean;
}
