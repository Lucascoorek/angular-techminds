import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FetchService } from "src/app/services/fetch.service";
import { Product } from "src/app/models/Product";
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  NgForm
} from "@angular/forms";

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

  constructor(
    private _route: ActivatedRoute,
    private _fetchService: FetchService //   private fb: FormBuilder
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

    // this.selectForm.valueChanges.subscribe(val => {
    //   console.log(val);
    //   if (val.color) {
    //     const selected = this.options.find(prod => {
    //       prod.name === val.color;
    //     });
    //     console.log(selected);
    //   }
    // });
    // this.selectForm = this.fb.group({
    //   Color: [""],
    //   Capacity: [""]
    // });
    // this.selectForm = this.fb.group({
    //   options: this.fb.array([
    //     this.fb.group({
    //       Color: [null],
    //       Capacity: [null]
    //     })
    //   ])
    // });
    this.productForm = this.fillForm();
    console.log(this.productForm);
    this.ngForm.form.valueChanges.subscribe(form => {
      this.price = this.product.price;
      console.log(Object.values(form));
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
      console.log(count);
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
}
