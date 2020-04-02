import {Patient} from "./patient";

export interface PatientAvailability {
  Id: number;
  PatientId: number;
  SpecialistId: number;
  Date: Date;
  IsMorning: boolean;
  IsAfternoon: boolean;
  ReferralId: number;
  DayOfWeek: string;

  Patient: Patient;
}
