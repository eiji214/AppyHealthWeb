"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PatientsSearchComponent = /** @class */ (function () {
    function PatientsSearchComponent(patientsService) {
        this.patientsService = patientsService;
        this.filteredPatientsChange = new core_1.EventEmitter();
        this.searchTerm$ = new rxjs_1.Subject();
        this.isLoading = false;
    }
    PatientsSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hookupAutocomplete(this.searchTerm$).subscribe(function (data) {
            _this.filteredPatients = data;
            _this.filteredPatientsChange.emit(_this.filteredPatients);
            _this.isLoading = false;
        });
    };
    PatientsSearchComponent.prototype.hookupAutocomplete = function (terms) {
        var _this = this;
        return terms.pipe(operators_1.debounceTime(400), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) {
            _this.searchTerm = term;
            return _this.applyFilter();
        }));
    };
    PatientsSearchComponent.prototype.applyFilter = function () {
        {
            if (!this.searchTerm) {
                this.filteredPatients = [];
                this.filteredPatientsChange.emit(this.filteredPatients);
                return;
            }
            this.isLoading = true;
            return this.patientsService.getPatientsFTS(this.searchTerm);
        }
        // if (!this.filter.searchText) {
        //   this.filteredPatients = [];
        // } else {
        //   this.filter.searchText = this.filter.searchText.toLowerCase();
        //   this.filteredPatients = this.patients.filter
        //     (d =>
        //     (d.FirstName != null && d.FirstName.toLowerCase().indexOf(this.filter.searchText) >= 0)
        //     || (d.LastName != null && d.LastName.toLowerCase().indexOf(this.filter.searchText) >= 0)
        //     || (d.FirstName != null && d.LastName != null &&
        //       (d.FirstName.toLowerCase() + ' ' + d.LastName.toLowerCase()).indexOf(this.filter.searchText) >= 0)
        //     || (d.PrimaryEmailAddress != null && d.PrimaryEmailAddress.toLowerCase().indexOf(this.filter.searchText) >= 0));
        // }
        // this.filteredPatientsChange.emit(this.filteredPatients);
    };
    __decorate([
        core_1.Input()
    ], PatientsSearchComponent.prototype, "filter", void 0);
    __decorate([
        core_1.Input()
    ], PatientsSearchComponent.prototype, "patients", void 0);
    __decorate([
        core_1.Input()
    ], PatientsSearchComponent.prototype, "filteredPatients", void 0);
    __decorate([
        core_1.Output()
    ], PatientsSearchComponent.prototype, "filteredPatientsChange", void 0);
    PatientsSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-patients-search',
            templateUrl: './patients-search.component.html',
            styleUrls: ['./patients-search.component.scss',
                '../../styles.scss'
            ]
        })
    ], PatientsSearchComponent);
    return PatientsSearchComponent;
}());
exports.PatientsSearchComponent = PatientsSearchComponent;
//# sourceMappingURL=patients-search.component.js.map