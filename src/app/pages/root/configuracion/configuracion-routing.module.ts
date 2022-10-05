import { ConfiguracionComponent } from './configuracion.component';
import { Routes, RouterModule } from '@angular/router';
import { ConfMenuComponent } from './conf-menu/conf-menu.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { PermisosComponent } from './permisos/permisos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';


const routes: Routes = [{
  path: '',
  component: ConfiguracionComponent,
  children: [
    {
      path: 'conf-menu',
      component: ConfMenuComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'permisos',
      component: PermisosComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'lista-usuarios',
      component: ListaUsuariosComponent,
      canActivate: [AuthGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfiguracionRoutingModule { }

export const configuracionRouterComponents = [
  ConfMenuComponent,
  PermisosComponent,
  ListaUsuariosComponent
];
