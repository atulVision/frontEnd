import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNotificationComponent } from './school-notification.component';

describe('SchoolNotificationComponent', () => {
  let component: SchoolNotificationComponent;
  let fixture: ComponentFixture<SchoolNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
