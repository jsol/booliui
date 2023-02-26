import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListingDialogComponent } from './edit-listing-dialog.component';

describe('EditListingDialogComponent', () => {
  let component: EditListingDialogComponent;
  let fixture: ComponentFixture<EditListingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditListingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
