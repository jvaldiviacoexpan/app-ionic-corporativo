import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { GetTokenModel } from 'src/models/auth0.model';
import { AuthService } from '@auth0/auth0-angular';


@Injectable({
  providedIn: 'root'
})

export class Auth0Service {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public getAuth() {
    const sub: GetTokenModel = new GetTokenModel();
    sub.client_id     = 'DjFs7NIPsRDvuah3BsdnPh0JulZ2nm5R';
    sub.client_secret = 's87DbpYgAXDqoySBMSCHg_o0hiJW1NgmS0mpP2hay9qzJ420Wee1wiwIpA1Q99-b';
    sub.audience      = 'https://coexpanchile.us.auth0.com/api/v2/';
    sub.grant_type    = 'client_credentials';
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlCxpAuth0}/get-token`, JSON.stringify(sub))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getDataUser(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlCxpAuth0}/find-email`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
