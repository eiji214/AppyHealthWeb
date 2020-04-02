import { HealthSystem } from "./healthSystem";
import { Location } from "./location";
import { User } from "./user";

export class HealthSystemCreate {
  healthsystem: HealthSystem;
  user: User;
  location: Location;
}
