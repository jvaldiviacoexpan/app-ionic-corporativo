import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  template: '<ion-router-outlet></ion-router-outlet>'
})

export class RootComponent implements OnInit {

  constructor(
    protected auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((data) => {
      // console.log(data.email_verified);
    });
  }

}



