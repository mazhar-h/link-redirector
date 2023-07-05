import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkResponse } from '../models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private apiUrl: string = 'https://vamosl.ink/api/v1/urls';

  constructor(private http: HttpClient) { }

  getLink(code: string) {
    return this.http.get<LinkResponse>(this.apiUrl+"/"+code, this.getOptions());
  }

  createLink(url: string) {
    return this.http.post<LinkResponse>(this.apiUrl, { url: url }, this.getOptions());
  }

  getOptions() {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa("user:password")
    });
    
    const httpOptions = {
      headers: headers_object
    };

    return httpOptions;
  }
}