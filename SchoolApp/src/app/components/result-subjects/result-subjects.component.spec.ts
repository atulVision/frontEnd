import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSubjectsComponent } from './result-subjects.component';

describe('ResultSubjectsComponent', () => {
  let component: ResultSubjectsComponent;
  let fixture: ComponentFixture<ResultSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
