"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var appointment_dialog_component_1 = require("../dialog/appointment-dialog.component");
var WeekComponent = /** @class */ (function () {
    function WeekComponent(dialog) {
        this.dialog = dialog;
        this.days = [];
        var today = new Date();
        today.setDate((today.getDate() - today.getDay()));
        for (var i = 0; i < 7; i++) {
            var d = today;
            this.days.push({ date: d, appointments: [] });
            today.setDate(today.getDate() + 1);
        }
        //this.days.push({ date: new Date('2019-09-07'), appointments: [] });
        //this.days.push({ date: new Date('2019-09-10'), appointments: [] });
        //this.days.push({ date: new Date('2019-09-11'), appointments: [] });
        //this.days.push({ date: new Date('2019-09-12'), appointments: [] });
        //this.days.push({ date: new Date('2019-09-13'), appointments: [] });
        //this.days.push({ date: new Date('2019-09-14'), appointments: [] });
        //this.days.push({ date: new Date('2019-09-15'), appointments: [] });
    }
    Object.defineProperty(WeekComponent.prototype, "appointments", {
        set: function (a) {
            var _this = this;
            this.days.forEach(function (x) {
                x.appointments = a.filter(function (y) { return y.AppointmentDate && _this.isSameDay(y.AppointmentDate, x.date); });
            });
        },
        enumerable: true,
        configurable: true
    });
    WeekComponent.prototype.addAppointment = function (d) {
        var dialogRef = this.dialog.open(appointment_dialog_component_1.AppointmentDialogComponent, {
            width: '900px', disableClose: true,
            data: { date: d, practitionerId: this.id }
        });
        dialogRef.afterClosed().subscribe(function (pResult) {
            if (pResult) {
            }
        });
    };
    WeekComponent.prototype.isActive = function (d) {
        d = new Date(d);
        var today = new Date();
        return this.isSameDay(d, today);
    };
    WeekComponent.prototype.isSameDay = function (d, date) {
        d = new Date(d);
        return d.getDate() == date.getDate() &&
            d.getMonth() == date.getMonth() &&
            d.getFullYear() == date.getFullYear();
    };
    WeekComponent.prototype.getDayOfWeek = function (d) {
        var n = d.getDay();
        switch (n) {
            case 0:
                return 'Sun';
            case 1:
                return 'Mon';
            case 2:
                return 'Tue';
            case 3:
                return 'Wed';
            case 4:
                return 'Thu';
            case 5:
                return 'Fri';
            case 6:
                return 'Sat';
            default:
                return '';
        }
    };
    WeekComponent.prototype.getTime = function (d) {
        var date = new Date(d);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var m = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + m; // + ' ' + ampm;
        return strTime;
    };
    WeekComponent.prototype.getTimeClass = function (d) {
        d = new Date(d);
        var time = d.getHours() + (d.getMinutes() / 60) - 7;
        return time * .75 * 60;
    };
    __decorate([
        core_1.Input()
    ], WeekComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input()
    ], WeekComponent.prototype, "appointments", null);
    WeekComponent = __decorate([
        core_1.Component({
            selector: 'week',
            templateUrl: './week.component.html',
            styleUrls: ['./week.component.css']
        })
    ], WeekComponent);
    return WeekComponent;
}());
exports.WeekComponent = WeekComponent;
//# sourceMappingURL=week.component.js.map