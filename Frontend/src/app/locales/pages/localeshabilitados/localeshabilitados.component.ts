import { Component, OnInit } from '@angular/core';
import { LocalInterface } from '../../interfaces/locales.interface';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-localeshabilitados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './localeshabilitados.component.html',
  styleUrl: './localeshabilitados.component.css'
})
export class LocaleshabilitadosComponent implements OnInit {
  datoslocales!: LocalInterface [];
  
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
