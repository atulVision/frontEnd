import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTimeTableComponent } from './list-time-table.component';

describe('ListTimeTableComponent', () => {
  let component: ListTimeTableComponent;
  let fixture: ComponentFixture<ListTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
