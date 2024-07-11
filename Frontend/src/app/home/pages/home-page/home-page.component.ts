import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css',
    '../../../shared/styles/custom-colors.css',
  ],
})
export class HomePageComponent {
  locales = [
    {
      nombre: 'Panadería El Horno Dorado',
      direccion: 'Avenida San Martín 150',
      descripcion: 'Panadería artesanal con productos frescos todos los días',
      superficie: 80,
      habilitado: true,
      customers: 200,
      pathimagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxvSziTk6YbMfxvlpw8bGPNOCbMEcPRty_Q&s',
      alquilado: false,
    },
    {
      nombre: 'Librería El Libro Mágico',
      direccion: 'Calle Belgrano 456',
      descripcion:
        'Librería con una gran variedad de libros y material escolar',
      superficie: 120,
      habilitado: true,
      customers: 150,
      pathimagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxiJoARp83H-pj8StnMyGx8UwzCpOmMdC5ekVtyBfSLiuKGAjiVNwVKZRg0pziif01OiY&usqp=CAU',
      alquilado: false,
    },
    {
      nombre: 'Tienda de Ropa Estilo Joven',
      direccion: 'Calle Mitre 789',
      descripcion: 'Tienda de ropa con las últimas tendencias para jóvenes',
      superficie: 150,
      habilitado: true,
      customers: 300,
      pathimagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4UyrqDE5bx7T6HLX2URzRxlzeST9zgry5hA&s', // No image path provided
      alquilado: false,
    },
    {
      nombre: 'Restaurante El Sabor de Casa',
      direccion: 'Calle Sarmiento 1234',
      descripcion: 'Restaurante con comida casera y ambiente familiar',
      superficie: 200,
      habilitado: true,
      customers: '40 mesas', // Representing capacity as a string
      pathimagen:
        'https://dcdn.mitiendanube.com/stores/854/520/products/2f9cd2a1-9b46-43cd-a670-0a921db3e3541-b04a5e75a5f325485d16800180628095-1024-1024.jpeg',
      alquilado: false,
    },
    {
      nombre: 'Gimnasio Fitness Center',
      direccion: 'Avenida Jujuy 5678',
      descripcion: 'Gimnasio con equipamiento moderno y clases grupales',
      superficie: 300,
      habilitado: true,
      customers: [
        { id: 1, nombre: 'Juan Perez', email: 'juan@perez.com' },
        { id: 2, nombre: 'Ana Lopez', email: 'ana@lopez.com' },
        // ... more customers
      ],
      pathimagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJHTAkpnCRVOLcgMBc-HE0buimTNij1iREg&s',
      alquilado: false,
    },
  ];
}
