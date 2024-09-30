import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main-pages/home/home.component';
import { SignInUpComponent } from './main-pages/sign-in-up/sign-in-up.component';
import { CreateProductComponent } from './main-pages/create-product/create-product.component';
import { CreateCategoryComponent } from './main-pages/create-category/create-category.component';
import { ProfileComponent } from './main-pages/profile/profile.component';
import { DashboardComponent } from './main-pages/dashboard/dashboard.component';
import { UsersProductsComponent } from './main-pages/users-products/users-products.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"sign-in-up",component:SignInUpComponent},
  {path:"create-product",component:CreateProductComponent},
  {path:"profile",component:ProfileComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"users-products",component:UsersProductsComponent},
  {path:"create-category",component:CreateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
