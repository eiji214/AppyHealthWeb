import { HealthSystemLocation } from './healthSystemLocation';

export class HealthSystem {
  Id: number;
  Name: string;
  OtherOrganizationName: string;

  LogoUrl: string;
  PhotoUrl: string;

  NPI: string;
  NPIType: string;

  ProviderType: string;
  Specialty: string;
  Title: string;

  Active: boolean;
  BoardCertified: boolean;
  CanEdit: boolean;
  IsFavorite: boolean;
  IsSpecialist: boolean;
  
  PracticeFax: string;
  PracticeMainPhone: string;
  PracticeManagerName: string;
  PracticeManagerNumber: string;
  PrimaryPhoneNumber: string;
  FaxNumber: string;

  Bio: string;
  HealthSystemSpecialty: HealthSystemSpecialty[]; 

  HealthSystemLocation: HealthSystemLocation[];
}

export class HealthSystemSpecialty {
  Specialty: Specialty;
}

export class Specialty {
  Name: string;
  Category: string;
}
