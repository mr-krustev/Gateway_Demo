export class FormError {
    control: string;
    error: string;

    constructor(control: string, error: string) {
        this.control = control;
        this.error = error;
    }
}