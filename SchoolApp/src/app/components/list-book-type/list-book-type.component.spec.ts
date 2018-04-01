import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookTypeComponent } from './list-book-type.component';

describe('ListBookTypeComponent', () => {
  let component: ListBookTypeComponent;
  let fixture: ComponentFixture<ListBookTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
