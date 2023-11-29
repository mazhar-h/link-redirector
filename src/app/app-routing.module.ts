import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './components/redirect/redirect.component';
import { InterfaceComponent } from './components/interface/interface.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: InterfaceComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: ':id', component: RedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
