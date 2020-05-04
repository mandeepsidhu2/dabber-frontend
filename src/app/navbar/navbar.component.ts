import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {AuthenticationService} from "../authentication.service"
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   user: SocialUser;
   loggedIn: boolean;
   faGoogle=faGoogle;
   public isCollapsed = true;
  constructor(private authenticationService:AuthenticationService,private socialAuthService: AuthService,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(userData)
        this.authenticationService.login(userData.idToken).subscribe(data=>{
         console.log(data);
         this.loggedIn=true
       });
  })
  
}
  signOut(): void {
    this.authService.signOut();
    this.authenticationService.logout();
    
  }
}
