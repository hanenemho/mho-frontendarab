import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import LocaleFr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import {NgxImageCompressService} from 'ngx-image-compress';
import { AuthInterceptor } from './util/AuthInterceptorService';
import { FooterComponent } from './views/layout/footer/footer.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { MaincontentComponent } from './views/layout/maincontent/maincontent.component';
import { MenuComponent } from './views/layout/menu/menu.component';
import { LoginComponent } from './views/login/login.component';
import { authentificationUsers } from './views/general-page-router/authentification.users';
import { DashboardOverviewComponent } from './views/dashboard/dashboard-overview/dashboard-overview.component';
import { RegisterComponent } from './views/register/register.component';
import { FactureComponent } from './views/facture/facture.component';
import { FactureConsultationComponent } from './views/facture-consultation/facture-consultation.component';
import { ContribuableComponent } from './views/contribuable/contribuable.component';
import { ParamPaysComponent } from './views/param-pays/param-pays.component';
import { GroupTaxationComponent } from './views/group-taxation/group-taxation.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';
import {CheckboxModule} from 'primeng/checkbox';
import {FieldsetModule} from 'primeng/fieldset';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import { UserVerificationComponent } from './views/user-verification/user-verification.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChangementPasswordComponent } from './views/changement-password/changement-password.component';
import { BlockUIModule } from 'primeng/blockui';
import { ParamProduitComponent } from './views/param-produit/param-produit.component';
import { PasswordOublieComponent } from './views/password-oublie/password-oublie.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { SettingsComponent } from './views/settings/settings.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { AvatarModule } from 'ngx-avatar';
import { ClientComponent } from './views/client/client.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
const avatarColors = ["2c3e50","95a5a6","#f39c12","#1abc9c"];
registerLocaleData(LocaleFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MaincontentComponent,
    MenuComponent,
    LoginComponent,
    authentificationUsers,
    DashboardOverviewComponent,
    RegisterComponent,
    FactureComponent,
    FactureConsultationComponent,
    ContribuableComponent,
    ParamPaysComponent,
    GroupTaxationComponent,
    UserVerificationComponent ,
    ParamProduitComponent  ,
    UserVerificationComponent ,
    ChangementPasswordComponent,
    PasswordOublieComponent,
    SettingsComponent,
    ClientComponent,
    StatisticsComponent  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
    ButtonModule,
    ToolbarModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    FileUploadModule,
    ConfirmDialogModule,
    Ng2ImgMaxModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true
    }),
    ReactiveFormsModule,
    TooltipModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    ChartsModule,
    ChartModule,
    ScrollPanelModule,
    PanelModule,
    AccordionModule,
    CheckboxModule,
    FieldsetModule,
    PasswordModule,
    ProgressSpinnerModule,
    BlockUIModule,
    NgxSpinnerModule,
    ToggleButtonModule,
    MenuModule,
    RecaptchaModule,
    AvatarModule.forRoot({
      colors : avatarColors
    }),
    AutoCompleteModule,
    TabViewModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
  ],
  providers: [ 
    MessageService,
    NgxImageCompressService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

