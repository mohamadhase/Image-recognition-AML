import { Component } from '@angular/core';

@Component({
  selector: 'app-recognition-component',
  templateUrl: './recognition-component.component.html',
  styleUrls: ['./recognition-component.component.css']
})

export class RecognitionComponentComponent {

  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;
  dragOver = false;

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
    this.dragOver = true;
  }
  
  handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }
  
  handleFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      this.selectedImage = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagePreviewUrl = reader.result.toString();
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }
  
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files[0]) {
      this.selectedImage = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.imagePreviewUrl = reader.result.toString();
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }
  
  deleteImage() {
    this.selectedImage = null;
    this.imagePreviewUrl = null;
  }

  onSubmit() {
    // submit logic 
  }
}


