import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gateways: Gateway[];

  constructor(private gatewayService: GatewayService) { }

  ngOnInit() {
    this.gatewayService.getAllGateways().subscribe((response) => {
      console.log(response)
    }, (err) => {
      console.log(err);
    })
  }
}
