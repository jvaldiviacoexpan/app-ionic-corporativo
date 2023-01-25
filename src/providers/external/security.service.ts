import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {

  constructor(
    private http: HttpClient,
  ) { }

  public sapIniciarSesion(login: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/sap/inicio-sesion`, JSON.stringify(login)).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  public encrypt(obj: string) {
    const pass = 'C03xp@n...!';
    // random salt for derivation
    const keySize = 256;
    const salt = CryptoJS.lib.WordArray.random(16);
    // well known algorithm to generate key
    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: 100
    });
    // random IV
    const iv = CryptoJS.lib.WordArray.random(128/8);
    // specify everything explicitly
    const encrypted = CryptoJS.AES.encrypt(obj, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    // combine everything together in base64 string
    const result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;
  }


}

