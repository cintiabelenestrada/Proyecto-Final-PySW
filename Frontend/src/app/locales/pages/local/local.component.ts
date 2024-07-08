import { Component } from '@angular/core';
import { LocalInterface } from '../../interfaces/locales.interface';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent {
  datoslocales! : LocalInterface
  
}
