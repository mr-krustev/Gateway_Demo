import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormError } from 'src/app/models/form-error';
import { Gateway } from 'src/app/models/gateway';
import { GatewayService } from 'src/app/services/gateway.service';
import { getFormValidationErrors } from 'src/app/utilities/form-validation';

@Component({
  selector: 'app-add-peripheral-dialog',
  templateUrl: './add-peripheral-dialog.component.html',
  styleUrls: ['./add-peripheral-dialog.component.css']
})
export class AddPeripheralDialogComponent implements OnInit {
  peripheralDialogForm: FormGroup;
  formErrors: FormError[];

  constructor(
    private dialogRef: MatDialogRef<AddPeripheralDialogComponent>,
    private fb: FormBuilder,
    private gatewayService: GatewayService,
    @Inject(MAT_DIALOG_DATA) protected gateway: Gateway) {
  }

  ngOnInit() {
    this.peripheralDialogForm = this.fb.group({
      vendor: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.peripheralDialogForm.valid) {
      this.formErrors = getFormValidationErrors(this.peripheralDialogForm);
      return;
    }

    this.dialogRef.close(this.peripheralDialogForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.peripheralDialogForm.reset();
  }
}