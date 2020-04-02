"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MainComponent = /** @class */ (function () {
    function MainComponent(appiontmentsService) {
        this.appiontmentsService = appiontmentsService;
        this.appointments = [];
        this.filteredAppointments = [];
        this.associates = [];
        this.controlType = "Month";
        this.startDate = new Date();
        this.startDate = new Date();
        this.startDate.setDate(1);
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appiontmentsService.getAssociates()
            .subscribe(function (result) { return _this.associates = result; });
        this.appiontmentsService.getPracticeIncoming()
            .subscribe(function (result) { return _this.appointments = _this.appointments.concat(result); });
        this.appiontmentsService.getPracticePatient()
            .subscribe(function (result) { return _this.appointments = _this.appointments.concat(result); });
    };
    MainComponent.prototype.associateChanged = function () {
        this.filteredAppointments = this.appointments; //.filter(x => x.Id == this.selected);
    };
    MainComponent.prototype.controlTypeChanged = function () {
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main',
            templateUrl: './main.component.html',
        })
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map