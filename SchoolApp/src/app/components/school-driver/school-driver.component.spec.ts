import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDriverComponent } from './school-driver.component';

describe('SchoolDriverComponent', () => {
  let component: SchoolDriverComponent;
  let fixture: ComponentFixture<SchoolDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
