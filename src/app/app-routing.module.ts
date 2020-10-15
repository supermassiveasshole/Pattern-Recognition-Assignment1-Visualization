import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataVisualComponent } from './pages/data-visual/data-visual.component';
import { DataVisualModule } from './pages/data-visual/data-visual.module';

const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'data-visual', component: DataVisualComponent },
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
