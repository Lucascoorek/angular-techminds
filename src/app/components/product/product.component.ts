import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FetchService } from "src/app/services/fetch.service";
import { Product } from "src/app/models/Product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  public productId: number;
  public product: Product;

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
  }
}
