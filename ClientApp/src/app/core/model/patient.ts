import { Address } from '../../core/model/address';
import { Referral } from './referral';

export interface Patient {
  Id: number;
  UserId: number;
  FirstName: string;
  LastName: string;
  BirthDate: Date;
  Gender: string;
  PrimaryPhoneNumber: string;
  PrimaryEmailAddress: string;
  SecondaryPhoneNumber: string;
  NextAppointment: Referral;
  Address: Address;
  InsuranceNetwork: string;
  InsuranceMemberName: string;
  InsuranceIDNumber: string;
  InsuranceGroupNumber: string;
  InsurancePlanID?: number;
  InsuranceEligibility: string;
}
