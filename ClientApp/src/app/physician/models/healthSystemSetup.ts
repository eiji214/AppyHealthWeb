import { HealthSystem } from "./healthSystem";
import { PractitionerHealthSystems } from "./practitionerHealthSystems";

export class HealthSystemSetup {
  primary: HealthSystem;
  children: HealthSystem[] = [];

  physicians: PractitionerHealthSystems[];
  midLevels: PractitionerHealthSystems[];
  staff: PractitionerHealthSystems[];
}
