import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadersComponent } from './headers/headers.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ContactosComponent } from './contactos/contactos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario/formulario.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasComponent,
    DashboardComponent,
    HeadersComponent,
    GaleriaComponent,
    ContactosComponent,
    FormularioComponent,
    TestComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
