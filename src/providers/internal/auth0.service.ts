import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { GetTokenModel } from 'src/models/auth0.model';

@Injectable({
  providedIn: 'root'
})

export class Auth0Service {

  constructor(
    private http: HttpClient,
  ) { }

  public getAuth() {
    const sub: GetTokenModel = new GetTokenModel();
    sub.client_id     = '86ax2fXgHEHW1LhKwVI8FIPN8GzZUiYu';
    sub.client_secret = 'PbLQ2PcVI-fJDPgb_ha2aNxC2sOLN4CM0Pw0f8AhiwEoGGn_UD-OMFZyYJRidgy9';
    sub.audience      = 'https://coexpancl.us.auth0.com/api/v2/';
    sub.grant_type    = 'client_credentials';
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlAuth0}/get-token`, JSON.stringify(sub))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getDataUser(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlAuth0}/find-email`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getUserRoles(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlAuth0}/get-roles`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getUserList(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlAuth0}/get-allusers`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public updateUser(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlAuth0}/update-users`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
