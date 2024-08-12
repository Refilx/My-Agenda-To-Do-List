import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './security/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [

    {
      path: '', redirectTo: 'login', pathMatch:'full'
    },

    {path: 'login', component: LoginComponent},

    {
      path: '', component:LayoutComponent,
      children: [
        {
          path: 'home', component:HomeComponent
        }
      ]

    }
];
