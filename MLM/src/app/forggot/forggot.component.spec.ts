import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForggotComponent } from './forggot.component';

describe('ForggotComponent', () => {
  let component: ForggotComponent;
  let fixture: ComponentFixture<ForggotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForggotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForggotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
