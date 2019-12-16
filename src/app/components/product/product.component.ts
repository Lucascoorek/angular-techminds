import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FetchService } from "src/app/services/fetch.service";
import { Product } from "src/app/models/Product";
import { FormBuilder, FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  public productId: number;
  public product: Product;
  public options: any;
  public price: number;
  Color: string = "";
  Capacity: string = "";

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
  }
}
