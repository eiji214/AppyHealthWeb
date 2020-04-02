import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AppComponent } from './app.component';
import { CardComponent } from './featured-card/card.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './nav-menu/login.component';
import { RegisterComponent } from './register/register.component';

// Home Page
import { HomeComponent } from './home/home.component';
import { InsuranceService } from './home/insurance.service';
import { SearchService } from './home/search.service';
// Landing Pages
import {PhysicianLandingComponent} from './physicianLanding/home.component';
import { MedicalServicesLandingComponent } from './medicalServicesLanding/home.component';
// Coming Soon Page
import { ComingSoonComponent } from './comingSoon/comingSoon.component';
import { PhysicianModule } from './physician/physician.module';
import { UserService } from './common/user.service';
import { PatientService } from './patients/patients.service';
import { AgmCoreModule } from '@agm/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 20,
  pagination: false,
};

import { PatientsModule } from './patients/patients.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PhysicianLandingComponent,
    MedicalServicesLandingComponent,
    ComingSoonComponent,
    CardComponent,
  ],
  imports: [
    GooglePlaceModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PhysicianModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule,
    MatSliderModule,
    SwiperModule,
    SharedModule,
    CoreModule,
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBW8gI-u3gK4VDH1zoYF8z04A81b9Vlnto',
      libraries: ['places']
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'physician', redirectTo: '/physician', pathMatch: 'full' },
      { path: 'physicians-claim', component: PhysicianLandingComponent },
      { path: 'medical-services-claim', component: MedicalServicesLandingComponent },
      { path: 'coming-soon', component: ComingSoonComponent }
    ], {
      scrollPositionRestoration: 'top',
    })
  ],
  providers: [
    UserService,
    PatientService,
    InsuranceService,
    SearchService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
