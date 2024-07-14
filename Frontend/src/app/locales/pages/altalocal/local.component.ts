import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { FormsModule } from '@angular/forms';
import { Locales } from '../../interfaces/locales.interface';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css','../../../app.component.css']
})
export class LocalComponent {
  datoslocales!: Locales;

  constructor(private localService: LocalService) {;
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
