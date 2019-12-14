import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { data } from "../data";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root"
})
export class FetchService {
  public data: Product[];
  constructor(private http: HttpClient) {
    this.data = data;
  }
  getProductById(id: number): Product {
    return this.data.find((prod: Product) => prod.id === id);
  }
}
