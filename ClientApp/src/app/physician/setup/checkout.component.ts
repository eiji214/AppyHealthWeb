import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { HealthSystemSetup } from '../models/healthSystemSetup';
import { HealthSystemPractitioners } from '../models/healthSystemPractitioners';
import { HealthSystemTier } from '../models/healthSystemTier';
import { PhysicianService } from '../physician.service';
import { HealthSystemPrice } from '../models/healthSystemPrice';
import { PractitionerPrice } from '../models/practitionerPrice';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./setup.component.css']
})
export class CheckoutSetupComponent implements OnInit {
  healthSystem: HealthSystemSetup;

  tiers: HealthSystemTier[] = [];
  selectedTier: number;

  healthSystemPrices: HealthSystemPrice[] = [];
  cardNumber: string;
  cardYear: number;
  cardMonth: string;
  cardCode: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  accepted: boolean = false;
  currentYear = new Date().getFullYear();
  
  years = Array(20).fill(0).map((x, i) => {
    return {
      label: i + this.currentYear,
      value: i + this.currentYear - 2000,
    };
  });
  months = [
    {
      value: '01',
      label: 'Jan',
    },
    {
      value: '02',
      label: 'Feb',
    },
    {
      value: '03',
      label: 'Mar',
    },
    {
      value: '04',
      label: 'Apr',
    },
    {
      value: '05',
      label: 'May',
    },
    {
      value: '06',
      label: 'Jun',
    },
    {
      value: '07',
      label: 'Jul',
    },
    {
      value: '08',
      label: 'Aug',
    },
    {
      value: '09',
      label: 'Sep',
    },
    {
      value: '10',
      label: 'Oct',
    },
    {
      value: '11',
      label: 'Nov',
    },
    {
      value: '12',
      label: 'Dec',
    },
  ];
  @Input()
  set tier(selectedTier: number) {
    this.selectedTier = selectedTier;
  }

  @Input()
  set hs(hs: HealthSystemSetup) {
    this.healthSystem = hs;

    let primary = new HealthSystemPrice;
    primary.healthSystem = hs.primary;

    this.healthSystemPrices.push(primary);
    for (let i = 0; i < hs.children.length; i++) {
      let child = new HealthSystemPrice;
      child.healthSystem = hs.children[0];
      this.healthSystemPrices.push(child);
    }
    console.log('checkout---', this.healthSystemPrices);
    if (this.tiers.length > 0) {
      this.healthSystemPrices.forEach(x => x.tier = this.tiers[1]);
    }
    console.log(this.healthSystemPrices);
    let usedPractitionerIds = [];
    this.healthSystemPrices.forEach(h => {
      this.healthSystem.physicians.forEach(p => {
        if (p.healthSystems.filter(x => x.Id === h.healthSystem.Id).length) {
          h.physicians.push({
            practitioner: p.practitioner,
            isBeingActivated: true,
            price: 50,
            isFree: usedPractitionerIds.some(x => x === p.practitioner.Id)
          });
          
          usedPractitionerIds.push(p.practitioner.Id);
        }
      });

      this.healthSystem.midLevels.forEach(p => {
        if (p.healthSystems.filter(x => x.Id === h.healthSystem.Id).length) {
          h.midLevels.push({
            practitioner: p.practitioner,
            isBeingActivated: true,
            price: 25,
            isFree: usedPractitionerIds.some(x => x === p.practitioner.Id)
          });

          usedPractitionerIds.push(p.practitioner.Id);
        }
      });
    });

    //for (let i = 0; i < hs.physicians.length; i++) {
    //  let isFound = false;
    //  for (var j = 0; j < hs.physicians[i].healthSystems.length; j++) {
    //    let item = this.healthSystemPrices.filter(x => x.healthSystem.Id === hs.physicians[i].healthSystems[j].Id);
    //    let p = new PractitionerPrice;
    //    p.practitioner = hs.physicians[i].practitioner;
    //    p.isBeingActivated = true;
    //    p.isFree = isFound;
    //    p.price = 0;
    //    if (!isFound) {
    //      p.price = 50;
    //      isFound = true;
    //    }
    //    item[0].physicians.push(p);
    //  }
    //}

    //for (let i = 0; i < hs.midLevels.length; i++) {
    //  let isFound = false;
    //  for (var j = 0; j < hs.midLevels[i].healthSystems.length; j++) {
    //    let item = this.healthSystemPrices.filter(x => x.healthSystem.Id === hs.midLevels[i].healthSystems[j].Id);
    //    let p = new PractitionerPrice;
    //    p.practitioner = hs.midLevels[i].practitioner;
    //    p.isBeingActivated = true;
    //    p.isFree = isFound;
    //    p.price = 0;
    //    if (!isFound) {
    //      p.price = 25;
    //      isFound = true;
    //    }
    //    item[0].midLevels.push(p);
    //  }
    //}

    //for (let i = 0; i < hs.staff.length; i++) {
    //  for (var j = 0; j < hs.staff[i].healthSystems.length; j++) {
    //    let item = this.healthSystemPrices.filter(x => x.healthSystem.Id === hs.staff[i].healthSystems[j].Id);
    //    let p = new PractitionerPrice;
    //    p.practitioner = hs.staff[i].practitioner;
    //    p.isBeingActivated = true;
    //    p.isFree = true;
    //    p.price = 0;
    //    item[0].staff.push(p);
    //  }
    //}
  }

  @Output() navigate = new EventEmitter<boolean>();

  constructor(private physicianService: PhysicianService) {

  }

  getSubtotal(h: HealthSystemPrice) {
    h.tier = this.tiers.filter(x => x.TierId == this.selectedTier)[0];
    if (!h.tier) {
      return 0;
    }
    
    let cost = h.tier.TierPrice;
    h.physicians.forEach(x => {
      if (x.isFree || !x.isBeingActivated) {
        return;
      }
      cost += x.price;
    });
    h.midLevels.forEach(x => {
      if (x.isFree || !x.isBeingActivated) {
        return;
      }
      cost += x.price;
    });

    return cost;

  }

  getTotal() {
    let cost = 0;
    this.healthSystemPrices.forEach(x => cost += this.getSubtotal(x));

    return cost;
  }


  ngOnInit() {

    this.physicianService
      .getTiers()
      .subscribe(result => {
        const freeTier = <HealthSystemTier>{
          TierDesc: 'FREE',
          TierId: 0,
          TierPrice: 0
        }
        this.tiers = [freeTier, ...result];

        this.healthSystemPrices.forEach(x => x.tier = this.tiers[0]);
      })
  }

  tierChanged(event: any, h: HealthSystemPrice): void {
    const val = event.value;

    h.tier = this.tiers.filter(x => x.TierId == val)[0];
    this.selectedTier = val;
  }

  isAllPhysiciansSelected() {
    const numberSelected = this.healthSystemPrices.map(hs => {
      return hs.physiciansSelection.selected.length
    }).reduce((x, y) => x + y, 0);

    const totalNumber = this.healthSystemPrices.map(hs => {
      return hs.physicians.filter(pp => !pp.isFree).length
    }).reduce((x, y) => x + y, 0);
    return numberSelected === totalNumber;
  }

  isAllMidLevelsSelected() {
    const numberSelected = this.healthSystemPrices.map(hs => {
      return hs.midLevelssSelection.selected.length
    }).reduce((x, y) => x + y, 0);

    const totalNumber = this.healthSystemPrices.map(hs => {
      return hs.midLevels.length
    }).reduce((x, y) => x + y, 0);
    return numberSelected === totalNumber;
  }






  back() {
    this.navigate.emit(false);
  }

  finish() {
    //this.navigate.emit(true);
  }

  updatePaymentInfo() {
    console.log('health---', this.healthSystem);
    const info = {
      HealthSystemId: this.healthSystem.primary.Id,
      CardNumber: this.cardNumber,
      CardExpirationMMYY: `${this.cardMonth}${this.cardYear}`,
      CardCode: this.cardCode,
      FirstName: this.firstName,
      LastName: this.lastName,
      Address: this.address,
      City: this.city,
      State: this.state,
      Zip: this.zip
    };

    this.physicianService.updatePaymentInformation(info)
      .subscribe(result => {
        console.log(result);
        alert('Successfully updated!')
      })
  }
}



