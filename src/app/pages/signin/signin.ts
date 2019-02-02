import { Router } from '@angular/router';
import { Logging } from './../../services/Logging';
import { AppManager } from './../../services/AppManager';
import { TranslateService } from '@ngx-translate/core';

import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserProfile } from '../../model/UserProfile';

@Component({
    templateUrl: 'signin.html'
})
export class SignInPage {
    email: string;
    password: string;

    constructor(
        public appManager: AppManager,
        public modalController: ModalController,
        public translate: TranslateService,
        public alertController: AlertController,
        public loadingController: LoadingController,
        public logging: Logging,
        public router: Router,
        private location: Location
    ) {
        this.email = '';

        /* const currentProfile = <UserProfile>params.get('Profile');
         if (currentProfile != null) {
             this.email = currentProfile.EmailAddress;
         }*/
    }

    cancelSignIn() {
        this.modalController.dismiss();
    }

    async performSignIn() {

        const loading = await this.loadingController.create({
            message: 'Signing In..'
        });
        await loading.present();

        // sign in with supplied email address and password
        let signInFailed = false;

        try {

            const signInResult = await this.appManager.api.performSignIn(this.email, this.password);

            loading.dismiss();

            // signed in OK, save response and return to main app
            localStorage.setItem('authResponse', JSON.stringify(this.appManager.api.authResponse));

            // navigation to main app. TODO: navigate to last requested page (route guard)
            this.modalController.dismiss();
            //this.router.navigateByUrl('/search');

        } catch (err) {
            signInFailed = true;
            // sign in rejected
            loading.dismiss();

            const a = await this.alertController.create({
                header: 'Open Charge Map',
                subHeader: 'Email or Password not recognised',
                buttons: ['Ok']
            });
            await a.present();

            this.logging.log('Error logging in:' + err);
        }

    }
}
