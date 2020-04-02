"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_module_1 = require("../../material/material-module");
var appointments_routing_module_1 = require("./appointments-routing.module");
var appointments_service_1 = require("./appointments.service");
var calendar_component_1 = require("./calendar/calendar.component");
var appointment_dialog_component_1 = require("./dialog/appointment-dialog.component");
var main_component_1 = require("./main/main.component");
var week_component_1 = require("./week/week.component");
var AppointmentsModule = /** @class */ (function () {
    function AppointmentsModule() {
    }
    AppointmentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                appointments_routing_module_1.AppointmentsRoutingModule,
                forms_1.FormsModule,
                material_module_1.MaterialModule,
            ],
            providers: [
                appointments_service_1.AppointmentsService
            ],
            declarations: [
                calendar_component_1.CalendarComponent,
                appointment_dialog_component_1.AppointmentDialogComponent,
                main_component_1.MainComponent,
                week_component_1.WeekComponent
            ],
            entryComponents: [
                appointment_dialog_component_1.AppointmentDialogComponent
            ]
        })
    ], AppointmentsModule);
    return AppointmentsModule;
}());
exports.AppointmentsModule = AppointmentsModule;
//# sourceMappingURL=appointments.module.js.map