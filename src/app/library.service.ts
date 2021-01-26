import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryDetails } from './library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpClient: HttpClient) { }
  readonly url = 'assets/libraries.json';

  getLibraryDetails() {
    return this.httpClient.get(this.url);
  }

 

}


// Hot and Cold depiction, Statu msg -> Swap, Incremental Control, 0 in Twix

// View Order, Remove arroe, Remove Qty