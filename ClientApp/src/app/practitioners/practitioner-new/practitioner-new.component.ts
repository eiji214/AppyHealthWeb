import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { SpecialtyService } from '../../core/services/specialty.service';
import { ProcedureService } from '../../core/services/procedure.service';
import { PractitionersService } from '../practitioners.service';
import { InsurancePlanService } from '../../core/services/insurancePlan.service';

import { Practitioner } from '../../core/model/practitioner';
import { Procedure } from '../../core/model/procedure';
import { Specialty } from '../../core/model/specialty';
import { MyErrorStateMatcher } from '../../shared/MyErrorStateMatcher/MyErrorStateMatcher.component';
import { InsurancePlan } from '../../core/model/insurancePlan';

@Component({
  selector: 'app-practitioner-new',
  templateUrl: './practitioner-new.component.html',
  styleUrls: ['./practitioner-new.component.scss',
  '../../styles.scss']
})
export class PractitionerNewComponent implements OnInit {
  public procedures$: Observable<Array<any>>;
  public selectedProcedures$: Observable<Array<any>>;
  public _selectedProcedures: Array<any> = [];
  public watchedProcedures: Array<any>;
  private _procedures: Procedure[];

  public specialties$: Observable<Array<any>>;
  public selectedSpecialties$: Observable<Array<any>>;
  public _selectedSpecialties: Array<any> = [];
  public watchedSpecialties: Array<any>;
  private _specialties: Specialty[];

  public insurancePlans$: Observable<Array<any>>;
  public selectedInsurancePlans$: Observable<Array<any>>;
  public _selectedInsurancePlans: Array<any> = [];
  public watchedInsurancePlans: Array<any>;
  private _insurancePlans: InsurancePlan[];

  constructor(private practitionersService: PractitionersService, private procedureService: ProcedureService,
    private specialtyService: SpecialtyService, private insurancePlanService: InsurancePlanService, private route: ActivatedRoute) { }

  practitioner: Practitioner;

  matcher = new MyErrorStateMatcher();

  titleFormControl = new FormControl('', [
    Validators.required],
  );

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  // middleNameFormControl = new FormControl('', [
  // ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  genderFormControl = new FormControl('', [
    Validators.required,
  ]);

  boardCertifiedFormControl = new FormControl('', [
  ]);

  dobFormControl = new FormControl('', [
    Validators.required
  ]);

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
  ]);

  secondaryPhoneNumberFormControl = new FormControl('', [

  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  humanTouchFormControl = new FormControl('', [

  ]);

  specialtiesFormControl = new FormControl('', [Validators.required],
  );

  proceduresFormControl = new FormControl('', [Validators.required],
  );

  insurancePlansFormControl = new FormControl('', [Validators.required],
  );

  dataForm: FormGroup = new FormGroup({
    title: this.titleFormControl,
    email: this.emailFormControl,
    firstname: this.firstNameFormControl,
    // middlename: this.middleNameFormControl,
    lastname: this.lastNameFormControl,
    gender: this.genderFormControl,
    boardCertified: this.boardCertifiedFormControl,
    dob: this.dobFormControl,
    phone: this.phoneNumberFormControl,
    secphone: this.secondaryPhoneNumberFormControl,

    humanTouch: this.humanTouchFormControl,
    // specialties: this.specialtiesFormControl,
    // procedures: this.proceduresFormControl,
    // insurancePlans: this.insurancePlansFormControl,
    // address: this.addressFormControl
  });

  ngOnInit() {
    this.practitioner = <Practitioner>{};
    this.practitioner.Specialties = <Specialty[]>{};
    this.practitioner.InsurancePlans = <InsurancePlan[]>{};
    this.practitioner.Procedures = <Procedure[]>{};

    this.getProcedures();
    this.getSpecialties();
    this.getInsurancePlans();
  }

  selectProcedures(procedures: any[]) {
    for (let i = 0; i < procedures.length; i++) {
      const option = { label: procedures[i].Name, value: procedures[i].Id, checked: true };
      this._selectedProcedures.push(option);
    }
  }

  getProcedures() {
    this.procedureService.getProcedures().subscribe(p => {
      this._procedures = p as Procedure[];

      const procedureOptions = [];
      for (let i = 0; i < this._procedures.length; i++) {
        const option = { label: this._procedures[i].Name, value: this._procedures[i].Id };
        procedureOptions.push(option);
      }

      this.procedures$ = of(procedureOptions);
      this.procedures$.subscribe(res => { console.log('Procedures changed'); this.watchedProcedures = res; });
    });
  }

  getSpecialties() {
    this.specialtyService.getSpecialties().subscribe(p => {
      this._specialties = p as Specialty[];

      const specialtyOptions = [];
      for (let i = 0; i < this._specialties.length; i++) {
        const option = { label: this._specialties[i].Name, value: this._specialties[i].Id };
        specialtyOptions.push(option);
      }

      this.specialties$ = of(specialtyOptions);
      this.specialties$.subscribe(res => { console.log('Specialties changed'); this.watchedSpecialties = res; });
    });
  }

  getInsurancePlans() {
    this.insurancePlanService.getInsurancePlans().subscribe(p => {
      this._insurancePlans = p as InsurancePlan[];

      const insurancePlanOptions = [];
      for (let i = 0; i < this._insurancePlans.length; i++) {
        const option = { label: this._insurancePlans[i].Name, value: this._insurancePlans[i].Id };
        insurancePlanOptions.push(option);
      }

      this.insurancePlans$ = of(insurancePlanOptions);
      this.insurancePlans$.subscribe(res => { console.log('InsurancePlans changed'); this.watchedInsurancePlans = res; });
    });
  }

  onSubmit(practitioner: Practitioner): void {
    console.log(practitioner);

    this.setSpecialties(practitioner);

    if (this.dataForm.invalid) {
      return;
    }

    this.setSpecialties(practitioner);
    this.setInsurancePlan(practitioner);
    this.setProcedures(practitioner);

    this.practitionersService.createPractitioner(practitioner).subscribe((p) => {
      window.location.href = '/practitioners/' + p.Id;
    });
  }

  setSpecialties(practitioner: Practitioner) {
    if (this._selectedSpecialties.length === 0) {
      return;
    }

    practitioner.Specialties = this.optionToIdArray(this._selectedSpecialties);
  }

  setInsurancePlan(practitioner: Practitioner) {
    if (this._selectedInsurancePlans.length === 0) {
      return;
    }

    practitioner.InsurancePlans = this.optionToIdArray(this._selectedInsurancePlans);

  }

  setProcedures(practitioner: Practitioner) {
    if (this._selectedProcedures.length === 0) {
      return;
    }

    practitioner.Procedures = this.optionToIdArray(this._selectedProcedures);

  }


  optionToIdArray(options: any[]) {
    if (!options || options.length === 0) {
      return null;
    }

    const vmArray = [];
    for (let i = 0; i < options.length; i++) {
      const vm = { Id: options[i].value };
      vmArray.push(vm);
    }

    return vmArray;
  }

  createProcedure(name: string) {
    console.log(name);
  }
}
