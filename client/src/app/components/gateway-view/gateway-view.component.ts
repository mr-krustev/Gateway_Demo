import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-gateway-view',
  templateUrl: './gateway-view.component.html',
  styleUrls: ['./gateway-view.component.css']
})
export class GatewayViewComponent implements OnInit {
  private GATEWAY_PARAM_ID = 'gatewayId';
  loadingGateway = true;
  gateway: Gateway;

  constructor(private route: ActivatedRoute,
    private gatewayService: GatewayService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gatewayService.getGatewayById(params[this.GATEWAY_PARAM_ID]).subscribe((gateway) => {
        this.gateway = gateway;
        this.loadingGateway = false;
      }, (response) => {
        const err = response.error;
        console.log(err);
      })
    })
  }

}
