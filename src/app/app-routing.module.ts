import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main-pages/home/home.component';
import { SignInUpComponent } from './main-pages/sign-in-up/sign-in-up.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"sign-in-up",component:SignInUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
