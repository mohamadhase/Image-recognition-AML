import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedPhotoService {
  private imageContent: string = "";
  setImageContent(content: string) {
    this.imageContent = content;
  }
  getImageContent() {
    return this.imageContent;
  }

  constructor() { }
}
