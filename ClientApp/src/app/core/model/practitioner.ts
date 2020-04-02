import { Specialty } from './specialty';
import { Procedure } from './procedure';
import { InsurancePlan } from './insurancePlan';
import { Location } from './location';
import { Address } from './address';
import { PractitionerInsurancePlan } from './practitionerInsurancePlan';

export interface Practitioner {
  Id: number;
  FirstName: string;
  LastName: string;
  FullName: string;
  PracticeName: string;
  PrimaryPhoneNumber: string;
  SecondaryPhoneNumber: string;
  PrimaryEmailAddress: string;
  Gender: string;
  BirthDate: Date;
  Deceased: boolean;
  DeceasedDate: Date;
  PhotoUrl: string;
  Bio: string;
  BoardCertified: boolean;
  Title: string;
  HumanTouch: string;
  AddressId: number;
  IsSpecialist: boolean;
  IsFavorite: boolean;
  FaxNumber: string;
  MiddleName: string;
  SubSpecialty: string;
  Symptoms: string;
  Specialty: string;
  NPI: string;
  HelpfulHints: string;
  HospitalAffiliations: string;
  HospoitalAffiliationAddress: string;
  HospoitalAffiliationNumber: string;
  PatientVideoUrl: string;
  InsuranceCarrierName: string;
  InsurancePlanName: string;
  Latitude: any;
  Longitude: any;
  CanEdit: boolean;
  PracticeLocation?: string;
  Education: string;
  FrontDeskName: string;
  PracticeHours: string;

  Address: Address;
  Specialties: Specialty[];
  PractitionerLocation: PractitionerLocation[];
  Procedures: Procedure[];
  InsurancePlans: InsurancePlan[];
  PractitionerInsurancePlan: PractitionerInsurancePlan[];
}

export interface PractitionerLocation {
  DateStarted: Date;
  DateEnded?: Date;
  Location: Location;
  LocationId: number;
  PractitionerId: number;
  IsExpanded?: boolean;
  IsEditing?: boolean;
  ShouldDelete?: boolean;
  Availability?: any;
}

export interface Availability {
  SundayStart: string;
  SundayEnd: string;
  MondayStart: string;
  MondayEnd: string;
  TuesdayStart: string;
  TuesdayEnd: string;
  WednesdayStart: string;
  WednesdayEnd: string;
  ThursdayStart: string;
  ThursdayEnd: string;
  FridayStart: string;
  FridayEnd: string;
  SaturdayStart: string;
  SaturdayEnd: string;
}
