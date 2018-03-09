import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route, Routes} from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SchoolClassComponent } from './components/school-class/school-class.component';
import { SchoolTeacherComponent } from './components/school-teacher/school-teacher.component';
import { SchoolDriverComponent } from './components/school-driver/school-driver.component';
import { SchoolBusComponent } from './components/school-bus/school-bus.component';
import { SchoolRouteComponent } from './components/school-route/school-route.component';
import { SchoolHomeWorkComponent } from './components/school-home-work/school-home-work.component';
import { SchoolAttendanceComponent } from './components/school-attendance/school-attendance.component';
import { SchoolTimeTableComponent } from './components/school-time-table/school-time-table.component';
import { SchoolGalleryComponent } from './components/school-gallery/school-gallery.component';
import { SchoolLibraryComponent } from './components/school-library/school-library.component';
import { SchoolNotificationComponent } from './components/school-notification/school-notification.component';
import { SchoolResultComponent } from './components/school-result/school-result.component';
import { LoginComponent } from './components/login/login.component';
import { ResultSubjectsComponent } from './components/result-subjects/result-subjects.component';
import { ResultMarksComponent } from './components/result-marks/result-marks.component';
import { SchoolStudentComponent } from './components/school-student/school-student.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'classes', component: SchoolClassComponent },
  { path: 'students', component: SchoolStudentComponent },
  { path: 'teachers', component: SchoolTeacherComponent },
  { path: 'drivers', component: SchoolDriverComponent },
  { path: 'buses', component: SchoolBusComponent },
  { path: 'routes', component: SchoolRouteComponent },
  { path: 'homeWork', component: SchoolHomeWorkComponent },
  { path: 'attendance', component: SchoolAttendanceComponent },
  { path: 'timeTable', component: SchoolTimeTableComponent },
  { path: 'gallery', component: SchoolGalleryComponent },
  { path: 'library', component: SchoolLibraryComponent },
  { path: 'notifications', component: SchoolNotificationComponent },
  { path: 'results', component: SchoolResultComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    DashboardComponent,
    FooterComponent,
    SchoolClassComponent,
    SchoolTeacherComponent,
    SchoolDriverComponent,
    SchoolBusComponent,
    SchoolRouteComponent,
    SchoolHomeWorkComponent,
    SchoolAttendanceComponent,
    SchoolTimeTableComponent,
    SchoolGalleryComponent,
    SchoolLibraryComponent,
    SchoolNotificationComponent,
    SchoolResultComponent,
    LoginComponent,
    ResultSubjectsComponent,
    ResultMarksComponent,
    SchoolStudentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    LoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
