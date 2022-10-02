import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { MainMenuCxpComponent } from './main-menu-cxp/main-menu-cxp.component';
import { MainMenuCmbComponent } from './main-menu-cmb/main-menu-cmb.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [{
  path: '',
  component: RootComponent,
  children: [
    {
      path: 'inicio',
      component: PrincipalComponent,
    },
    {
      path: 'main',
      component: MainMenuCxpComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'cmb-main',
      component: MainMenuCmbComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'config',
      loadChildren: () => import('./configuracion/configuracion.module')
        .then(m => m.ConfigurationModule)
    },
    {
      path: 'login',
      component: LoginComponent,
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
  MainMenuCmbComponent,
  PrincipalComponent,
  ConfiguracionComponent,
];

