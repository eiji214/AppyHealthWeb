import { PractitionersService } from './../practitioners.service';
import { Component, OnInit, Input } from '@angular/core';
import { Practitioner } from '../../core/model/practitioner';

@Component({
    selector: 'app-practitioner-card',
    templateUrl: './practitioner-card.component.html',
    styleUrls: ['./practitioner-card.component.scss',
    '../../styles.scss']
  })
  export class PractitionerCardComponent implements OnInit {
    @Input() practitionerId: number;
    @Input() compact: boolean;
    practitioner: Practitioner;

    constructor(public practitionerService: PractitionersService) { }

    ngOnInit(): void {
      this.practitionerService.getPractitioner(this.practitionerId)
      .subscribe(x => this.practitioner = x);
    }
  }
