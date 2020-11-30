import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';
import { AddGatewayDialogComponent } from '../dialogs/add-gateway-dialog/add-gateway-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gateways: Gateway[];
  loadingGateways = true;

  constructor(private gatewayService: GatewayService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.gatewayService.getAllGateways().subscribe((gateways) => {
      this.gateways = gateways;
      console.log(this.gateways);
      this.loadingGateways = false;
    }, (err) => {
      this.loadingGateways = false;
      console.log(err);
      // Maybe implement an error handler that can show a message.
    })
  }

  openAddGatewayDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '85vh';
    dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '70vw';

    this.dialog.open(AddGatewayDialogComponent, dialogConfig).afterClosed()
      .subscribe((result) => {
        this.addGateway(result);
      }, (err) => {
        console.log(err);
      })
  }

  addGateway(gateway: Gateway) {
    this.gatewayService.addGateway(gateway).subscribe((response) => {
      this.gateways.push(response); // Update UI    
    }, (err) => {
      console.log(err);
    })
  }
}
