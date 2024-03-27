import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {

  url = 'https://api-ssl.bitly.com/v4/shorten';
  token = '64efaf8b57b613531d26ded8d71a904b2ddcf523';

  constructor(private http: HttpClient) { }

  GetUrlShort(nombreUrl: string): Observable<any> {
    const tokenHeader = new HttpHeaders({Authorization: 'Bearer ' + this.token});

    const body = {
      long_url: nombreUrl
    };

    return this.http.post(this.url, body, { headers: tokenHeader })
  }
}
