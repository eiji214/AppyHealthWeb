import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppointmentDialogComponent } from "../dialog/appointment-dialog.component";

import { Day } from "../models/day";
import { Referral } from '../../../core/model/referral';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  days: Day[] = [];
  referrals: Referral[];

  date: Date = new Date();

  @Input() id: number;
  @Input()
  set appointments(a: Referral[]) {
    this.referrals = a;
    this.checkAppointments();
  }

  constructor(public dialog: MatDialog) {
    this.date = new Date();
    this.date.setDate(1);

    this.calcDate();
  }

  calcDate() {
    this.days = [];

    let today = new Date(this.date);
    today.setDate(1);

    today.setDate((today.getDate() - today.getDay()));

    let totalDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate() + new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();

    for (var i = 0; i < totalDays; i++) {
      let d = new Date(today);
      this.days.push({ date: d, appointments: [] });
      today.setDate(today.getDate() + 1);
    }

    this.checkAppointments();
  }

  checkAppointments() {
    if (!this.referrals || !this.referrals.length) {
      return;
    }
    this.days.forEach(x => {
      x.appointments = this.referrals.filter(y => y.AppointmentDate && this.isSameDay(y.AppointmentDate, x.date));
    });
  }

  isSameDay(d: any, date: Date) {
    d = new Date(d);
    return d.getDate() == date.getDate() &&
      d.getMonth() == date.getMonth() &&
      d.getFullYear() == date.getFullYear();
  }

  getDayOfWeek(d: Date) {
    let n = d.getDay();
    switch (n) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return '';
    }
  }

  getTime(d: any) {
    let date = new Date(d);
    var hours = date.getHours();
    let minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let m = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + m;// + ' ' + ampm;
    return strTime;
  }

  getTimeClass(d: any) {
    d = new Date(d);
    let time = d.getHours() + (d.getMinutes() / 60) - 7;
    return time * .75 * 60;
  }

  forward() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    this.calcDate();
  }

  back() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    this.calcDate();
  }
}
