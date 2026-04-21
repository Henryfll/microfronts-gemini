import { Injectable, signal } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items = signal<Item[]>([]);
  private nextId = 1;

  getItems() {
    return this.items.asReadonly();
  }

  createItem(name: string): void {
    if (!name || name.trim().length === 0 || name.length > 50) {
      return;
    }
    const newItem: Item = {
      id: this.nextId++,
      name: name.trim()
    };
    this.items.update(items => [...items, newItem].sort((a, b) => a.id - b.id));
  }

  deleteItem(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  editItem(id: number, newName: string): void {
    if (!newName || newName.trim().length === 0 || newName.length > 50) {
      return;
    }
    this.items.update(items => items.map(item => item.id === id ? { ...item, name: newName.trim() } : item));
  }
}
