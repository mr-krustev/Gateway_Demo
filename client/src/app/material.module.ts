import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';

const material = [
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule
]

@NgModule({
    imports: material,
    exports: material
})
export class MaterialModule { }