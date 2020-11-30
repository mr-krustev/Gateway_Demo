import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.gatewayService.getAllGateways().subscribe((gateways) => {
      this.gateways = gateways;
      this.loadingGateways = false;
    }, (err) => {
      this.loadingGateways = false;
      this.snackBar.open(`${err.status}: ${err.message}`, "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
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
        this.snackBar.open(`${err.status}: ${err.message}`, "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      })
  }

  addGateway(gateway: Gateway) {
    this.gatewayService.addGateway(gateway).subscribe((response) => {
      this.gateways.push(response); // Update UI    
      this.snackBar.open("Successfully created gateway.", "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    }, (err) => {
      this.snackBar.open(`${err.status}: ${err.message}`, "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
    })
  }
}
