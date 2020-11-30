import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

  constructor(private gatewayService: GatewayService, private dialog: MatDialog) { }

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
        this.addDevice(device);
      }, (err) => {
        console.log(err)
      })
  }

  addDevice(device: Peripheral) {
    this.gatewayService.addPeripheralDevice(this.gateway._id, device)
      .subscribe((device) => {
        this.gateway.peripherals.push(device); // Update UI;
      }, (err) => {
        console.log(err);
        // Show error to user somehow.
      })
  }

  removeDevice(peripheralId: string) {
    this.gatewayService.removePeripheralDeviceByID(this.gateway._id, peripheralId)
      .subscribe((response) => {
        this.gateway.peripherals = this.gateway.peripherals.filter(p => p._id !== peripheralId); // Update UI.
        console.log(response);
      }, (err) => {
        console.log(err);
      })
  }
}
