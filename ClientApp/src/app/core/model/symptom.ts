import { Specialty } from './specialty';

export interface Symptom {
  Id: number;
  Name: string;

  Specialties: Specialty[];
}
