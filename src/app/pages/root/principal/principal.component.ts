import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
// import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, AfterViewInit {

  tiempoDia = '';
  loading = true;

  constructor(
    public auth: AuthService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.tiempoDia = this.obtenertiempoDia();
    this.auth.user$.subscribe((data) => {
        this.loading = false;
    });
  }

  ngAfterViewInit() {
  }

  irMenusCoexpan() {
    this.cambioEmpresa(env.dbCoexpan);
    this.route.navigateByUrl('/pages/root/main');
  }

  irMenusCoembal() {
    this.cambioEmpresa(env.dbCoembal);
    this.route.navigateByUrl('pages/root/cmb-main');
  }

  cambioEmpresa(dbChange: string): void {
    const db = localStorage.getItem('sapdb');
    // console.log(db);
    // console.log(dbChange);
    if (db !== dbChange) {
      localStorage.removeItem('sapusr');
      localStorage.setItem('sapdb', dbChange);
    }
  }

  obtenertiempoDia(): string {
    const TIEMPO = new Date();
    if (TIEMPO.getHours() >= 5 && TIEMPO.getHours() <= 11) {
      return 'Buenos Días';
    } else if (TIEMPO.getHours() >= 12 && TIEMPO.getHours() <= 22) {
      return 'Buenas Tardes';
    } else {
      return 'Buenas Noches';
    }
  }



  // takeFoto() {
  //   Camera.getPhoto({
  //     quality: 100,
  //     resultType: CameraResultType.Uri,
  //     source: CameraSource.Prompt
  //   }).then((image) => {
  //     // imgSrc is passed to src of img tag
  //     // imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
  //     // image.path is what you will have to send to the uploadPhoto method as uripath
  //     // console.log(image);
  //   }).catch((err) => {
  //       console.warn(err);
  //   });
  // }

}
