import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="create-item">
      <h3>Crear Nuevo Item</h3>
      <div class="form-group">
        <input 
          [(ngModel)]="newItemName" 
          placeholder="Nombre del item (máx 50 char)" 
          maxlength="50"
          (keyup.enter)="createItem()"
        />
        <button (click)="createItem()" [disabled]="!isValid()">Crear</button>
      </div>
    </div>
  `,
  styles: [`
    .create-item {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .form-group {
      display: flex;
      gap: 10px;
    }
    input {
      flex: 1;
      padding: 8px;
    }
    button {
      padding: 8px 15px;
      cursor: pointer;
    }
    button[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `]
})
export class CreateItemComponent {
  private itemService = inject(ItemService);
  newItemName = '';

  isValid(): boolean {
    return this.newItemName.trim().length > 0 && this.newItemName.length <= 50;
  }

  createItem(): void {
    if (this.isValid()) {
      this.itemService.createItem(this.newItemName);
      this.newItemName = '';
    }
  }
}
