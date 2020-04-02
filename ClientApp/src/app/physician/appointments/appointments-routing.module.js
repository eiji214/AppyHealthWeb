"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var main_component_1 = require("./main/main.component");
var appointmentsRoutes = [
    { path: '', component: main_component_1.MainComponent },
];
var AppointmentsRoutingModule = /** @class */ (function () {
    function AppointmentsRoutingModule() {
    }
    AppointmentsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(appointmentsRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppointmentsRoutingModule);
    return AppointmentsRoutingModule;
}());
exports.AppointmentsRoutingModule = AppointmentsRoutingModule;
//# sourceMappingURL=appointments-routing.module.js.map