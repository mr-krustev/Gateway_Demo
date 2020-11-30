import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeripheralDialogComponent } from './add-peripheral-dialog.component';

describe('AddPeripheralDialogComponent', () => {
  let component: AddPeripheralDialogComponent;
  let fixture: ComponentFixture<AddPeripheralDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeripheralDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeripheralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
