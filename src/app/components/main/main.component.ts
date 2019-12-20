import { Component, OnInit } from "@angular/core";
import { FetchService } from "src/app/services/fetch.service";
import { Product } from "src/app/models/Product";
import { NavigateService } from "src/app/services/navigate.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  products: Product[];
  subscription;
  constructor(
    private fetchService: FetchService,
    private navigateSercive: NavigateService
  ) {}

  ngOnInit() {
    this.subscription = this.fetchService.dataSource$.subscribe(data => {
      this.products = data;
    });
  }
  goTo(id: number) {
    this.navigateSercive.goTo("/product", id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
