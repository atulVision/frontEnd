import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMarksComponent } from './result-marks.component';

describe('ResultMarksComponent', () => {
  let component: ResultMarksComponent;
  let fixture: ComponentFixture<ResultMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
