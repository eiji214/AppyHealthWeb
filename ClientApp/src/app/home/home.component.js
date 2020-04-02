"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var forms_1 = require("@angular/forms");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(insuranceService, searchService) {
        this.insuranceService = insuranceService;
        this.searchService = searchService;
        this.insuranceOptions = new Array();
        this.searchResult = new Array();
        this.specialties = new Array();
        this.keyword = "Name";
        this.categoryKeyword = "Category";
        this.searchText = "";
        this.category = null;
        this.subcategory = null;
        this.simpleInsurance = null;
        this.advancedInsurance = null;
        this.complexInsurance = null;
        this.options = [];
        this.displayedColumns = ['SearchTerm', 'SearchId', 'SearchType', 'Distance'];
        this.myControl = new forms_1.FormControl();
        this.categoryInput = new forms_1.FormControl();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.insuranceService.getInsurance()
            .subscribe(function (p) {
            _this.insuranceOptions = p;
        });
        this.searchService.getSpeciality()
            .subscribe(function (p) {
            _this.specialties = p;
        });
        this.filteredOptions = this.myControl.valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
        this.filteredSpecialties = this.categoryInput.valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filterCategories(value); }));
    };
    HomeComponent.prototype.simpleSearch = function (event) {
        var _this = this;
        console.log(this.specialties);
        var body = {
            SearchTerm: this.searchText,
        };
        this.searchService.callSearchWeb(body)
            .subscribe(function (p) {
            _this.searchResult = [
                {
                    SearchTerm: 'Example Term',
                    SearchId: 2,
                    SearchType: 'Example Type',
                    Distance: 234.3,
                }
            ];
        });
    };
    HomeComponent.prototype.advancedSearch = function (event) {
        var _this = this;
        var body = {
            SpecialtyId: 0,
            SpecialtyName: "string",
            City: "string",
            State: "string",
            ZipCode: "string"
        };
        this.searchService.discoverByCategory(body)
            .subscribe(function (p) {
            _this.searchResult = [
                {
                    SearchTerm: 'Example Term',
                    SearchId: 2,
                    SearchType: 'Example Type',
                    Distance: 234.3,
                }
            ];
        });
    };
    HomeComponent.prototype.handleAddressChange = function (event) {
        console.log(event);
    };
    HomeComponent.prototype.selectAdvancedInsurance = function (event) {
        this.advancedInsurance = event;
    };
    HomeComponent.prototype.selectCategory = function (event) {
        this.category = event;
    };
    HomeComponent.prototype.selectSubcategory = function (event) {
        this.subcategory = event;
    };
    HomeComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.insuranceOptions.filter(function (option) { return option.Name.toLowerCase().indexOf(filterValue) !== -1; });
    };
    HomeComponent.prototype._filterCategories = function (value) {
        var filterValue = value.toLowerCase();
        return this.specialties.filter(function (option) { return option.Category.toLowerCase().indexOf(filterValue) !== -1; });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map