import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { HealthSystemSetup } from '../models/healthSystemSetup';
import { HealthSystemPractitioners } from '../models/healthSystemPractitioners';
import { HealthSystemTier } from '../models/healthSystemTier';
import { PhysicianService } from '../physician.service';
import { HealthSystemPrice } from '../models/healthSystemPrice';
import { PractitionerPrice } from '../models/practitionerPrice';
import { SelectionModel } from '@angular/cdk/collections';
import { PractitionerHealthSystems } from '../models/practitionerHealthSystems';
import { Practitioner } from '../profile/models/practitioner';


import {flatten} from 'lodash';
import { User } from '../models/user';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./setup.component.css']
})
export class ActivateSetupComponent implements OnInit {
  healthSystem: HealthSystemSetup;

  tiers: HealthSystemTier[] = [];

  selectedTier: number = 1;

  healthSystemPrices: HealthSystemPrice[] = [];

  // physiciansSelection = new SelectionModel<Practitioner>(true, []);
  // midLevelssSelection = new SelectionModel<Practitioner>(true, []);
  @Input()
  set tier(selectedTier: number) {
    this.selectedTier = selectedTier;
  }

  @Output() setSelectedTier = new EventEmitter<number>();
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

    if (this.tiers.length > 0) {
      this.healthSystemPrices.forEach(x => x.tier = this.tiers[1]);
    }

    let usedPractitionerIds = [];
    this.healthSystemPrices.forEach(h => {
      this.healthSystem.physicians.forEach(p => {
        if (p.healthSystems.filter(x => x.Id === h.healthSystem.Id).length > 0) {
          const isFree = usedPractitionerIds.some(x => x === p.practitioner.Id); 
          p.practitioner.staff = p.staff;
          if(!isFree) {
          h.physiciansSelection.select(p.practitioner);
          }
          h.physicians.push({
            practitioner: p.practitioner,
            isBeingActivated: true,
            price: 50,
            isFree: isFree
          });

          usedPractitionerIds.push(p.practitioner.Id);
        }
      });

      this.healthSystem.midLevels.forEach(p => {
        if (p.healthSystems.filter(x => x.Id === h.healthSystem.Id).length > 0) {
          p.practitioner.staff = p.staff;
          const isMidLevelFree = usedPractitionerIds.some(x => x === p.practitioner.Id);
          if(!isMidLevelFree) {
            h.midLevelssSelection.select(p.practitioner);
            } 
          h.midLevels.push({
            practitioner: p.practitioner,
            isBeingActivated: true,
            price: 25,
            isFree: isMidLevelFree
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
    if (!h.tier || !h.tier.TierPrice) {
      return 0;
    }

    let cost = h.tier.TierPrice;
    h.physicians.forEach(x => {
      if (x.isFree || !h.physiciansSelection.isSelected(x.practitioner)) {
        return;
      }
      cost += x.price;
    });

    h.midLevels.forEach(x => {
      if (x.isFree || !h.midLevelssSelection.isSelected(x.practitioner)) {
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

  getDesc(val) {
    if (val !== null && val !== undefined) {
      // @ts-ignore //
      const tier = this.tiers.find(x => x.TierId == val).TierDesc;
      return this.tiers.filter(x => x.TierId == val)[0].TierDesc;
    }
    return null;
  }

  ngOnInit() {
    this.physicianService.getTiers()
      .subscribe(result => {
        const freeTier = <HealthSystemTier> {
          TierDesc: 'FREE',
          TierId: 0,
          TierPrice: 0
        }
        this.tiers = [ freeTier, ...result];

        this.healthSystemPrices.forEach(x => x.tier = this.tiers[1]);
      })
  }

  back() {
    this.navigate.emit(false);
  }

  finish() {
    if(this.selectedTier) {

      this.physicianService.putSubscribeTire(this.healthSystem.primary, this.selectedTier).subscribe(r => {
        // this.navigate.emit(true);
        const selectedMidLevels = flatten(this.healthSystemPrices.map(h => {
          return h.midLevelssSelection.selected.map(s => s.staff)
        }));

        const selectedPhysiciansLevels = flatten(this.healthSystemPrices.map(h => {
          return h.physiciansSelection.selected.map(s => s.staff)
        }));

        const updates = [...selectedMidLevels, ...selectedPhysiciansLevels ].filter(s => !!s).map(p => {
          return this.physicianService.putUpdateMyAssociates(<User>{
            CreateDate: p.CreateDate,
            ConfirmedDate: p.ConfirmedDate,
            ConfirmedByUserID: p.ConfirmedByUserID,
            CustomerId: p.CustomerId,
            Email: p.Email,
            Id: p.Id,
            IsImpersonating: p.IsImpersonating,
            Name: p.Name,
            PaymentId: p.PaymentId,
            PhoneNumber: p.PhoneNumber,
            PractitionerID: p.PractitionerID,
            PreferredCommunicationMethod: p.PreferredCommunicationMethod,
            RequiresPayment: true,
            Role: p.Role
          })
        })

        forkJoin(...updates).subscribe( (u: User[]) => {
          console.log(u.length);
        })


      })
    } else {
      // this.navigate.emit(true);
    }

  }

  tierChanged(event: any, h: HealthSystemPrice): void {
    const val = event.value;
    this.setSelectedTier.emit(val);

    h.tier = this.tiers.filter(x => x.TierId == val)[0];
    this.finish();
  }


  checkout() {
    this.navigate.emit(true);
  }

  isAllPhysiciansSelected() {
    const numberSelected = this.healthSystemPrices.map(hs =>{
      return hs.physiciansSelection.selected.length
    }).reduce( (x, y) => x + y , 0);

    const totalNumber =  this.healthSystemPrices.map(hs =>{
      return hs.physicians.filter(pp => !pp.isFree).length
    }).reduce( (x, y) => x + y , 0);
    return numberSelected === totalNumber;
  }

  isAllMidLevelsSelected() {
    const numberSelected = this.healthSystemPrices.map(hs =>{
      return hs.midLevelssSelection.selected.length
    }).reduce( (x, y) => x + y , 0);

    const totalNumber =  this.healthSystemPrices.map(hs =>{
      return hs.midLevels.length
    }).reduce( (x, y) => x + y , 0);
    return numberSelected === totalNumber;
  }

  masterPhysicianToggle() {
    this.isAllPhysiciansSelected() ?
    this.healthSystemPrices.forEach(h => h.physiciansSelection.clear()):
        this.healthSystemPrices.map(hs =>{
          hs.physicians.forEach(row => hs.physiciansSelection.select(row.practitioner));
        })
  }

  masterMidLevelToggle() {
    this.isAllMidLevelsSelected() ?
    this.healthSystemPrices.forEach(h => h.midLevelssSelection.clear()):
        this.healthSystemPrices.map(hs =>{
          hs.midLevels.forEach(row => hs.midLevelssSelection.select(row.practitioner));
        })
  }

  togglePhysician(p:Practitioner) {

    this.healthSystemPrices.forEach(h => {
      if (h.physiciansSelection.isSelected(p)) {
        // @ts-ignore //
        h.physicians.find(ph => ph.practitioner.Id === p.Id).isFree = false 
      }
      h.physiciansSelection.toggle(p);

    });
    
  }

  toggleMidLevel(p:Practitioner) {
    this.healthSystemPrices.forEach(h => {
      if (h.midLevelssSelection.isSelected(p)) {
        // @ts-ignore //
        h.midLevels.find(ph => ph.practitioner.Id === p.Id).isFree = false 
      }
      h.midLevelssSelection.toggle(p);

    });
  }

}
