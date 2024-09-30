import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInUpComponent } from './main-pages/sign-in-up/sign-in-up.component';
import { HomeComponent } from './main-pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateProductComponent } from './main-pages/create-product/create-product.component';
import { CreateCategoryComponent } from './main-pages/create-category/create-category.component';
import { ProfileComponent } from './main-pages/profile/profile.component';
import { DashboardComponent } from './main-pages/dashboard/dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UsersProductsComponent } from './main-pages/users-products/users-products.component';
import { SecondaryNavbarComponent } from './components/secondary-navbar/secondary-navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StatisticsComponent } from './main-pages/statistics/statistics.component';
import { ChartModule } from 'primeng/chart';
import { BasketComponent } from './main-pages/basket/basket.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInUpComponent,
    HomeComponent,
    NavbarComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    ProfileComponent,
    DashboardComponent,
    SideBarComponent,
    UsersProductsComponent,
    SecondaryNavbarComponent,
    ProductCardComponent,
    StatisticsComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    RouterModule,
    ChartModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
