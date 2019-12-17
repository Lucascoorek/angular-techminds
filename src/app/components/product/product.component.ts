import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FetchService } from "src/app/services/fetch.service";
import { Product } from "src/app/models/Product";
import { NgForm } from "@angular/forms";

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

  constructor(
    private _route: ActivatedRoute,
    private _fetchService: FetchService
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get("id"));
      this.productId = id;
    });
    this.product = this._fetchService.getProductById(this.productId);
    console.log(this.product);
    this.options = this.product.options;
    this.price = this.product.price;
    this.productForm = this.fillForm();
    this.ngForm.form.valueChanges.subscribe(form => {
      console.log(form);
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
  // trackByFn(index, item) {
  //   return index; // or item.id
  // }
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
    console.log("submitted");
  }
}
