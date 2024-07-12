import { Component } from '@angular/core';
import { LocalInterface } from '../../interfaces/locales.interface';
import { LocalService } from '../../services/local.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './locales.component.html',
  styleUrl: './locales.component.css'
})
export class LocalesComponent {
  datoslocales!: LocalInterface [];
  
  constructor(private route: ActivatedRoute, private router: Router,
    private localService: LocalService) {}
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
  capturarInfoLocal(localedit:any) {
    console.log(localedit);
  }
  editarLocal(localedit: any): void {
    const id = localedit._id;
    console.log(id);
    this.router.navigate(['locales/edit/', id]);
  }
}