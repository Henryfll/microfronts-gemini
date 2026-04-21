import { Component } from '@angular/core';
import { CreateItemComponent } from './create-item/create-item.component';
import { ListItemsComponent } from './list-items/list-items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CreateItemComponent, ListItemsComponent],
  template: `
    <div class="main-container">
      <h2>Microfrontend A (Angular)</h2>
      <app-create-item></app-create-item>
      <app-list-items></app-list-items>
    </div>
  `,
  styles: [`
    .main-container {
      font-family: sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class App {
}
