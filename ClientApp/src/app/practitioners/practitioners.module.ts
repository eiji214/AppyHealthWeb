import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreModule } from '../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { PractitionersListComponent } from './practitioners-list/practitioners-list.component';
import { PractitionerDetailComponent } from './practitioner-detail/practitioner-detail.component';
import { PractitionersRoutingModule } from './practitioners-routing.module';
import { PractitionerNewComponent } from './practitioner-new/practitioner-new.component';
import { PractitionersSearchComponent } from './practitioners-search/practitioners-search.component';
import { PractitionersLayoutComponent } from './layout/practitioners-layout.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PractitionersRoutingModule,
    NgSelectModule
  ],
  declarations: [
    PractitionersListComponent,
    PractitionerDetailComponent,
    PractitionerNewComponent,
    PractitionersSearchComponent,
    PractitionersLayoutComponent,
  ],
  exports: [
    PractitionersSearchComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PractitionersModule { }
