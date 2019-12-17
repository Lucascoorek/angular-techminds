import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  @Input() option: any;

  constructor() {}

  ngOnInit() {
    console.log(this.option);
  }
}
