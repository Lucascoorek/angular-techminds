import { Component, OnInit } from "@angular/core";
import { FetchService } from "src/app/services/fetch.service";
import { Router } from "@angular/router";
import { Product } from "src/app/models/Product";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  products: Product[];
  subscription;
  constructor(private fetchService: FetchService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.fetchService.dataSource$.subscribe(data => {
      this.products = data;
    });
  }
  goTo(id: number) {
    this.router.navigate(["/product", id]);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
