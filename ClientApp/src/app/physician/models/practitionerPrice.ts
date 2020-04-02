import { Practitioner } from "../profile/models/practitioner";

export class PractitionerPrice {
  practitioner: Practitioner;
  isBeingActivated: boolean;
  isFree: boolean;
  price: number;
}
