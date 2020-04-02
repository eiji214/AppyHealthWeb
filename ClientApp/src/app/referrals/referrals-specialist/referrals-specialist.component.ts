import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReferralsService } from '../referrals.service';
import { Referral } from '../../core/model/referral';

@Component({
  selector: 'app-referrals-specialist',
  templateUrl: './referrals-specialist.component.html',
  styleUrls: ['./referrals-specialist.component.scss']
})
export class ReferralsSpecialistComponent implements OnInit {

  constructor(private referralService: ReferralsService, private route: ActivatedRoute) { }

  referral$: Observable<Referral>;

  ngOnInit() {
    this.referral$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.referralService.getSpecialistReferrals(+params.get('id')))
    );
  }
}
