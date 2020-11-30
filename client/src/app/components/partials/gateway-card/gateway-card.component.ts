import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ConfirmationDialogData } from 'src/app/models/confirmation-dialog-data';
import { Gateway } from 'src/app/models/gateway';
import { Peripheral } from 'src/app/models/peripheral';
import { GatewayService } from 'src/app/services/gateway.service';
import { AddPeripheralDialogComponent } from '../dialogs/add-peripheral-dialog/add-peripheral-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-gateway-card',
  templateUrl: './gateway-card.component.html',
  styleUrls: ['./gateway-card.component.css']
})
export class GatewayCardComponent implements OnInit {
  @Input('gateway') gateway: Gateway;

  constructor(private gatewayService: GatewayService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  removePeripheral(peripheral: Peripheral) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '85vh';
    dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '70vw';
    dialogConfig.data = new ConfirmationDialogData(`You are about to delete ${peripheral.UID} - ${peripheral.vendor}. Are you sure?`, 'Delete?');
    this.dialog.open(ConfirmationDialogComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result) {
        this.removeDevice(peripheral._id)
      }
    })

  }

  openAddPeripheralDeviceDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '85vh';
    dialogConfig.minWidth = '50vw';
    dialogConfig.maxWidth = '70vw';
    dialogConfig.data = this.gateway;
    this.dialog.open(AddPeripheralDialogComponent, dialogConfig)
      .afterClosed().subscribe((device) => {
        if (device) {
          this.addDevice(device);
        }
      }, (err) => {
        this.snackBar.open(`${err.status}: ${err.message}`, undefined, { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      })
  }

  addDevice(device: Peripheral) {
    this.gatewayService.addPeripheralDevice(this.gateway._id, device)
      .subscribe((device) => {
        this.gateway.peripherals.push(device); // Update UI;
        this.snackBar.open('Successfully added device!', "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
      }, (err) => {
        console.log(err.error.error.message);
        this.snackBar.open(`${err.status}: ${err.message}`, "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      })
  }

  removeDevice(peripheralId: string) {
    this.gatewayService.removePeripheralDeviceByID(this.gateway._id, peripheralId)
      .subscribe((response) => {
        this.gateway.peripherals = this.gateway.peripherals.filter(p => p._id !== peripheralId); // Update UI.
        this.snackBar.open('Successfully removed device!', "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-success'] });
      }, (err) => {
        this.snackBar.open(`${err.status}: ${err.message}`, "DISMISS", { duration: 8000, verticalPosition: 'top', panelClass: ['snackbar-error'] });
      })
  }
}
