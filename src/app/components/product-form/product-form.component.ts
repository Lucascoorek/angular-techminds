import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { FormBuilder, Validators } from "@angular/forms";
import { NavigateService } from "src/app/services/navigate.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  cart: any;
  cartSubscription;
  success: boolean = false;

  constructor(
    private _cartService: CartService,
    private fb: FormBuilder,
    private navigateService: NavigateService
  ) {}

  ngOnInit() {
    this.cartSubscription = this._cartService.cart$.subscribe(val => {
      this.cart = val;
    });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
  userForm = this.fb.group({
    name: ["", Validators.required],
    surname: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    address: this.fb.group({
      city: ["", Validators.required],
      street: ["", Validators.required],
      houseNumber: ["", Validators.required],
      postcode: ["", Validators.required]
    })
  });
  onSubmit() {
    const cartData = {
      product: { ...this.cart },
      user: { ...this.userForm.value }
    };
    this._cartService.addToCart(cartData);
    this.success = true;
    console.log(this.cart);
  }
  goTo() {
    this.navigateService.goTo("/landing");
  }
}
