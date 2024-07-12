import { Component, output } from '@angular/core';
import { RoomGeneratorService } from '../../service/room-generator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-geneator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './room-geneator.component.html',
  styleUrls: ['./room-geneator.component.css','../../../app.component.css']
})
export class RoomGeneatorComponent {
  imageUrl: string = '';
  theme: string = '';
  room: string = '';
  restoredImage!: string;
  loading = false;
  message = '';

  constructor(private roomGeneratorService: RoomGeneratorService) { }
  
  ngOnInit(): void {
    this.roomGeneratorService.getPredictionStatus("srwc1qf811rj60cgmp7v6snhec").subscribe(
      response => {
        this.restoredImage = response.output[1];
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    
  }

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
    console.log(this.imageUrl, this.theme, this.room);
    this.roomGeneratorService.startPrediction(this.imageUrl, this.theme, this.room)
      .subscribe(
        startResponse => {
          const endpointUrl = startResponse;

          const checkStatus = () => {
            this.roomGeneratorService.getPredictionStatus("srwc1qf811rj60cgmp7v6snhec")
              .subscribe(
                finalResponse => {
                  if (finalResponse.status === 'succeeded') {
                    this.restoredImage = finalResponse.output[1];
                    this.loading = false;
                  } else if (finalResponse.status === 'failed') {
                    this.message = 'Failed to restore image';
                    this.loading = false;
                  } else {
                    setTimeout(checkStatus, 1000);
                  }
                },
                error => {
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
