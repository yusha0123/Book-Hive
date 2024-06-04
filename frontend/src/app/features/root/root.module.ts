import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
];

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class RootModule {}
