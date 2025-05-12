import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api_url } from "../../main";
import { HistoryResponse } from "../Interfaces/HistoryResponse";
import { ShortUrlResponse } from "../Interfaces/ShortUrlResponse";

@Injectable({ providedIn: 'root' })
export class ShortenerService {
  constructor(private http: HttpClient) {}

  url: string = "Url"

  shortenBatch(urls: string[]): Observable<{ original: string, shortUrl: string }[]> {

    const userId = localStorage.getItem("tokenId");

    return this.http.post<{ original: string, shortUrl: string, userId: number }[]>(api_url + this.url + "/batch?userId=" + userId, urls);
  }

  getHistoryUploads(): Observable<HistoryResponse[]>{
      const userId = localStorage.getItem("tokenId");

      return this.http.get<HistoryResponse[]>(api_url + this.url + "/GetListOfUpoloads?userId=" + userId);
  }

  getListOfLinks(guid: string): Observable<ShortUrlResponse[]>{
      const userId = localStorage.getItem("tokenId");

      return this.http.get<ShortUrlResponse[]>(api_url + this.url + "/GetListOfLinks?userId=" + userId + "&guidOperation=" + guid);
  }

  deleteList(guid: string): Observable<ShortUrlResponse[]>{
      const userId = localStorage.getItem("tokenId");

      return this.http.delete<ShortUrlResponse[]>(api_url + this.url + "/DeleteList?userId=" + userId + "&guidOperation=" + guid);
  }

}
