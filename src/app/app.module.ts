import { MediaUploadModule } from './pages/mediaupload/mediaupload.module';
import { POIDetailsModule } from './pages/poi-details/poi-details.module';
import { CommentModule } from './pages/comment/comment.module';
import { SearchPageModule } from './pages/search/search.module';
import { CommentPage } from './pages/comment/comment';
import { SearchPage } from './pages/search/search';
import { RoutePlannerPage } from './pages/route-planner/route-planner';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { POIDetailsPage } from './pages/poi-details/poi-details';

import { RoutePlannerPageModule } from './pages/route-planner/route-planner.module';
import { SignInModule } from './pages/signin/signin.module';
import { MediaUploadPage } from './pages/mediaupload/mediaupload';
import { ProfilePage } from './pages/profile/profile';
import { SettingsPage } from './pages/settings/settings';
import { ProfileModule } from './pages/profile/profile.module';
import { SettingsModule } from './pages/settings/settings.module';
import { JourneysModule } from './pages/journeys/journeys.module';
import { FavouriteEditorPage } from './pages/journeys/favourite-editor';
import { NullableTranslatePipe } from './pipes/NullableTranslatePipe';
import { PoiEditorPage } from './pages/poi-editor/poi-editor.page';
import { PoiEditorPageModule } from './pages/poi-editor/poi-editor.module';
import { PoiEquipmentEditorComponent } from './components/poi-equipment-editor/poi-equipment-editor';

import { Capacitor } from '@capacitor/core';
import { AboutPage } from './pages/about/about.page';
import { AboutPageModule } from './pages/about/about.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.interpolateParams && (<any>params.interpolateParams).Title) {
      // for lookup lists our standard reference data has a .Title member we can use if we're not translating a term
      return (<any>params.interpolateParams).Title;
    } else {
      // translation not handled
      return '??' + params.key;
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [RoutePlannerPage, SearchPage, CommentPage, POIDetailsPage, 
    MediaUploadPage, FavouriteEditorPage, PoiEditorPage, PoiEquipmentEditorComponent, AboutPage],
  // , JourneysPage, MediaUploadPage, POIDetailsPage, ProfilePage, SettingsPage, SignInPage
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    SearchPageModule,
    RoutePlannerPageModule,
    JourneysModule,
    SignInModule,
    CommentModule,
    MediaUploadModule,
    POIDetailsModule,
    PoiEditorPageModule,
    ProfileModule,
    SettingsModule,
    AboutPageModule
  ],
  providers: [
    StatusBar,
    Keyboard,
    Camera,
    SplashScreen,
    WebView,
    InAppBrowser,
    GoogleAnalytics,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
