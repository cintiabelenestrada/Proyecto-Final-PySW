import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CuotaGet } from '../../cuota/interfaces/cuota-get';
import { CuotaService } from '../../cuota/services/cuota.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {}
