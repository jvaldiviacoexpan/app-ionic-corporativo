import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { mergeScan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ToolService {

  constructor(private loadingController: LoadingController) { }


  // Simple loader
  simpleLoader(msg: string) {
    this.loadingController.create({
      message: msg,
      translucent: true
    }).then((response) => {
      response.present();
    });
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }

  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: 'Loader hides after 4 seconds',
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((resp) => {
        console.log('Loader dismissed', resp);
      });
    });
  }

  // Custom style + hide on tap loader
  customLoader() {
    this.loadingController.create({
      message: 'Loader with custom style',
      duration: 4000,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }

}
