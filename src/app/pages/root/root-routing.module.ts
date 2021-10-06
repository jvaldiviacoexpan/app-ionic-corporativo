import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { MainMenuCxpComponent } from './main-menu-cxp/main-menu-cxp.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [
    {
      path: 'inicio',
      component: PrincipalComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'main',
      component: MainMenuCxpComponent
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }

export const rootRouterComponents = [
  RootComponent,
  LoginComponent,
  MainMenuCxpComponent,
  PrincipalComponent
];

