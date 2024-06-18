import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './core/log-in/log-in.component';
import { StudentPathComponent } from './core/student-path/student-path.component';
import { ExcusePageComponent } from './core/student-path/excuse-page/excuse-page.component';
import { ScanPageComponent } from './core/student-path/scan-page/scan-page.component';
import { HeaderComponent } from './Helpers/header/header.component';
import { FooterComponent } from './Helpers/footer/footer.component';
import {LecturerPathComponent} from "./core/lecturer-path/lecturer-path.component";


import {WarningPageComponent} from "./core/lecturer-path/course/warning-page/warning-page.component";
import {QrGenerationPageComponent} from "./core/lecturer-path/course/qr-generation-page/qr-generation-page.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelect} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import { CourseComponent } from './core/lecturer-path/course/course.component';
import { BannerComponent } from './Helpers/banner/banner.component';
import { NotificationsComponent } from './core/notifications/notifications.component';
import {QRCodeModule} from "angularx-qrcode";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateStatusComponent } from './core/lecturer-path/course/update-status/update-status.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {MatDialogModule} from "@angular/material/dialog";
import { FeedbackPopupComponent } from './Helpers/feedback-popup/feedback-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    StudentPathComponent,
    ExcusePageComponent,
    ScanPageComponent,
    LecturerPathComponent,
    CourseComponent,
    WarningPageComponent,
    QrGenerationPageComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    NotificationsComponent,
    UpdateStatusComponent,
    FeedbackPopupComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatNativeDateModule,
        MatDatepicker,
        RouterOutlet,
        MatInputModule,
        MatDatepickerToggle,
        MatDatepickerInput,
        MatButton,
        ReactiveFormsModule,
        MatSidenavModule,
        MatSelect,
        MatOption,
        MatTableModule,
        MatProgressSpinner,
        MatSort,
        MatSortHeader,
        MatPaginator,
        MatIcon,
        RouterModule,
        QRCodeModule,
        MatRadioGroup,
        MatRadioButton,
        ZXingScannerModule,
         MatDialogModule,

    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
