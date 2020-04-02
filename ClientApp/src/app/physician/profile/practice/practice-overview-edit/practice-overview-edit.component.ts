import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HealthSystem } from "../../../models/healthSystem";
import { PracticePanelEnum } from '../../../../shared/enums/practice-panel.enum';

import { HoursOfOperation } from "../../../models/hoursOfOperation";

@Component({
  selector: 'app-practice-overview-edit',
  templateUrl: './practice-overview-edit.component.html',
  styleUrls: ['./practice-overview-edit.component.css']
})
export class PracticeOverviewEditComponent implements OnInit {

  panelTitle = 'Overview';
  panelType = 0;

  day: string;
  open: string;
  close: string;

  hours: HoursOfOperation[] = [];

  availableHours = ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00',
    '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15',
    '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30',
    '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00',
    '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15',
    '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30',
    '22:45', '23:00', '23:15', '23:30', '23:45'];

  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  constructor(
    public dialogRef: MatDialogRef<PracticeOverviewEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditOverviewData
  ) { 
  }

  ngOnInit() {
    const hs = this.data;

    switch (this.data.panelType) {
      case PracticePanelEnum.main: this.panelTitle = 'Overview'; break;
      case PracticePanelEnum.about: this.panelTitle = 'About'; break;
      case PracticePanelEnum.specialtyServices: this.panelTitle = 'Specialty Services'; break;
      case PracticePanelEnum.adminStaff: this.panelTitle = 'Administrative Staff'; break;
      case PracticePanelEnum.symptoms: this.panelTitle = 'Symptoms'; break;
      case PracticePanelEnum.conditions: this.panelTitle = 'Conditions'; break;
      default:
    }

    this.hours = this.data.healthSystem.HealthSystemLocation[0].Location.Hours.split(";").map(x => {
      let words = x.split(" ");
      return { day: words[0], open: words[2], close: words[4] };

    });

    this.hours.forEach(x => {
      let i = this.days.indexOf(x.day);
      this.days.splice(i, 1);
    });
  }

  addHours() {
    if (!this.day || !this.day.length || !this.open || !this.open.length || !this.close || !this.close.length) {
      return;
    }

    let h = this.hours.filter(x => x.day === this.day);
    if (!h.length) {
      this.hours.push({ day: this.day, open: this.open, close: this.close });
    } else {
      h[0] = { day: this.day, open: this.open, close: this.close };
    }

    let i = this.days.indexOf(this.day);
    this.days.splice(i, 1);

    this.hours = this.hours.sort((a,b) => this.compare(a,b));

    this.day = "";
    this.open = "";
    this.close = "";
  }

  removeHours(h: HoursOfOperation) {
    for (var k = 0; k < this.hours.length; k++) {
      if (this.hours[k].day === h.day) {
        this.hours.splice(k, 1);
        break;
      }
    }

    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (var j = 0; j < this.hours.length; j++) {
      let i = this.days.indexOf(this.hours[j].day);
      this.days.splice(i, 1);
    }
  }

  compare(a: HoursOfOperation, b: HoursOfOperation): number {
    let a1 = this.convertDayToNumber(a.day);
    let b1 = this.convertDayToNumber(b.day);

    if (a1 < b1) {
      return -1;
    }

    if (a1 > b1) {
      return 1;
    }

    return 0;
  }

  convertDayToNumber(day: string) {
    switch (day) {
    case "Sunday":
        return 0;
    case "Monday":
        return 1;
    case "Tuesday":
        return 2;
    case "Wednesday":
        return 3;
    case "Thursday":
        return 4;
    case "Friday":
        return 5;
    case "Saturday":
        return 6;
      default:
        return 0;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.data.healthSystem.HealthSystemLocation[0].Location.Hours =
      this.hours.map(x => x.day + " - " + x.open + " to " + x.close).join(";");
    this.dialogRef.close(this.data);
  }

  get practicePanelEnum() { return PracticePanelEnum; }

}

export interface EditOverviewData {
  healthSystem: HealthSystem;
  panelType: PracticePanelEnum;
}
