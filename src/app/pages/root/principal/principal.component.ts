import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from '@auth0/auth0-angular';

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
    localStorage.removeItem('sapdb');
    localStorage.setItem('sapdb', 'Z_SBO_COEXPAN_TEST2');
    this.route.navigateByUrl('/pages/root/main');
  }


  irMenusCoembal() {
    localStorage.removeItem('sapdb');
    localStorage.setItem('sapdb', 'Z_SBO_COEMBAL_TEST');
    // console.log('Navegar a menus Coembal');
    // this.route.navigateByUrl('/pages/root/main');
    this.route.navigateByUrl('pages/root/cmb-main');
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
  //     console.log(image);
  //   }).catch((err) => {
  //       console.log(err);
  //   });
  // }

}
