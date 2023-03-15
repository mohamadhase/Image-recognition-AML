import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//  mark the RecognitionService class as a service that can be injected into other components
@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  // Inject the HttpClient service in the constructor
  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to a recognition API to recognize a photo.
   * @param photo The photo to recognize.
   * @returns An observable of the response from the recognition API.
   */
  public RecognizePhoto(photo: any): any {
    // Define the URL and data for the POST request
    const apiUrl = 'http://localhost:4200/recognition';
    const data = { photo: photo };

    // Send the POST request and return the observable of the response
    return this.http.post(apiUrl, data);
  }
}

