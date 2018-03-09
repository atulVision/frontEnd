import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGalleryComponent } from './school-gallery.component';

describe('SchoolGalleryComponent', () => {
  let component: SchoolGalleryComponent;
  let fixture: ComponentFixture<SchoolGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
