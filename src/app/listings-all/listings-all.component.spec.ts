import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsAllComponent } from './listings-all.component';

describe('ListingsAllComponent', () => {
  let component: ListingsAllComponent;
  let fixture: ComponentFixture<ListingsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
