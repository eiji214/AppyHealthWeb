import { Address } from './address';

export interface Location {
  Id: number;
  Status: string;
  Name: string;
  Description: string;
  PrimaryPhoneNumber: string;
  SecondaryPhoneNumber: string;
  PrimaryEmailAddress: string;
  AddressId: number;
  Address: Address;
  WebAddress: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Hours: string;
  Fax: string;
  ManagerName: string;
  ManagerNumber: string;
  ManagerEmail: string;
  ClinicalSchedulerName: string;
  ClinicalSchedulerNumber: string;
  ClinicalSchedulerEmail: string;
  SurgicalSchedulerName: string;
  SurgicalSchedulerNumber: string;
  SurgicalSchedulerEmail: string;
  FrontDeskName: string;
  FrontDeskNumber: string;
  FrontDeskEmail: string;
  MedicalRecordsName: string;
  MedicalRecordsNumber: string;
  MedicalRecordsEmail: string;
  Notes: string;
  HelpfulTips: string;
  Latitude?: number;
  Longitude?: number;
}
