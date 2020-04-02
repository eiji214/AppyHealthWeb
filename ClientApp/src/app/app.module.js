"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var ngx_mask_1 = require("ngx-mask");
var ngx_google_places_autocomplete_1 = require("ngx-google-places-autocomplete");
var app_component_1 = require("./app.component");
var card_component_1 = require("./featured-card/card.component");
var nav_menu_component_1 = require("./nav-menu/nav-menu.component");
var login_component_1 = require("./nav-menu/login.component");
var register_component_1 = require("./register/register.component");
// Home Page
var home_component_1 = require("./home/home.component");
var insurance_service_1 = require("./home/insurance.service");
var search_service_1 = require("./home/search.service");
// Landing Pages
var home_component_2 = require("./physicianLanding/home.component");
var home_component_3 = require("./medicalServicesLanding/home.component");
// Coming Soon Page
var comingSoon_component_1 = require("./comingSoon/comingSoon.component");
var physician_module_1 = require("./physician/physician.module");
var user_service_1 = require("./common/user.service");
var patients_service_1 = require("./patients/patients.service");
var core_2 = require("@agm/core");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var animations_1 = require("@angular/platform-browser/animations");
var autocomplete_1 = require("@angular/material/autocomplete");
var table_1 = require("@angular/material/table");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var tabs_1 = require("@angular/material/tabs");
var icon_1 = require("@angular/material/icon");
var slider_1 = require("@angular/material/slider");
var shared_module_1 = require("./shared/shared.module");
var core_module_1 = require("./core/core.module");
var ngx_swiper_wrapper_1 = require("ngx-swiper-wrapper");
var ngx_swiper_wrapper_2 = require("ngx-swiper-wrapper");
var DEFAULT_SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: false,
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                nav_menu_component_1.NavMenuComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                home_component_2.PhysicianLandingComponent,
                home_component_3.MedicalServicesLandingComponent,
                comingSoon_component_1.ComingSoonComponent,
                card_component_1.CardComponent,
            ],
            imports: [
                ngx_google_places_autocomplete_1.GooglePlaceModule,
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                physician_module_1.PhysicianModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                animations_1.BrowserAnimationsModule,
                autocomplete_1.MatAutocompleteModule,
                table_1.MatTableModule,
                progress_spinner_1.MatProgressSpinnerModule,
                tabs_1.MatTabsModule,
                icon_1.MatIconModule,
                slider_1.MatSliderModule,
                ngx_swiper_wrapper_1.SwiperModule,
                shared_module_1.SharedModule,
                core_module_1.CoreModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBW8gI-u3gK4VDH1zoYF8z04A81b9Vlnto',
                    libraries: ['places']
                }),
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: '/home', pathMatch: 'full' },
                    { path: 'home', component: home_component_1.HomeComponent },
                    { path: 'register', component: register_component_1.RegisterComponent },
                    { path: 'physician', redirectTo: '/physician', pathMatch: 'full' },
                    { path: 'physicians-claim', component: home_component_2.PhysicianLandingComponent },
                    { path: 'medical-services-claim', component: home_component_3.MedicalServicesLandingComponent },
                    { path: 'coming-soon', component: comingSoon_component_1.ComingSoonComponent }
                ], {
                    scrollPositionRestoration: 'top',
                })
            ],
            providers: [
                user_service_1.UserService,
                patients_service_1.PatientService,
                insurance_service_1.InsuranceService,
                search_service_1.SearchService,
                {
                    provide: ngx_swiper_wrapper_2.SWIPER_CONFIG,
                    useValue: DEFAULT_SWIPER_CONFIG
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map