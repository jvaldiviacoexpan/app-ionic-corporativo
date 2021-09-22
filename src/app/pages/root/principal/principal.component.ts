import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../providers/external/security.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  tiempoDia = '';

  constructor(
    public auth: AuthService,
    private route: Router,
    private auth0Service: Auth0Service,
    private securityService: SecurityService,
  ) { }

  ngOnInit() {
    this.tiempoDia = this.obtenertiempoDia();
  }

  irMenuLogistica() {
    this.route.navigateByUrl('/pages/logistica/menu-logistica');
  }

  obtenertiempoDia(): string {
    const TIEMPO = new Date();
    // console.log(TIEMPO);
    if (TIEMPO.getHours() >= 5 && TIEMPO.getHours() <= 11) {
      return 'Buenos Días';
    } else if (TIEMPO.getHours() >= 12 && TIEMPO.getHours() <= 22) {
      return 'Buenas Tardes';
    } else {
      return 'Buenas Noches';
    }
  }

  obtenerRoles(token: string) {
    this.auth.user$.subscribe((user) => {
      this.auth0Service.getAuth().then((resp: any) => {
      console.log(resp);
      const userdata = {
        idToken: resp.access_token,
        email: user.email,
      };
      const datarest = this.securityService.encrypt(JSON.stringify(userdata));
        this.auth0Service.getDataUser(datarest).then((restuser: any) => {
          console.log(restuser);
        }, (err) => {
          console.log(err);
        });
      }, (err) => {
        console.log(err);
      });
    });
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
