
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from "./core/log-in/log-in.component";
import {StudentPathComponent} from "./core/student-path/student-path.component";
import {ScanPageComponent} from "./core/student-path/scan-page/scan-page.component";
import {ExcusePageComponent} from "./core/student-path/excuse-page/excuse-page.component";
import {LecturerPathComponent} from "./core/lecturer-path/lecturer-path.component";
import {WarningPageComponent} from "./core/lecturer-path/course/warning-page/warning-page.component";
import {QrGenerationPageComponent} from "./core/lecturer-path/course/qr-generation-page/qr-generation-page.component";
import {CourseComponent} from "./core/lecturer-path/course/course.component";
import {NotificationsComponent} from "./core/notifications/notifications.component";
import {UpdateStatusComponent} from "./core/lecturer-path/course/update-status/update-status.component";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'notification', component: NotificationsComponent },
  { path: 'student-dashboard', component: StudentPathComponent },
  { path: 'student-dashboard/scanQR', component: ScanPageComponent },
  { path: 'student-dashboard/excuse', component: ExcusePageComponent },
  { path: 'lecturer-dashboard', component: LecturerPathComponent },
  { path: 'lecturer-dashboard/course/:id', component: CourseComponent },
  { path: 'lecturer-dashboard/course/:id/warning', component: WarningPageComponent },
  { path: 'lecturer-dashboard/course/:id/qr-generation', component: QrGenerationPageComponent },
  { path: 'lecturer-dashboard/course/:id/update-status', component: UpdateStatusComponent },
  { path: '**', redirectTo: '/log-in' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
