import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
import { ResultMarksComponent } from './components/result-marks/result-marks.component';
import { SchoolStudentComponent } from './components/school-student/school-student.component';
import { ErrorComponent } from './components/error/error.component';
import { ListComponent } from './components/list/list.component';
import { SchoolExamComponent } from './components/school-exam/school-exam.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DataServiceService } from './services/data-service.service';
import { BookService } from './services/book.service';
import { TeacherService } from './services/teacher.service';
import { ClassesService } from './services/classes.service';
import { StudentService } from './services/student.service';
import { AttendanceService } from './services/attendance.service';
import { HomeWorkService } from './services/home-work.service';
import { TimeTableService } from './services/time-table.service';
import { ExamService } from './services/exam.service';
import { ResultService } from './services/result.service';
import { DriverService } from './services/driver.service';
import { RouteService } from './services/route.service';
import { AlbumService } from './services/album.service';
import { NotificationService } from './services/notification.service';
import { BusService } from './services/bus.service';
import { LoginService } from './services/login.service';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Broadcaster } from './utils/broadcaster';
import { SchoolBusStopComponent } from './components/school-bus-stop/school-bus-stop.component';
import { BusStopService } from './services/bus-stop.service';
import { ResultSubjectsComponent } from './components/result-subjects/result-subjects.component';
import { SchoolAlbumComponent } from './components/school-album/school-album.component';
import { SchoolBookTypeComponent } from './components/school-book-type/school-book-type.component';
import { SchoolDivisionComponent } from './components/school-division/school-division.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { DivisionService } from './services/division.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'list/:type', component: ListComponent },
  { path: 'division/:action', component: SchoolDivisionComponent },
  { path: 'class/:action', component: SchoolClassComponent },
  { path: 'student/:action', component: SchoolStudentComponent },
  { path: 'teacher/:action', component: SchoolTeacherComponent },
  { path: 'driver/:action', component: SchoolDriverComponent },
  { path: 'bus/:action', component: SchoolBusComponent },
  { path: 'route/:action', component: SchoolRouteComponent },
  { path: 'homeWork/:action', component: SchoolHomeWorkComponent },
  { path: 'attendance/:action', component: SchoolAttendanceComponent },
  { path: 'timeTable/:action', component: SchoolTimeTableComponent },
  { path: 'album/:action', component: SchoolGalleryComponent },
  { path: 'book/:action', component: SchoolLibraryComponent },
  { path: 'notification/:action', component: SchoolNotificationComponent },
  { path: 'exam/:action', component: SchoolExamComponent },
  { path: 'result/:action', component: ResultMarksComponent },
  { path: 'busStop/:action', component: SchoolBusStopComponent },
  { path: '**', component: ErrorComponent }
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
    ResultMarksComponent,
    SchoolStudentComponent,
    ErrorComponent,
    ListComponent,
    SchoolExamComponent,
    ProfileComponent,
    SchoolBusStopComponent,
    ResultSubjectsComponent,
    SchoolAlbumComponent,
    SchoolBookTypeComponent,
    SchoolDivisionComponent,
    FormModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADMGB0VQ3KnYfl_hdW8_24XsEteFkksWM',
      libraries: ['places']
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule.forRoot(),
    AgmDirectionModule
  ],
  providers: [
    LoginService,
    DataServiceService,
    ClassesService,
    TeacherService,
    StudentService,
    AttendanceService,
    HomeWorkService,
    TimeTableService,
    ExamService,
    ResultService,
    DriverService,
    BusService,
    RouteService,
    BookService,
    AlbumService,
    NotificationService,
    Broadcaster,
    BusStopService,
    DivisionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
