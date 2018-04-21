import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NavbarComponent } from './navbar/navbar.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BussinessComponent } from './bussiness/bussiness.component';
import { ContactComponent } from './contact/contact.component';
import { ForggotComponent } from './forggot/forggot.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { ParentAllocationComponent } from './parent-allocation/parent-allocation.component';
import { MyDataTransferService } from './register/my-data-transfer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MdButtonModule,MdCardModule,MdMenuModule,MdToolbarModule,MdIconModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyRequestComponent } from './my-request/my-request.component';
import { OtherRequestComponent } from './other-request/other-request.component';
import { ViewTreeComponent } from './view-tree/view-tree.component';
import { BankDetailsService } from './service/bank-details.service';
import { UserRequestDetailsService } from './service/user-request-details.service';
import { UserRegistrationService } from './service/user-registration.service';
import { TreeViewDetailsService } from './service/tree-view-details.service';
import { PaymentRequestService } from './service/payment-request.service';
import { LoginService } from './service/login.service';
import { Broadcaster } from './utils/broadcaster.service';
const appRoutes: Routes = [
  {
    path: ' ',
    component: LoginComponent
  },
  {
    path: 'parent-allocation',
    component: ParentAllocationComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    BussinessComponent,
    ContactComponent,
    ForggotComponent,
    Navbar2Component,
    ParentAllocationComponent,
    EditProfileComponent,
    MyRequestComponent,
    OtherRequestComponent,
    ViewTreeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    // MdButtonModule,
    // MdCardModule,
    // MdMenuModule,
    // MdToolbarModule,
    // MdIconModule,
    MatIconModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'bussiness',
        component: BussinessComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'forggot',
        component: ForggotComponent
      },
      {
        path: 'parent-allocation',
        component: ParentAllocationComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'my-request',
        component: MyRequestComponent
      },
      {
        path: 'other-request',
        component: OtherRequestComponent
      },
      {
        path: 'view-tree',
        component: ViewTreeComponent
      },
    ])
  ],
  providers: [MyDataTransferService,
    BankDetailsService, LoginService,
    PaymentRequestService,
    TreeViewDetailsService,
    UserRegistrationService,
    UserRequestDetailsService,
    Broadcaster],
  bootstrap: [AppComponent]
})
export class AppModule { }
