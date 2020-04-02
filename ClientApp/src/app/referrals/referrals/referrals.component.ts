import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReferralsService } from '../referrals.service';
import { Referral } from '../../core/model/referral';
import { MatDialog } from '@angular/material';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit, OnDestroy {

  unsubscribeAll$: Subject<boolean> = new Subject();
  constructor(private referralService: ReferralsService, public dialog: MatDialog,
    private route: ActivatedRoute) { }

  referralPage: string;
  referrals$: BehaviorSubject<Referral[]> = new BehaviorSubject([]);
  statuses = ['Created', 'Patient Availability Set', 'Provider Availability Set', 'User Selected Appointment', 'Appointment Scheduled'];
  filters = [
    {
      label: 'All',
      value: ''
    },
    {
      label: 'Created',
      value: 'Created',
    },
    {
      label: 'Patient Availability Set',
      value: 'Patient Availability Set',
    },
    {
      label: 'Provider Availability Set',
      value: 'Provider Availability Set',
    },
    {
      label: 'User Selected Appointment',
      value: 'User Selected Appointment',
    },
    {
      label: 'Appointment Scheduled',
      value: 'Appointment Scheduled',
    },
  ];

  selectedFilter = '';
  title = 'Received Referrals';
  searchCtrl = new FormControl();
  referrals: Referral[] = new Array<Referral>();
  filteredReferrals: Observable<Referral[]>;
  ngOnInit() {

    this.route.queryParams.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params: Params) => {
      this.referralPage = params['page'];
      this.referrals$.next([]);
      switch (this.referralPage) {
        case 'outgoing':
            this.referralService.getPracticeOutgoing().subscribe(r => {
              this.referrals = r;
              this.referrals$.next(r);
            });
          break;
        case 'recommendations':
            this.referralService.getPracticePatient().subscribe(r => {
              this.referrals = r;
              this.referrals$.next(r);
            });
          break;

        default:
          this.referralService.getPracticeIncoming().subscribe(r => {
            this.referrals = r;
            this.referrals$.next(r);
          });
          break;
      }
      if (this.referralPage === 'received') {


      }
    });


    /*this.filteredReferrals = this.searchCtrl.valueChanges
      .pipe(
        startWith(null),
        map(value => this._filterReferrals(value))
      );*/
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.unsubscribe();
  }

  _filterReferrals(value: any) {
    let filtered = JSON.parse(JSON.stringify(this.referrals));
    if (value) {
      filtered = this.referrals.filter(option => option.Status === value);
    }

    this.referrals$.next(filtered);
  }
}
