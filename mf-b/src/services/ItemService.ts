export interface Item {
  id: number;
  name: string;
}

class ItemService {
  private items: Item[] = [];
  private nextId = 1;

  getItems(): Item[] {
    return [...this.items].sort((a, b) => a.id - b.id);
  }

  createItem(name: string): Item {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 50) {
      throw new Error("Name is required and must act under 50 characters.");
    }
    
    const newItem: Item = {
      id: this.nextId++,
      name: trimmedName,
    };
    
    this.items.push(newItem);
    return newItem;
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateItem(id: number, name: string): Item | undefined {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 50) {
      throw new Error("Name is required and must act under 50 characters.");
    }

    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      this.items[itemIndex] = { ...this.items[itemIndex], name: trimmedName };
      return this.items[itemIndex];
    }
    return undefined;
  }
}

export const itemService = new ItemService();
