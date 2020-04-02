import { PractitionerLocation } from "./practitioner";

export class Provider {
  //Id: number;
  //FirstName: string;
  //LastName: string;

  //FullName: string;

  //PracticeName: string;
  //PrimaryPhoneNumber: string;

  //Specialty: string;
  //SubSpecialty: string;
  //NPI: string;
  //PracticeWebsite: string;

  Active: boolean;
  BoardCertified: boolean;
  CanEdit: boolean;
  Deceased: boolean;
  FaxNumber: string;
  FirstName: string;
  FullName: string;
  Gender: string;
  //HealthSystemPractitioner: [];
  Id: number;
  LastName: string;
  NPI: string;
  PracticeFax: string;
  PracticeMainPhone: string;
  PracticeName: string;
  //PractitionerFavorite: []
  //PractitionerInsurancePlan: []
  //PractitionerLocation: []
  //PractitionerProcedure: []
  //PractitionerSpecialty: []
  PrimaryPhoneNumber: string;
  //Referral: []
  Specialty: string;
  Title: string;
  //Users: []

  PractitionerLocation: PractitionerLocation[];


}

