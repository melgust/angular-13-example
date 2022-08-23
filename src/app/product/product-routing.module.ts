import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'product', redirectTo: 'product/index', pathMatch: 'full'},
  { path: 'product/index', component: IndexComponent },
  { path: 'product/:productId/view', component: ViewComponent },
  { path: 'product/create', component: CreateComponent },
  { path: 'product/:productId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
