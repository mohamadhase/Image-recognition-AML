import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  // Inject the HttpClient service in the constructor
  constructor(private http: HttpClient) { }


  public openGate(): Observable<any> {
    // Define the URL and data for the POST request
    const apiUrl = 'http://localhost:8000/open_gate';
    // Send the POST request and return the observable of the response
    return this.http.get(apiUrl);
  }
  public closeGate(): Observable<any> {
    // Define the URL and data for the POST request
    const apiUrl = 'http://localhost:8000/close_gate';
    // Send the POST request and return the observable of the response
    return this.http.get(apiUrl);
  }
}
