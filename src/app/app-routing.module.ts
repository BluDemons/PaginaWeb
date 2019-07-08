import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiasComponent } from './noticias/noticias.component';
import { HeadersComponent } from './headers/headers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GaleriaComponent } from './galeria/galeria.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  {path:'home', component: DashboardComponent}  ,
  {path:'headers',component: HeadersComponent},
  {path:'noticias', component: NoticiasComponent},
  {path:'galeria', component: GaleriaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
