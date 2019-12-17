import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  cart: object;
  cartSubscription;

  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this._cartService.cart$.subscribe(val => {
      this.cart = val;
      console.log(this.cart);
    });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
