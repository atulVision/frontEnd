import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHomeWorkComponent } from './list-home-work.component';

describe('ListHomeWorkComponent', () => {
  let component: ListHomeWorkComponent;
  let fixture: ComponentFixture<ListHomeWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHomeWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHomeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
