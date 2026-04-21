import { Component, inject } from '@angular/core';
import { ItemService } from '../item.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="list-items">
      <h3>Lista de Items</h3>
      
      @if (items().length === 0) {
        <p>No hay items registrados.</p>
      } @else {
        <ul>
          @for (item of items(); track item.id) {
            <li>
              @if (editingId === item.id) {
                <input 
                  [(ngModel)]="editName" 
                  maxlength="50"
                  (keyup.enter)="saveEdit(item.id)"
                  class="edit-input"
                />
                <button class="btn-save" (click)="saveEdit(item.id)">Guardar</button>
                <button class="btn-cancel" (click)="cancelEdit()">Cancelar</button>
              } @else {
                <span class="item-text">[{{ item.id }}] {{ item.name }}</span>
                <button class="btn-edit" (click)="startEdit(item.id, item.name)">Editar</button>
                <button class="btn-delete" (click)="deleteItem(item.id)">Eliminar</button>
              }
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [`
    .list-items {
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .item-text {
      flex: 1;
    }
    .edit-input {
      flex: 1;
      padding: 5px;
    }
    button {
      padding: 5px 10px;
      cursor: pointer;
    }
    .btn-delete {
      background-color: #ff4444;
      color: white;
      border: none;
      border-radius: 3px;
    }
    .btn-edit {
      background-color: #ffbb33;
      border: none;
      border-radius: 3px;
    }
    .btn-save {
      background-color: #00C851;
      color: white;
      border: none;
      border-radius: 3px;
    }
    .btn-cancel {
      background-color: #e0e0e0;
      border: none;
      border-radius: 3px;
    }
  `]
})
export class ListItemsComponent {
  private itemService = inject(ItemService);
  
  items = this.itemService.getItems();
  
  editingId: number | null = null;
  editName = '';

  deleteItem(id: number): void {
    this.itemService.deleteItem(id);
  }

  startEdit(id: number, currentName: string): void {
    this.editingId = id;
    this.editName = currentName;
  }

  saveEdit(id: number): void {
    if (this.editName.trim().length > 0 && this.editName.length <= 50) {
      this.itemService.editItem(id, this.editName);
      this.editingId = null;
      this.editName = '';
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editName = '';
  }
}
