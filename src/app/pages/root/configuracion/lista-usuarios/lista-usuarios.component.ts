import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit, AfterViewInit {

  constructor(private menu: MenuController) { }

  ngOnInit(): void { }

  ngAfterViewInit() { }

  menuToogle() {
    this.menu.toggle();
  }

}
