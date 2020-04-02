import { HealthSystem } from "./healthSystem";
import { PractitionerPrice } from "./practitionerPrice";
import { HealthSystemTier } from "./healthSystemTier";
import { SelectionModel } from "@angular/cdk/collections";
import { Practitioner } from "../profile/models/practitioner";

export class HealthSystemPrice {
  healthSystem: HealthSystem;
  physicians: PractitionerPrice[] = [];
  midLevels: PractitionerPrice[] = [];
  staff: PractitionerPrice[] = [];
  tier: HealthSystemTier = new HealthSystemTier;
  physiciansSelection: SelectionModel<Practitioner> = new SelectionModel<Practitioner>(true, []);
  midLevelssSelection: SelectionModel<Practitioner> = new SelectionModel<Practitioner>(true, []);
}
