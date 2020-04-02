"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MyErrorStateMatcher_component_1 = require("../../shared/MyErrorStateMatcher/MyErrorStateMatcher.component");
var PatientNewComponent = /** @class */ (function () {
    function PatientNewComponent(patientsService, fileUploadService, dialogRef /*, @Inject(MAT_DIALOG_DATA) public data: DialogData*/) {
        this.patientsService = patientsService;
        this.fileUploadService = fileUploadService;
        this.dialogRef = dialogRef;
        this.save = new core_1.EventEmitter();
        this.errorUnverifiedNumber = false;
        this.matcher = new MyErrorStateMatcher_component_1.MyErrorStateMatcher();
        this.emailFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email,
        ]);
        this.firstNameFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.middleNameFormControl = new forms_1.FormControl('', []);
        this.lastNameFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.genderFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.dobFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required
        ]);
        this.phoneNumberFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.secondaryPhoneNumberFormControl = new forms_1.FormControl('', []);
        this.addressLineFormControl = new forms_1.FormControl('', []);
        this.addressLine2FormControl = new forms_1.FormControl('', []);
        this.addressCityFormControl = new forms_1.FormControl('', []);
        this.addressStateFormControl = new forms_1.FormControl('', []);
        this.addressZipCodeFormControl = new forms_1.FormControl('', []);
        this.dataForm = new forms_1.FormGroup({
            email: this.emailFormControl,
            firstname: this.firstNameFormControl,
            middlename: this.middleNameFormControl,
            lastname: this.lastNameFormControl,
            gender: this.genderFormControl,
            dob: this.dobFormControl,
            phone: this.phoneNumberFormControl,
            secphone: this.secondaryPhoneNumberFormControl,
            line: this.addressLineFormControl,
            line2: this.addressLine2FormControl,
            city: this.addressCityFormControl,
            state: this.addressStateFormControl,
            zipcode: this.addressZipCodeFormControl
        });
    }
    PatientNewComponent.prototype.ngOnInit = function () {
        this.patient = {};
        this.patient.Address = {};
    };
    PatientNewComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    PatientNewComponent.prototype.onSubmit = function (patient) {
        var _this = this;
        if (this.dataForm.invalid) {
            return;
        }
        console.log(patient);
        this.patientsService.createPatient(patient).subscribe(function (p) {
            // this.save.emit(patient.value);
            _this.patient = p;
            _this.patientCreated = true;
            _this.uploadInsurancePlanFrontPicture(p.Id);
            _this.uploadInsurancePlanBackPicture(p.Id);
        }, function (er) {
            console.error('createpatient', er);
            if (er.error == 21608) {
                console.log('//This number can send messages only to verified numbers');
                _this.patientCreated = true;
                _this.errorUnverifiedNumber = true;
            }
            else {
                return;
            }
        });
    };
    PatientNewComponent.prototype.uploadInsurancePlanFrontPicture = function (patientId) {
        var fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            this.fileUploadService.
                uploadInsurancePlanFrontPicture(fileToUpload, patientId)
                .subscribe(function (res) {
                console.log(res);
            });
        }
    };
    PatientNewComponent.prototype.uploadInsurancePlanBackPicture = function (patientId) {
        var fi = this.fileInput2.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            this.fileUploadService.
                uploadInsurancePlanBackPicture(fileToUpload, patientId)
                .subscribe(function (res) {
                console.log(res);
            });
        }
    };
    __decorate([
        core_1.Input()
    ], PatientNewComponent.prototype, "specialistId", void 0);
    __decorate([
        core_1.Output()
    ], PatientNewComponent.prototype, "save", void 0);
    __decorate([
        core_1.ViewChild('fileInput')
    ], PatientNewComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.ViewChild('fileInput2')
    ], PatientNewComponent.prototype, "fileInput2", void 0);
    PatientNewComponent = __decorate([
        core_1.Component({
            selector: 'app-patient-new',
            templateUrl: './patient-new.component.html',
            styleUrls: ['./patient-new.component.scss',
                '../../styles.scss']
        })
    ], PatientNewComponent);
    return PatientNewComponent;
}());
exports.PatientNewComponent = PatientNewComponent;
//# sourceMappingURL=patient-new.component.js.map