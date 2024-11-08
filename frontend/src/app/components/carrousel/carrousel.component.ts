import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  images: string[] = [];  // Array of image URLs
  activeItem: number = 0;
  counter!: any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getCarrouselItems().subscribe(
      (data: any) => {
        console.log('Carrousel Data:', data); // Log data to check response
        this.images = data.images; // This should assign the image URLs array directly
      }
    );

    this.counter = setInterval(() => {
      this.activeItem = (this.activeItem >= this.images.length - 1) ? 0 : this.activeItem + 1;
    }, 5000); // Change image every 5 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.counter); // Cleanup the interval
  }

  checkIfActive(index: number) {
    return this.activeItem === index; // Check if the current item is active
  }
}

