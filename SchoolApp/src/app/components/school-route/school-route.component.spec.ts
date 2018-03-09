import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRouteComponent } from './school-route.component';

describe('SchoolRouteComponent', () => {
  let component: SchoolRouteComponent;
  let fixture: ComponentFixture<SchoolRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
