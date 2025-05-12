import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
        <p class="text-gray-600 mt-2">{{ message }}</p>

        <div class="mt-4 flex justify-end gap-2">
          <button (click)="cancel()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Annulla
          </button>
          <button (click)="confirm()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Conferma
          </button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  @Input() visible = false;
  @Input() title = 'Sei sicuro?';
  @Input() message = 'Questa azione non può essere annullata.';

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
