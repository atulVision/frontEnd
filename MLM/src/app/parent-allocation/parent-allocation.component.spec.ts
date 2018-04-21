import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAllocationComponent } from './parent-allocation.component';

describe('ParentAllocationComponent', () => {
  let component: ParentAllocationComponent;
  let fixture: ComponentFixture<ParentAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
