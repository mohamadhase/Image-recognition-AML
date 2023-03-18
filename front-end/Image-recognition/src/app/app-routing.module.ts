import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { GithubComponent } from './github/github.component';
import { HomeComponent } from './home/home.component';
import { RecognitionComponentComponent } from './recognition-component/recognition-component.component';
import { ResultComponentComponent } from './result-component/result-component.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'github',component:GithubComponent},
  {path:'contact',component:ContactComponent},
  {path:'ditiction',component:RecognitionComponentComponent},
  {path:'result',component:ResultComponentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
