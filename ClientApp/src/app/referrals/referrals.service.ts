import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Referral } from '../core/model/referral';
import { ReferralNote } from '../core/model/appointmentNote';

@Injectable({
  providedIn: 'root'
})
export class ReferralsService {

  constructor(private httpClient: HttpClient) { }

  url = '/api/';

//new refferal
  getPracticeIncoming(): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/PracticeIncoming');
  }

  getPracticeOutgoing(): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/PracticeOutgoing ');
  }

  getPracticePatient(): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/PracticePatient  ');
  }


  getReferrals(): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/');
  }

  getReferral(id: number): Observable<Referral> {
    return this.httpClient.get<Referral>(this.url + 'get?url=referrals/GetReferral/' + id);
  }

  getSpecialistReferrals(id: number): Observable<Referral> {
    return this.httpClient.get<Referral>(this.url + 'get?url=referrals/Specialist/' + id);
  }

  getPatientProviderReferral(patientId: number, doctorId: number): Observable<Referral> {
    return this.httpClient.get<Referral>(this.url + 'get?url=referrals/GetPatientProvider/' + patientId + '/' + doctorId);
  }

  getUpcomingReferrals(id: number): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/GetUpcomingReferrals/' + id);
  }

  getActiveReferrals(id: number): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/PracticeReferrals/' + id);
  }

  getPastReferrals(id: number): Observable<Referral[]> {
    return this.httpClient.get<Referral[]>(this.url + 'get?url=referrals/GetPastReferrals/' + id);
  }

  createReferral(referral: Referral): Observable<Referral> {
    return this.httpClient.post<Referral>(this.url + 'post?url=referrals/CreateReferral', referral);
  }

  CreateOrUpdateReferral(referral: Referral): Observable<Referral> {
    return this.httpClient.post<Referral>(this.url + 'post?url=referrals/CreateOrUpdateReferral', referral);
  }

  deactivateReferral(referralId: number | string): Observable<any>{
    return this.httpClient.delete(this.url + 'delete?url=referrals/DeactivateReferral/' + referralId);
  }

  getPatientAppointmentsNotes(id: number | string): Observable<ReferralNote[]> {
    return this.httpClient.get<ReferralNote[]>(this.url + 'get?url=referrals/GetPatientAppointmentsNotes/' + id);
  }

  updateAvailability(referral: Referral): Observable<Referral> {
    return this.httpClient.put<Referral>(this.url + 'put?url=referrals/' + referral.Id, referral);
  }

  createAppointmentNote(appointmentNote: ReferralNote): Observable<ReferralNote> {
    return this.httpClient.post<ReferralNote>(this.url + 'post?url=referrals/CreateAppointmentNote', appointmentNote);
  }

  getSymptoms(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + 'get?url=symptoms/');
  }
}
