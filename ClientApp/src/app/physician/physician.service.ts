import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Provider } from './profile/models/provider';
import { Practitioner } from "./profile/models/practitioner";
import { HealthSystem } from "./models/healthSystem";
import { HealthSystemCreate } from "./models/healthSystemCreate";
import { HealthSystemTier } from "./models/healthSystemTier";
import { HealthSystemPaymentInformation } from "./models/healthSystemPaymentInformation";
import { HealthSystemPractitioner } from "./profile/models/healthSystemPractitioner";
import { User } from "./models/user";
import { Staff } from "./models/staff";

@Injectable()
export class PhysicianService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = '/api/';
  //url = 'https://appyhealthapitest.azurewebsites.net/api';
  baseUrlProviders = '/api/providers';

  getPractitioner(id: number): Observable<Practitioner> {
    return this.httpClient.get<Practitioner>(`${this.baseUrl}get?url=providers/${id}`);
  }

  updatePractitioner(practitioner: Practitioner): Observable<Practitioner> {
    console.log(practitioner);
    return this.httpClient.put<Practitioner>(`${this.baseUrl}put?url=providers/Update`, practitioner);
  }

  getHealthSystem(id: number): Observable<HealthSystem[]> {
    return this.httpClient.get<HealthSystem[]>(`${this.baseUrl}get?url=healthsystem/${id}`);
  }

  getMyHealthSystems(): Observable<HealthSystem[]> {
    return this.httpClient.get<HealthSystem[]>(`${this.baseUrl}get?url=user/myhealthsystems`);
  }

  getChildHealthSystems(id: number): Observable<HealthSystem[]> {
    return this.httpClient.get<HealthSystem[]>(`${this.baseUrl}get?url=healthsystem/Children/${id}`);
  }

  getHealthSystemPractitioners(id: number): Observable<HealthSystemPractitioner[]> {
    return this.httpClient.get<HealthSystemPractitioner[]>(`${this.baseUrl}get?url=healthsystem/Practitioners/${id}`);
  }

  getMyHealthSystemPhysicians(): Observable<Practitioner[]> {
    return this.httpClient.get<Practitioner[]>(`${this.baseUrl}get?url=user/myassociates`);
  }

  getMyHealthSystemAdminUsers(healtSystemId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}get?url=healthsystem/AdminUsers/${healtSystemId}`);
  }

  getMyHealthSystemNonphysicians(): Observable<Practitioner[]> {
    return this.httpClient.get<Practitioner[]>(`${this.baseUrl}get?url=user/mynonphysicians`);
  }

  saveHealthSystem(healthSystem: HealthSystem): Observable<HealthSystem> {
    return this.httpClient.put<HealthSystem>(`${this.baseUrl}put?url=healthsystem/update`, healthSystem);
  }

  updateHealthSystemLogo(providerId: number, file) : Observable<any> {
    let input: FormData = new FormData();
    input.append('file', file, file.name);

    return this.httpClient.post<any>(`${this.baseUrl}PostForm?url=healthsystem/Photo/${providerId}`, input);
  }

  addHealthSystem(healthSystem: HealthSystemCreate): Observable<HealthSystemCreate> {
    return this.httpClient.post<HealthSystemCreate>(`${this.baseUrl}post?url=user/createhealthsystem`, healthSystem);
  }

  saveChildHealthSystem(id: number, childId: number): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}putnobody?url=healthsystem/Children/${id}/${childId}`, null);
  }


  getProvider(id: number): Observable<Practitioner> {
    return this.httpClient.get<Practitioner>(`${this.baseUrl}get?url=providers/${id}`);
  }

  saveProvider(provider: Practitioner) : Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}put?url=providers/Update`, provider);
  }

  addPractitioner(provider: Practitioner): Observable<Staff> {
    return this.httpClient.post<Staff>(`${this.baseUrl}post?url=user/create`, provider);
  }

  addLocation(healthSystem: HealthSystem): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}post?url=healthsystem/createlocation`, healthSystem);
  }

  deleteLocation(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}delete?url=healthsystem/deletelocation/${id}`);
  }

  searchHealthSystem(npi: string): Observable<HealthSystem> {
    return this.httpClient.get<HealthSystem>(`${this.baseUrl}get?url=NPI/SearchNPI/2/${npi}`);
  }

  searchProvider(npi: string): Observable<Practitioner> {
    return this.httpClient.get<Practitioner>(`${this.baseUrl}get?url=NPI/SearchNPI/1/${npi}`);
  }

  addPractitionerToHealthSystem(healthSystemId: number, practitionerId: number): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}putnobody?url=healthsystem/AddPractitioner/${healthSystemId}/${practitionerId}`, null);
  }

  removePractitionerFromHealthSystem(healthSystemId: number, practitionerId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}delete?url=healthsystem/RemovePractitioner/${healthSystemId}/${practitionerId}`);
  }

  removeChildHealthSystem(id: number, childId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}delete?url=healthsystem/Children/${id}/${childId}`);
  }

  getMe(): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + 'get?url=user/');
  }

  addUser(s: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(`${this.baseUrl}post?url=user/createstaff`, s);
  }

  updateStaff(s: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(`${this.baseUrl}post?url=user/updatestaff`, s);
  }

  updateUser(u: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}post?url=user/updatestaff`, u);
  }

  addUserToHealthSystem(healthSystemId: number, locationId: number, userId: number, userRoleId: number): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}putnobody?url=healthsystem/AddLocationUser/${healthSystemId}/${locationId}/${userId}/${userRoleId}`, null);
  }

  removeUserFromHealthSystem(healthSystemId: number, locationId: number, userId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}delete?url=healthsystem/RemoveLocationUser/${healthSystemId}/${locationId}/${userId}`);
  }

  uploadPhoto(file, providerId) {
    let input:FormData = new FormData();
    input.append('file', file, file.name);


                                                                return this.httpClient.post(`${this.baseUrl}PostForm?url=providers/Photo/${providerId}`, input);
  }


  getTiers() : Observable<HealthSystemTier[]> {
    return this.httpClient.get<HealthSystemTier[]>(`${this.baseUrl}get?url=healthSystem/Tiers`);
  }

  putSubscribeTire(healthSystem: HealthSystem, tierId: number) : Observable<HealthSystem> {
    return this.httpClient.put<HealthSystem>(`${this.baseUrl}put?url=healthsystem/SubscribeTier/${healthSystem.Id}/${tierId}`, healthSystem);
  }

  putUpdateMyAssociates(User: User) : Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}post?url=user/updatestaff`, User);
  }

  updatePaymentInformation(paymentInfo: HealthSystemPaymentInformation) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}post?url=healthsystem/UpdatePaymentInformation`, paymentInfo);
  }
}
