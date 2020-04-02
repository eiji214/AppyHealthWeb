import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-physician-landing',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class PhysicianLandingComponent implements OnInit {
  selectedPlan = 'pro';
  plans: string[] = ['pro', 'platinum'];
  planPrices = {
    pro: 200,
    platinum: 449
  };
  calculatorValues = {
    locations: 1,
    physicians: 3,
    midlevels: 5,
  };
  sliderMax = 20;
  locationSliderMax = 10;

  ngOnInit() {}

  selectPlan(plan) {
    this.selectedPlan = plan;
  }

  formatLocationLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value === 10 ? `${value}+` : value;
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    return value === 20 ? `${value}+` : value;
  }


  formatCalculatedValue(value) {
    return Number(value).toLocaleString();
  }
}


