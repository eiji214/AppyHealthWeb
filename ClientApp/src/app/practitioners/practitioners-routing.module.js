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
var practitioners_layout_component_1 = require("./layout/practitioners-layout.component");
var practitioners_list_component_1 = require("./practitioners-list/practitioners-list.component");
var practitioner_detail_component_1 = require("./practitioner-detail/practitioner-detail.component");
var practitioner_new_component_1 = require("./practitioner-new/practitioner-new.component");
var practitionersRoutes = [
    {
        path: '',
        component: practitioners_layout_component_1.PractitionersLayoutComponent,
        children: [
            { path: '', component: practitioners_list_component_1.PractitionersListComponent },
            { path: 'new', component: practitioner_new_component_1.PractitionerNewComponent },
            { path: ':id', component: practitioner_detail_component_1.PractitionerDetailComponent }
        ]
    }
];
var PractitionersRoutingModule = /** @class */ (function () {
    function PractitionersRoutingModule() {
    }
    PractitionersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(practitionersRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], PractitionersRoutingModule);
    return PractitionersRoutingModule;
}());
exports.PractitionersRoutingModule = PractitionersRoutingModule;
//# sourceMappingURL=practitioners-routing.module.js.map