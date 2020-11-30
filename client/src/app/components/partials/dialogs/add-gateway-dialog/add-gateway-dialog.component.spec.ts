import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGatewayDialogComponent } from './add-gateway-dialog.component';

describe('AddGatewayDialogComponent', () => {
  let component: AddGatewayDialogComponent;
  let fixture: ComponentFixture<AddGatewayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGatewayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGatewayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
