import { Practitioner } from "../profile/models/practitioner";
import { HealthSystem } from "./healthSystem";

export class HealthSystemPractitioners {
  healthSystem: HealthSystem;
  physicians: Practitioner[] = [];
  midLevels: Practitioner[] = [];
  staff: Practitioner[] = [];
}
