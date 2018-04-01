import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDayComponent } from './school-day.component';

describe('SchoolDayComponent', () => {
  let component: SchoolDayComponent;
  let fixture: ComponentFixture<SchoolDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
