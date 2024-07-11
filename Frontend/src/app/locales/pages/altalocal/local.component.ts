import { Component } from '@angular/core';
import { LocalInterface } from '../../interfaces/locales.interface';
import { LocalService } from '../../services/local.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent {
  datoslocales: LocalInterface;

  constructor(private localService: LocalService) {this.datoslocales = new LocalInterface();
  }

  AltaLocal() {
    this.localService.postCreateLocal(this.datoslocales).subscribe(
      (data: any) => {
        this.datoslocales = data;
        console.log('datoslocales data:', JSON.stringify(this.datoslocales));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
