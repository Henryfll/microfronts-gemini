export interface Item {
  id: number;
  name: string;
}

class ItemService {
  private items: Item[] = [];
  private nextId = 1;

  getItems(): Item[] {
    return this.items.slice().sort((a, b) => a.id - b.id);
  }

  createItem(name: string): Item {
    if (!name || name.length > 50) {
      throw new Error('Name must be between 1 and 50 characters');
    }
    const newItem: Item = {
      id: this.nextId++,
      name
    };
    this.items.push(newItem);
    return newItem;
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  editItem(id: number, name: string): Item | undefined {
    if (!name || name.length > 50) {
      throw new Error('Name must be between 1 and 50 characters');
    }
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.name = name;
    }
    return item;
  }
}

export const itemService = new ItemService();
