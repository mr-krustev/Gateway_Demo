import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FormError } from 'src/app/models/form-error';
import { GatewayService } from 'src/app/services/gateway.service';
import { getFormValidationErrors } from 'src/app/utilities/form-validation';

@Component({
  selector: 'app-add-gateway-dialog',
  templateUrl: './add-gateway-dialog.component.html',
  styleUrls: ['./add-gateway-dialog.component.css']
})
export class AddGatewayDialogComponent implements OnInit {
  gatewayDialogForm: FormGroup;
  formErrors: FormError[];

  constructor(
    private dialogRef: MatDialogRef<AddGatewayDialogComponent>,
    private fb: FormBuilder,
    private gatewayService: GatewayService) {
  }

  ngOnInit() {
    this.gatewayDialogForm = this.fb.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      ipv4: ['', [Validators.required, this.ipv4Validator(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)]] // Add validator
    });
  }

  onSubmit() {
    if (!this.gatewayDialogForm.valid) {
      this.formErrors = getFormValidationErrors(this.gatewayDialogForm);
      return;
    }
    this.dialogRef.close(this.gatewayDialogForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.gatewayDialogForm.reset();
  }

  private ipv4Validator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validddress = nameRe.test(control.value);
      return validddress ? null : { "Invalid IP Address": { value: control.value } };
    };
  }
}
