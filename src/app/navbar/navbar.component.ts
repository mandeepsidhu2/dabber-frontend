import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {AuthenticationService} from "../authentication.service"
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NotifierService } from "angular-notifier";

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
   private readonly notifier: NotifierService;
  constructor(notifierService: NotifierService,private authenticationService:AuthenticationService,private socialAuthService: AuthService,private authService: AuthService) {   this.notifier = notifierService;}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      localStorage.setItem(btoa("loggedIn"),btoa(String(this.loggedIn)))
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.authenticationService.login(userData.idToken).subscribe(data=>{
         this.loggedIn=true
         localStorage.setItem(btoa("loggedIn"),btoa("true"))
         window.location.reload();
          });
  })
  
}
  signOut(): void {
    this.authService.signOut();
    this.authenticationService.logout();
    localStorage.setItem(btoa("loggedIn"),btoa("false"))
    window.location.reload();
  }

}
