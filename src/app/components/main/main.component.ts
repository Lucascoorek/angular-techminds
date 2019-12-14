import { Component, OnInit } from "@angular/core";
import { FetchService } from "src/app/services/fetch.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  data: [];
  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.data = this.fetchService.data;
    console.log(this.data);
  }
}
