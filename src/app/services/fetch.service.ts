import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { data } from "../data";
import { Product } from "../models/Product";

@Injectable({
  providedIn: "root"
})
export class FetchService {
  public data: Product[] = data;
  private _dataSource = new BehaviorSubject<Product[]>(data);
  readonly dataSource$ = this._dataSource.asObservable();

  constructor() {}
  private get dataSource(): Product[] {
    return this._dataSource.getValue();
  }

  private set dataSource(val: Product[]) {
    this._dataSource.next(val);
  }
  getProductById(id: number): Product {
    return this.dataSource.find((prod: Product) => prod.id === id);
  }
}
