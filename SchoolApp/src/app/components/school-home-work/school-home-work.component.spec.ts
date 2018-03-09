import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolHomeWorkComponent } from './school-home-work.component';

describe('SchoolHomeWorkComponent', () => {
  let component: SchoolHomeWorkComponent;
  let fixture: ComponentFixture<SchoolHomeWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolHomeWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolHomeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
