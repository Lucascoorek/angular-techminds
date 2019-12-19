import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { FetchService } from "src/app/services/fetch.service";
import { Product } from "src/app/models/Product";
import { NgForm } from "@angular/forms";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  @ViewChild("selectForm", { static: true }) ngForm: NgForm;
  public productId: number;
  public product: Product;
  public options: any;
  public price: number;
  public productForm: any;
  public error: boolean;
  formSubscripion;
  routerSubscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fetchService: FetchService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.routerSubscription = this._route.paramMap.subscribe(
      (params: ParamMap) => {
        let id = parseInt(params.get("id"));
        this.productId = id;
      }
    );
    this.product = this._fetchService.getProductById(this.productId);
    this.options = this.product.options;
    this.price = this.product.price;
    this.productForm = this.fillForm();
    this.formSubscripion = this.ngForm.form.valueChanges.subscribe(form => {
      this.price = this.product.price;
      let arr = Object.values(form);
      let count = 0;
      arr.forEach(value => {
        if (value["priceModifier"] && value["priceModifier"] !== "") {
          count += parseInt(value["priceModifier"]);
        }
      });
      if (count !== 0) {
        this.price = Math.round(this.price * (1 + count / 100) * 100) / 100;
      } else {
        this.price = this.product.price;
      }
    });
  }
  fillForm() {
    let obj = {};
    this.options.forEach(element => {
      obj[element.name] = "";
    });
    return obj;
  }
  onSubmit() {
    let arr = Object.values(this.productForm);
    this.error = arr.some(el => el === "");
    if (this.error) return;
    const options = [];
    for (let prop in this.productForm) {
      if (this.productForm.hasOwnProperty(prop)) {
        options.push(this.productForm[prop]);
      }
    }
    const cart = {
      options,
      amount: this.price,
      name: this.product.name,
      id: this.product.id
    };
    this._cartService.addToCart(cart);
    this._router.navigate(["/cart"]);
  }
  ngOnDestroy(): void {
    this.formSubscripion.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
