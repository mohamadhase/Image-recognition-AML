import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  // Inject the HttpClient service in the constructor
  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to a recognition API to recognize a photo.
   * @param photo The photo to recognize.
   * @returns An observable of the response from the recognition API.
   */
  public openGate(photo: any): Observable<any> {
    // Define the URL and data for the POST request
    const apiUrl = 'http://localhost:8000/open_gate';
    // Send the POST request and return the observable of the response
    return this.http.get(apiUrl);
  }
  public closeGate(photo: any): Observable<any> {
    // Define the URL and data for the POST request
    const apiUrl = 'http://localhost:8000/close_gate';
    // Send the POST request and return the observable of the response
    return this.http.get(apiUrl);
  }
}
