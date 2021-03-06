import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { LandingComponent } from "./layout/landing/landing.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from "./components/product/product.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { MatIconModule } from "@angular/material/icon";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { ChristmasComponent } from './components/svg/christmas/christmas.component';

const routes: Routes = [
  { path: "landing", component: LandingComponent },
  { path: "main", component: MainComponent },
  { path: "cart", component: ProductFormComponent },
  { path: "product/:id", component: ProductComponent },
  { path: "", component: LandingComponent },
  { path: "**", redirectTo: "main" }
];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    LandingComponent,
    ProductComponent,
    ProductFormComponent,
    ChristmasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
