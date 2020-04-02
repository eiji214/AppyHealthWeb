export interface PractitionerAvailability {
  ID: number;
  ReferralId: number;
  PractitionerID: number;
  AppointmentDate?: Date;
  SelectedByUser: boolean;
}
