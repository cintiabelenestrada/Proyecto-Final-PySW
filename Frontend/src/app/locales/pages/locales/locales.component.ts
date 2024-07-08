import { Component } from '@angular/core';
import { LocalInterface } from '../../interfaces/locales.interface';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css'
})
export class LocalesComponent {
  datoslocales!: LocalInterface [];
  
  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.MostrarLocales();
  }

  MostrarLocales (){
    this.localService.getAllLocales().subscribe( 
      (data:any) => {
       this.datoslocales  = data;
        console.log('data ',JSON.stringify(data));
      },
      (error:any) => {
        console.log(error);
      } 
    )
  } 
}