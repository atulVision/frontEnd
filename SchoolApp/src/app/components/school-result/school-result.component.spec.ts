import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolResultComponent } from './school-result.component';

describe('SchoolResultComponent', () => {
  let component: SchoolResultComponent;
  let fixture: ComponentFixture<SchoolResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
