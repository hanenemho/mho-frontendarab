import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from './views/dashboard/dashboard-overview/dashboard-overview.component';
import { authentificationUsers } from './views/general-page-router/authentification.users';
import { MaincontentComponent } from './views/layout/maincontent/maincontent.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { FactureComponent } from './views/facture/facture.component';
import { FactureConsultationComponent } from './views/facture-consultation/facture-consultation.component';
import { ParamPaysComponent } from './views/param-pays/param-pays.component';
import { GroupTaxationComponent } from './views/group-taxation/group-taxation.component';
import { ContribuableComponent } from './views/contribuable/contribuable.component';
import { AuthGaurdService } from './util/AuthGaurdService';
import { UserVerificationComponent } from './views/user-verification/user-verification.component';
import { ParamProduitComponent } from './views/param-produit/param-produit.component';
import { ChangementPasswordComponent } from './views/changement-password/changement-password.component';
import { PasswordOublieComponent } from './views/password-oublie/password-oublie.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ClientComponent } from './views/client/client.component';
import { StatisticsComponent } from './views/statistics/statistics.component';


const routes: Routes = [
  {path:'',redirectTo:'user/login',pathMatch:'full'},
  {
    path: 'user', component: authentificationUsers,
    children: [
      { path: 'login', component: LoginComponent },
      { path:'register',component: RegisterComponent },
      { path:'verification',component: UserVerificationComponent },
      { path:'register',component: RegisterComponent },
      { path:'changePwd',component: ChangementPasswordComponent },
      { path:'forgetsPwd',component: PasswordOublieComponent }

      
    ]
  },
  {
    path: 'dashboard', component:MaincontentComponent,canActivate:[AuthGaurdService] ,
    children:[
      { path:'facture',component: FactureComponent ,canActivate:[AuthGaurdService] },
      { path:'historiqueFacture',component: FactureConsultationComponent ,},
      { path:'contribuable',component: ContribuableComponent ,canActivate:[AuthGaurdService]},
      { path:'grpTaxation',component: GroupTaxationComponent ,canActivate:[AuthGaurdService]},
      { path:'parampays',component: ParamPaysComponent ,canActivate:[AuthGaurdService]},
      { path:'paramproduit',component: ParamProduitComponent ,canActivate:[AuthGaurdService]},
      { path:'settings',component: SettingsComponent ,canActivate:[AuthGaurdService]},
      { path:'client',component: ClientComponent ,canActivate:[AuthGaurdService]},
      { path:'statistics',component: StatisticsComponent ,canActivate:[AuthGaurdService]}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
