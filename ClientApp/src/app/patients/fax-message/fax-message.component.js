"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var material_1 = require("@angular/material");
var FaxMessageComponent = /** @class */ (function () {
    function FaxMessageComponent(dialogRef, data, patientsService, practitionersService, faxService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.patientsService = patientsService;
        this.practitionersService = practitionersService;
        this.faxService = faxService;
        this.isLoadingProviders = false;
        this.providersInput$ = new rxjs_1.Subject();
    }
    FaxMessageComponent.prototype.ngOnInit = function () {
        this.patient$ = this.patientsService.getPatient(this.data.patientId);
        this.searchProviders();
    };
    FaxMessageComponent.prototype.searchProviders = function () {
        var _this = this;
        this.providers$ = rxjs_1.concat(rxjs_1.of([]), // default items
        this.providersInput$.pipe(operators_1.debounceTime(200), operators_1.distinctUntilChanged(), operators_1.tap(function () { return _this.isLoadingProviders = true; }), operators_1.switchMap(function (term) { return _this.practitionersService.getSpecialists({ SearchTerm: term, SpecialtyId: null, SpecialtyName: null }).pipe(operators_1.catchError(function () { return rxjs_1.of([]); }), // empty list on error
        operators_1.tap(function () { return _this.isLoadingProviders = false; })); })));
    };
    FaxMessageComponent.prototype.sendFaxMessage = function () {
        this.dialogRef.close();
    };
    FaxMessageComponent = __decorate([
        core_1.Component({
            selector: 'app-fax-message',
            templateUrl: './fax-message.component.html',
            styleUrls: ['./fax-message.component.scss',
                '../../styles.scss']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], FaxMessageComponent);
    return FaxMessageComponent;
}());
exports.FaxMessageComponent = FaxMessageComponent;
//# sourceMappingURL=fax-message.component.js.map