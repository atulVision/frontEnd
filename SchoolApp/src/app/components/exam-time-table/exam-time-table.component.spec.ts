import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTimeTableComponent } from './exam-time-table.component';

describe('ExamTimeTableComponent', () => {
  let component: ExamTimeTableComponent;
  let fixture: ComponentFixture<ExamTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
