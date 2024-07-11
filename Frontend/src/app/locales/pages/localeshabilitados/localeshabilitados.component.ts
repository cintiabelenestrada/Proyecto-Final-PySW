import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';
import { Locales } from '../../interfaces/locales.interface';

@Component({
  selector: 'app-localeshabilitados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './localeshabilitados.component.html',
  styleUrl: './localeshabilitados.component.css'
})
export class LocaleshabilitadosComponent implements OnInit {
  datoslocales!: Locales [];
  
  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.getLocalesHabilitados();
  }

  getLocalesHabilitados (){
    this.localService.getObtenerLocalesHabilitados().subscribe( 
      (data:any) => {
        console.log('data habilitados',JSON.stringify(data));
       this.datoslocales = data;
       console.log('data habilitados',JSON.stringify(data));

      },
      (error:any) => {
        console.log(error);
      } 
    )
  } 
}
