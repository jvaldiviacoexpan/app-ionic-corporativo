import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cmb-menu-extrusion.component.html',
  styleUrls: ['./cmb-menu-extrusion.component.css']
})
export class CmbMenuExtrusionComponent implements OnInit {

  constructor(
    private menu: MenuController,
    private route: Router,
  ) { }

  ngOnInit(): void {
    // console.log('Extrusion menu works');
  }

  menuToogle() {
    this.menu.toggle();
  }

  navCmbEmisionCajaPallet() {
    this.route.navigateByUrl('/pages/cmb/extrusion/etq-emision-pallet');
  }

  irRegistroParadas() {
    this.route.navigateByUrl('/pages/cmb/extrusion/reg-paradas');
  }



}
