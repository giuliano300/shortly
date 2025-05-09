import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api_url } from "../../main";

@Injectable({ providedIn: 'root' })
export class ShortenerService {
  constructor(private http: HttpClient) {}

  url: string = "Url/batch"

  shortenBatch(urls: string[]): Observable<{ original: string, shortUrl: string }[]> {

    const userId = localStorage.getItem("tokenId");

    return this.http.post<{ original: string, shortUrl: string, userId: number }[]>(api_url + this.url + "?userId=" + userId, urls);
  }
}
