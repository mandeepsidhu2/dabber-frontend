import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {AuthenticationService} from "../authentication.service"
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NotifierService } from "angular-notifier";
import {DataService} from "../data.service"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DataService]
})
export class NavbarComponent implements OnInit {
   user: SocialUser;
   loggedIn: boolean;
   faGoogle=faGoogle;
   public isCollapsed = true;
   private readonly notifier: NotifierService;
  constructor(private dataService:DataService,notifierService: NotifierService,private authenticationService:AuthenticationService,private socialAuthService: AuthService,private authService: AuthService) { 
      this.notifier = notifierService;
  }

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
         this.dataService.sendData("sending signal to homepage for login ...");
         this.notifier.notify("success", "Signed In, Welcome to TABBER");
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
