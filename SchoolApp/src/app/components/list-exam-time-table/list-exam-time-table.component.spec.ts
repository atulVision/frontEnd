import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamTimeTableComponent } from './list-exam-time-table.component';

describe('ListExamTimeTableComponent', () => {
  let component: ListExamTimeTableComponent;
  let fixture: ComponentFixture<ListExamTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExamTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
