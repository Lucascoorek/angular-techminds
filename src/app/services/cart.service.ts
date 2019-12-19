import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private _cart = new BehaviorSubject({});
  readonly cart$ = this._cart.asObservable();

  constructor() {}
  private get cart() {
    return this._cart.getValue();
  }
  private set cart(value) {
    this._cart.next(value);
  }
  addToCart(val: object) {
    this.cart = val;
  }
}
