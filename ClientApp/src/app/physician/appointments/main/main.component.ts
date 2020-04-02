import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Associate } from '../models/associate';
import { Referral } from '../../../core/model/referral';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  //styleUrls: ['./calendar.component.css']
})
export class MainComponent implements OnInit {
  appointments: Referral[] = [];
  filteredAppointments: Referral[] = [];
  associates: Associate[] = [];
  selected: number;
  controlType: string = "Month";

  startDate: Date = new Date();

  constructor(private appiontmentsService: AppointmentsService) {
    this.startDate = new Date();
    this.startDate.setDate(1);
  }

  ngOnInit(): void {
    this.appiontmentsService.getAssociates()
      .subscribe((result: Associate[]) => this.associates = result);

    this.appiontmentsService.getPracticeIncoming()
      .subscribe(result => this.appointments = this.appointments.concat(result));

    this.appiontmentsService.getPracticePatient()
      .subscribe(result => this.appointments = this.appointments.concat(result));

  }

  associateChanged() {
    this.filteredAppointments = this.appointments;//.filter(x => x.Id == this.selected);
  }

  controlTypeChanged() {

  }

}
