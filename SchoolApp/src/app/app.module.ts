import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { SchoolClassComponent } from './components/administration/class-module/school-class/school-class.component';
import { SchoolTeacherComponent } from './components/administration/teacher-module/school-teacher/school-teacher.component';
import { SchoolDriverComponent } from './components/transportation/driver-module/school-driver/school-driver.component';
import { SchoolBusComponent } from './components/transportation/bus-module/school-bus/school-bus.component';
import { SchoolRouteComponent } from './components/transportation/route-module/school-route/school-route.component';
import { SchoolHomeWorkComponent } from './components/teacher-admin/home-work-module/school-home-work/school-home-work.component';
import { SchoolAttendanceComponent } from './components/teacher-admin/attendance-module/school-attendance/school-attendance.component';
import { SchoolTimeTableComponent } from './components/teacher-admin/time-table-module/school-time-table/school-time-table.component';
import { SchoolGalleryComponent } from './components/administration/gallery-module/school-gallery/school-gallery.component';
import { SchoolLibraryComponent } from './components/administration/library-module/school-library/school-library.component';
import { SchoolNotificationComponent } from './components/administration/notification-module/school-notification/school-notification.component';
import { SchoolResultComponent } from './components/school-result/school-result.component';
import { LoginComponent } from './components/common/login/login.component';
import { ResultMarksComponent } from './components/result-marks/result-marks.component';
import { SchoolStudentComponent } from './components/administration/student-module/school-student/school-student.component';
import { ErrorComponent } from './components/common/error/error.component';
import { SchoolExamComponent } from './components/teacher-admin/exam-module/school-exam/school-exam.component';
import { ProfileComponent } from './components/common/profile/profile.component';
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
import { SchoolBusStopComponent } from './components/transportation/bus-stop-module/school-bus-stop/school-bus-stop.component';
import { BusStopService } from './services/bus-stop.service';
import { ResultSubjectsComponent } from './components/result-subjects/result-subjects.component';
import { SchoolAlbumComponent } from './components/administration/gallery-module/school-album/school-album.component';
import { SchoolBookTypeComponent } from './components/administration/library-module/school-book-type/school-book-type.component';
import { SchoolDivisionComponent } from './components/administration/division-module/school-division/school-division.component';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { DivisionService } from './services/division.service';
import { SchoolSubjectComponent } from './components/teacher-admin/exam-module/school-subject/school-subject.component';
import { SchoolDayComponent } from './components/teacher-admin/time-table-module/school-day/school-day.component';
import { ListBusStopComponent } from './components/transportation/bus-stop-module/list-bus-stop/list-bus-stop.component';
import { ListRouteComponent } from './components/transportation/route-module/list-route/list-route.component';
import { ListBusComponent } from './components/transportation/bus-module/list-bus/list-bus.component';
import { ListDriverComponent } from './components/transportation/driver-module/list-driver/list-driver.component';
import { ListDivisionComponent } from './components/administration/division-module/list-division/list-division.component';
import { ListClassesComponent } from './components/administration/class-module/list-classes/list-classes.component';
import { ListTeacherComponent } from './components/administration/teacher-module/list-teacher/list-teacher.component';
import { ListStudentComponent } from './components/administration/student-module/list-student/list-student.component';
import { ListAlbumComponent } from './components/administration/gallery-module/list-album/list-album.component';
import { ListGalleryComponent } from './components/administration/gallery-module/list-gallery/list-gallery.component';
import { ListBookTypeComponent } from './components/administration/library-module/list-book-type/list-book-type.component';
import { ListBookComponent } from './components/administration//library-module/list-book/list-book.component';
import { ListNotificationComponent } from './components/administration/notification-module/list-notification/list-notification.component';
import { ListAttendanceComponent } from './components/teacher-admin/attendance-module/list-attendance/list-attendance.component';
import { ListHomeWorkComponent } from './components/teacher-admin/home-work-module/list-home-work/list-home-work.component';
import { ListTimeTableComponent } from './components/teacher-admin/time-table-module/list-time-table/list-time-table.component';
import { ListExamComponent } from './components/teacher-admin/exam-module/list-exam/list-exam.component';
import { ListSubjectComponent } from './components/teacher-admin/exam-module/list-subject/list-subject.component';
import { ListExamTimeTableComponent } from './components/teacher-admin/time-table-module/list-exam-time-table/list-exam-time-table.component';
import { ListResultComponent } from './components/list-result/list-result.component';
import { UserService } from './services/user.service';
import { BookTypeService } from './services/book-type.service';
import { GalleryService } from './services/gallery.service';
import { ListDayComponent } from './components/teacher-admin/time-table-module/list-day/list-day.component';
import { SchoolExamTimeTableComponent } from './components/teacher-admin/time-table-module/school-exam-time-table/school-exam-time-table.component';
import { SubjectService } from './services/subject.service';
import { DayService } from './services/day.service';
import { ExamTimeTableService } from './services/exam-time-table.service';

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
  { path: 'busStop/:action', component: SchoolBusStopComponent },
  { path: 'list/busStop', component: ListBusStopComponent },
  { path: 'route/:action', component: SchoolRouteComponent },
  { path: 'list/route', component: ListRouteComponent },
  { path: 'album/:action', component: SchoolAlbumComponent },
  { path: 'list/album', component: ListAlbumComponent },
  { path: 'gallery/:action', component: SchoolGalleryComponent },
  { path: 'list/gallery', component: ListGalleryComponent },
  { path: 'bookType/:action', component: SchoolBookTypeComponent },
  { path: 'list/bookType', component: ListBookTypeComponent },
  { path: 'book/:action', component: SchoolLibraryComponent },
  { path: 'list/book', component: ListBookComponent },
  { path: 'notification/:action', component: SchoolNotificationComponent },
  { path: 'list/notification', component: ListNotificationComponent },
  { path: 'subject/:action', component: SchoolSubjectComponent },
  { path: 'list/subject', component: ListSubjectComponent },
  { path: 'exam/:action', component: SchoolExamComponent },
  { path: 'list/exam', component: ListExamComponent },
  { path: 'result/:action', component: ResultMarksComponent },
  { path: 'list/result', component: ListClassesComponent },
  { path: 'homeWork/:action', component: SchoolHomeWorkComponent },
  { path: 'list/homeWork', component: ListHomeWorkComponent },
  { path: 'attendance/:action', component: SchoolAttendanceComponent },
  { path: 'list/attendance', component: ListClassesComponent },
  { path: 'day/:action', component: SchoolDayComponent },
  { path: 'list/day', component: ListDayComponent },
  { path: 'timeTable/:action', component: SchoolTimeTableComponent },
  { path: 'list/timeTable', component: ListTimeTableComponent },
  { path: 'examTimeTable/:action', component: SchoolExamTimeTableComponent },
  { path: 'list/examTimeTable', component: ListExamTimeTableComponent },
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
    SchoolExamComponent,
    ProfileComponent,
    SchoolBusStopComponent,
    ResultSubjectsComponent,
    SchoolAlbumComponent,
    SchoolBookTypeComponent,
    SchoolDivisionComponent,
    SchoolSubjectComponent,
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
    ListResultComponent,
    ListDayComponent,
    SchoolExamTimeTableComponent
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
    DivisionService,
    UserService,
    BookTypeService,
    GalleryService,
    SubjectService,
    DayService,
    ExamTimeTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
