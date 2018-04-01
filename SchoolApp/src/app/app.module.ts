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
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { DivisionService } from './services/division.service';
import { SchoolSubjectComponent } from './components/school-subject/school-subject.component';
import { ExamTimeTableComponent } from './components/exam-time-table/exam-time-table.component';
import { SchoolDayComponent } from './components/school-day/school-day.component';
import { ListBusStopComponent } from './components/list-bus-stop/list-bus-stop.component';
import { ListRouteComponent } from './components/list-route/list-route.component';
import { ListBusComponent } from './components/list-bus/list-bus.component';
import { ListDriverComponent } from './components/list-driver/list-driver.component';
import { ListDivisionComponent } from './components/list-division/list-division.component';
import { ListClassesComponent } from './components/list-classes/list-classes.component';
import { ListTeacherComponent } from './components/list-teacher/list-teacher.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { ListAlbumComponent } from './components/list-album/list-album.component';
import { ListGalleryComponent } from './components/list-gallery/list-gallery.component';
import { ListBookTypeComponent } from './components/list-book-type/list-book-type.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { ListNotificationComponent } from './components/list-notification/list-notification.component';
import { ListAttendanceComponent } from './components/list-attendance/list-attendance.component';
import { ListHomeWorkComponent } from './components/list-home-work/list-home-work.component';
import { ListTimeTableComponent } from './components/list-time-table/list-time-table.component';
import { ListExamComponent } from './components/list-exam/list-exam.component';
import { ListSubjectComponent } from './components/list-subject/list-subject.component';
import { ListExamTimeTableComponent } from './components/list-exam-time-table/list-exam-time-table.component';
import { ListResultComponent } from './components/list-result/list-result.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'division/:action', component: SchoolDivisionComponent },
  { path: 'list/division', component: ListDivisionComponent },
  { path: 'class/:action', component: SchoolClassComponent },
  { path: 'list/class', component: ListClassesComponent },
  { path: 'student/:action', component: SchoolStudentComponent },
  { path: 'list/student', component: ListStudentComponent },
  { path: 'teacher/:action', component: SchoolTeacherComponent },
  { path: 'list/teacher', component: ListTeacherComponent },
  { path: 'driver/:action', component: SchoolDriverComponent },
  { path: 'list/driver', component: ListDriverComponent },
  { path: 'bus/:action', component: SchoolBusComponent },
  { path: 'list/bus', component: ListBusComponent },
  { path: 'route/:action', component: SchoolRouteComponent },
  { path: 'list/route', component: ListRouteComponent },
  { path: 'homeWork/:action', component: SchoolHomeWorkComponent },
  { path: 'list/homeWork', component: ListClassesComponent },
  { path: 'attendance/:action', component: SchoolAttendanceComponent },
  { path: 'list/attendance', component: ListClassesComponent },
  { path: 'timeTable/:action', component: SchoolTimeTableComponent },
  { path: 'list/timeTable', component: ListClassesComponent },
  { path: 'album/:action', component: SchoolGalleryComponent },
  { path: 'list/album', component: ListClassesComponent },
  { path: 'book/:action', component: SchoolLibraryComponent },
  { path: 'list/book', component: ListClassesComponent },
  { path: 'notification/:action', component: SchoolNotificationComponent },
  { path: 'list/notification', component: ListClassesComponent },
  { path: 'exam/:action', component: SchoolExamComponent },
  { path: 'list/exam', component: ListClassesComponent },
  { path: 'result/:action', component: ResultMarksComponent },
  { path: 'list/result', component: ListClassesComponent },
  { path: 'busStop/:action', component: SchoolBusStopComponent },
  { path: 'list/busStop', component: ListBusStopComponent },
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
    FormModalComponent,
    SchoolSubjectComponent,
    ExamTimeTableComponent,
    SchoolDayComponent,
    ListBusStopComponent,
    ListRouteComponent,
    ListBusComponent,
    ListDriverComponent,
    ListDivisionComponent,
    ListClassesComponent,
    ListTeacherComponent,
    ListStudentComponent,
    ListAlbumComponent,
    ListGalleryComponent,
    ListBookTypeComponent,
    ListBookComponent,
    ListNotificationComponent,
    ListAttendanceComponent,
    ListHomeWorkComponent,
    ListTimeTableComponent,
    ListExamComponent,
    ListSubjectComponent,
    ListExamTimeTableComponent,
    ListResultComponent
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
