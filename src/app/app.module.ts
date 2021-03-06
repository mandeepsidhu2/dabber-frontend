import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table'  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { NavbarComponent } from './navbar/navbar.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InteractiveComponent } from './interactive/interactive.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { NotifierModule } from "angular-notifier";
import {customNotifierOptions} from './notifierconfig';
import { AboutComponent } from './about/about.component'
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from './footer/footer.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';

const socketConfig: SocketIoConfig = { url: environment.nodeChatUrl, options: {} };
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    InteractiveComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    GoogleChartsModule,
    SocialLoginModule,
    FontAwesomeModule,
    NgbModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    SocketIoModule.forRoot(socketConfig),
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
