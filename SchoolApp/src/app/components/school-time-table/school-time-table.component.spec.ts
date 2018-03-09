import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTimeTableComponent } from './school-time-table.component';

describe('SchoolTimeTableComponent', () => {
  let component: SchoolTimeTableComponent;
  let fixture: ComponentFixture<SchoolTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
