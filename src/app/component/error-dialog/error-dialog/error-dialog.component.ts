import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

// error-dialog.component.ts
@Component({
  selector: 'app-error-dialog',
  template: `
  <div class="bg-grey bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h1 mat-dialog-title class="text-xl font-semibold text-gray-800">{{ title }}</h1>
      <div mat-dialog-content class="text-gray-600 mt-2">{{ message }}</div>
      <div mat-dialog-actions  class="mt-4 flex justify-end gap-2">
        <button mat-button (click)="onCancel()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Chiudi</button>
      </div>
    </div>
  `
})
export class ErrorDialogComponent {
  title!: string;
  message!: string;

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
