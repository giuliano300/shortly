import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { api_url } from "../../main";
import { Users } from "../Interfaces/Users";

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}
    url: string = "Users"

    setUser(user:Users): Observable<Users>{
        return this.http.post<Users>(api_url + this.url, user);
    }
}
