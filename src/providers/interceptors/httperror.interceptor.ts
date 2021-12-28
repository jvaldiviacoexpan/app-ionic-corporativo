import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    public toastController: ToastController,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          console.log(error.error);
        }

      // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        switch (error.status) {
          case 200:
                this.presentToast(`Sin Conexión a internet.`, 5000); break;
          case 401:
                this.presentToast(`Error de token.`, 5000); break;
          case 404:
                this.presentToast(`Solicitud HTTP (API) no encontrada.`, 5000); break;
          case 500:
                this.presentToast(`Error en el sector Lógico del Servidor.`, 5000); break;
          case 504:
                this.presentToast(`Servidor Desconectado.`, 5000); break;
          default:
              this.presentToast(`${errorMessage}`, 5000); break;
        }
        return throwError(errorMessage);

      }),
    );
  }

  async presentToast(mensaje: string, duracion: number) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion,
    });
    toast.present();
  }


}
