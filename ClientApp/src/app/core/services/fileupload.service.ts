import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) {}

  // url: string = "/api/providers/";
  url = '/api/';
  uploadInsurancePlanFrontPicture(file: any, patientId: any) {
    const input = new FormData();
    input.append('file', file);

    return this.httpClient
      .post(this.url + 'post?url=insurancePlan/UploadInsurancePlanFile/' + patientId, input);
  }

  uploadInsurancePlanBackPicture(file: any, patientId: any) {
    const input = new FormData();
    input.append('file', file);

    return this.httpClient
      .post(this.url + 'post?url=insurancePlan/UploadInsurancePlanFileBack/' + patientId, input);
  }
}
