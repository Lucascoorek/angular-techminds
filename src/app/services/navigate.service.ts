import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NavigateService {
  constructor(private router: Router) {}
  goTo(url: string, param: any = false) {
    if (param) {
      this.router.navigate([url, param]);
    } else {
      this.router.navigate([url]);
    }
  }
}
