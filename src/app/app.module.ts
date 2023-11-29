import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { LinkService } from './services/link.service';


@NgModule({
  declarations: [
    AppComponent,
    InterfaceComponent,
    RedirectComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
