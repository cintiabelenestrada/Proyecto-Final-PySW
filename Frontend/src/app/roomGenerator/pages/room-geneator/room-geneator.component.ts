import { Component, output } from '@angular/core';
import { RoomGeneratorService } from '../../service/room-generator.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../home/components/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room-geneator',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './room-geneator.component.html',
  styleUrls: ['./room-geneator.component.css','../../../app.component.css', '../../../shared/styles/custom-colors.css']
})
export class RoomGeneatorComponent {
  imageUrl: string = '';
  theme: string = '';
  room: string = '';
  restoredImage!: string;
  loading = false;
  message = '';

  constructor(private roomGeneratorService: RoomGeneratorService,
              private toastService: ToastrService,
  ) { }


  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.loading = true;
    this.message = '';
    this.restoredImage = '';
    console.log(this.imageUrl, this.theme, "Bedroom");
    this.roomGeneratorService.startPrediction(this.imageUrl, this.theme, this.room)
      .subscribe(
        startResponse => {
          const endpointUrl = startResponse;

          const checkStatus = () => {
            this.roomGeneratorService.getPredictionStatus(startResponse)
              .subscribe(
                finalResponse => {
                  if (finalResponse.status === 'succeeded') {
                    this.restoredImage = finalResponse.output[1];
                    this.toastService.success('Cuarto decorado existosamente');
                    this.loading = false;
                  } else if (finalResponse.status === 'failed') {
                    this.toastService.error('Error al decorar la imagen');
                    this.message = 'Failed to restore image';
                    this.loading = false;
                  } else {
                    setTimeout(checkStatus, 1000);
                  }
                },
                error => {
                  this.toastService.error('Error al decorar la imagen');
                  this.message = 'Error fetching prediction status';
                  this.loading = false;
                }
              );
          };

          checkStatus();
        },
        error => {
          this.message = 'Error starting prediction';
          this.loading = false;
        }
      );
    }

}
