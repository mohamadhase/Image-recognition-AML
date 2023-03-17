import { Component } from '@angular/core';

@Component({
  selector: 'app-recognition-component',
  templateUrl: './recognition-component.component.html',
  styleUrls: ['./recognition-component.component.css']
})

export class RecognitionComponentComponent {
  // user-selected image file
  selectedImage: File | null = null;
  // URL of the image preview to be displayed to the user
  imagePreviewUrl: string | null = null;
  // property indicates whether the user is currently dragging a file over the component
  dragOver = false;

  // handles the dragover event
  handleDragOver(event: DragEvent) {
    event.preventDefault(); // Prevents the browser's default dragover behavior
    event.stopPropagation(); // Stops the event from bubbling up the DOM
    event.dataTransfer!.dropEffect = 'copy'; // Sets the drop effect to "copy"
    this.dragOver = true; 
  }
  
  // handles the dragleave event
  handleDragLeave(event: DragEvent) {
    event.preventDefault(); // Prevents the browser's default dragleave behavior
    event.stopPropagation(); // Stops the event from bubbling up the DOM
    this.dragOver = false; // Sets the dragOver property to false
  }
  
  // handles the file drop event
  handleFileDrop(event: DragEvent) {
    event.preventDefault(); // Prevents the browser's default drop behavior
    event.stopPropagation(); // Stops the event from bubbling up the DOM
    this.dragOver = false; 
    const files = event.dataTransfer?.files; // Gets the dropped files from the event
    if (files && files[0]) {
      // If at least one file was dropped, set the selectedImage property to the first file
      this.selectedImage = files[0];
      // Create a FileReader object to read the file contents
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          // set the imagePreviewUrl to the data URL if the file was successfully read
          this.imagePreviewUrl = reader.result.toString();
        }
      };
      // Read the file as a data
      reader.readAsDataURL(files[0]);
    }
  }
  
  // handle file input from user
  handleFileInput(event: Event) {  
    const input = event.target as HTMLInputElement;  // get the HTMLInputElement from the event target
    const files = input.files;  // get the files from the HTMLInputElement
    if (files && files[0]) {  // check if files exist and if the first file exists
      this.selectedImage = files[0];  // set the selectedImage to the first file
      const reader = new FileReader();  // create a new FileReader object
      reader.onload = () => {  // set a function to run when the file is loaded
        if (reader.result) {  // check if the result exists
          this.imagePreviewUrl = reader.result.toString();  // set the imagePreviewUrl to the file's data URL
        }
      };
      reader.readAsDataURL(files[0]); 
    }
  }

  // delete the selected image
  deleteImage() {  
    this.selectedImage = null; 
    this.imagePreviewUrl = null; 
  }

  onSubmit() {
    // submit logic 
  }
}


