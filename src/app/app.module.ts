import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  {path: 'cadastrar', component:CadastrarComponent},
  {path: 'consultar', component:ConsultarComponent},
  {path: 'editar/:id', component:EditarComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    ConsultarComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
