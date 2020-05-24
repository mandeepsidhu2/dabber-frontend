import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { AiComponent } from './ai/ai.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
  path: '',
  component: NavbarComponent,
  children:[
{
  path: 'home',
  component: HomepageComponent
},
{
  path: 'about',
  component: AboutComponent
},
{
  path: 'ai',
  component: AiComponent
}
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
