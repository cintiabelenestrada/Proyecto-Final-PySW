import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { iconSubset } from './shared/icons/icon-subset';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'Frontend';

  constructor(private iconSetService: IconSetService) {
    this.iconSetService.icons = { ...iconSubset };
  }
}
