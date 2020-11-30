import { FormGroup, ValidationErrors } from '@angular/forms';
import { FormError } from '../models/form-error';

export function getFormValidationErrors(form: FormGroup): FormError[] {

    const result: FormError[] = [];
    Object.keys(form.controls).forEach(key => {

        const controlErrors: ValidationErrors = form.get(key).errors;
        if (controlErrors) {
            Object.keys(controlErrors).forEach(errorKey => {
                const message = getErrorMessageByErrorKey(errorKey, controlErrors[errorKey]);
                result.push(new FormError(key, message));
            });
        }
    });

    return result;
}

function getErrorMessageByErrorKey(errorKey: string, value: string) {
    if (errorKey.toLowerCase().indexOf('required') >= 0) {
        return 'Field is required.';
    }
    if (errorKey.toLowerCase().indexOf('minlength') >= 0) {
        // tslint:disable-next-line: no-string-literal
        return 'Minimum length of ' + value['requiredLength'] + ' characters is required.';
    }

    if (errorKey.toLowerCase().indexOf('min') >= 0) {
        // tslint:disable-next-line: no-string-literal
        return 'Values below ' + value['min'] + ' are not accepted.';
    }

    return errorKey;
}