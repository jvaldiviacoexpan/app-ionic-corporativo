import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-a-menu-extrusion',
  templateUrl: './a-menu-extrusion.component.html',
  styleUrls: ['./a-menu-extrusion.component.scss'],
})
export class AMenuExtrusionComponent implements OnInit {

  constructor(
    private menu: MenuController,
    private route: Router,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  irRegistroParadas() {
    this.route.navigateByUrl('/pages/extrusion/reg-paradas');
  }

  menuToogle() {
    this.menu.toggle();
  }


}

