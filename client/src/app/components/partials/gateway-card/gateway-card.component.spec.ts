import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayCardComponent } from './gateway-card.component';

describe('GatewayCardComponent', () => {
  let component: GatewayCardComponent;
  let fixture: ComponentFixture<GatewayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewayCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
