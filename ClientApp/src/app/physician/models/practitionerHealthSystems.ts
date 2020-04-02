import { Practitioner } from "../profile/models/practitioner";
import { HealthSystem } from "./healthSystem";
import { Staff } from "./staff";

export class PractitionerHealthSystems {
  practitioner: Practitioner;
  staff: Staff;
  healthSystems: HealthSystem[] = [];
}
