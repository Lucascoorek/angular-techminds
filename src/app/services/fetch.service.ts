import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { data } from "../data";

@Injectable({
  providedIn: "root"
})
export class FetchService {
  public data: [];
  constructor(private http: HttpClient) {
    this.data = data;
  }
}
