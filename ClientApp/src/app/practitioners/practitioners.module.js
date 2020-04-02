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
var dialog_1 = require("@angular/material/dialog");
var material_1 = require("@angular/material");
var ngx_mask_1 = require("ngx-mask");
var ng_select_1 = require("@ng-select/ng-select");
var core_module_1 = require("../core/core.module");
var shared_module_1 = require("./../shared/shared.module");
var practitioners_list_component_1 = require("./practitioners-list/practitioners-list.component");
var practitioner_detail_component_1 = require("./practitioner-detail/practitioner-detail.component");
var practitioners_routing_module_1 = require("./practitioners-routing.module");
var practitioner_new_component_1 = require("./practitioner-new/practitioner-new.component");
var practitioners_search_component_1 = require("./practitioners-search/practitioners-search.component");
var practitioners_layout_component_1 = require("./layout/practitioners-layout.component");
var PractitionersModule = /** @class */ (function () {
    function PractitionersModule() {
    }
    PractitionersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                ngx_mask_1.NgxMaskModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                dialog_1.MatDialogModule,
                material_1.MatTabsModule,
                material_1.MatInputModule,
                material_1.MatSelectModule,
                material_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                practitioners_routing_module_1.PractitionersRoutingModule,
                ng_select_1.NgSelectModule
            ],
            declarations: [
                practitioners_list_component_1.PractitionersListComponent,
                practitioner_detail_component_1.PractitionerDetailComponent,
                practitioner_new_component_1.PractitionerNewComponent,
                practitioners_search_component_1.PractitionersSearchComponent,
                practitioners_layout_component_1.PractitionersLayoutComponent,
            ],
            exports: [
                practitioners_search_component_1.PractitionersSearchComponent
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], PractitionersModule);
    return PractitionersModule;
}());
exports.PractitionersModule = PractitionersModule;
//# sourceMappingURL=practitioners.module.js.map