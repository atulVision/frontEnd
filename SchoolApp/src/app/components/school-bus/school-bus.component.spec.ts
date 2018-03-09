import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBusComponent } from './school-bus.component';

describe('SchoolBusComponent', () => {
  let component: SchoolBusComponent;
  let fixture: ComponentFixture<SchoolBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
