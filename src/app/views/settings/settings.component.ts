import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Parampays } from 'src/app/models/parampays';
import { paramPaysService } from 'src/app/services/paramPays.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { contribuableService } from 'src/app/services/contribuable.service';
import { ToastrService } from 'ngx-toastr';
import { Contribuable } from 'src/app/models/contribuable';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  submitted=true;
  pointVente:any;
  cont:Contribuable;
  password: string;
  paramPaysList: Array<Parampays> = []
  constructor(private storage:LocalStorageService,
    private router:Router,private paramPaysService: paramPaysService,
    private messageService: MessageService, private contribuableService: contribuableService, 
    private spinner: NgxSpinnerService,private confirmationService: ConfirmationService,
    private toastreService: ToastrService) { }

  ngOnInit(): void {
  this.pointVente=this.storage.retrieve("userConnect");
  this.cont=this.pointVente.contribuable;
  this.paramPaysService.getParamPays().subscribe((data: Parampays[]) => {
    console.log(data)
    this.paramPaysList = data
  })
  console.log(this.pointVente)
  console.log(this.cont)

  }

  updateUser(){
    
      this.confirmationService.confirm({    
        message: 'Are you sure you want to update ' + this.pointVente.libellePoint + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          debugger
          this.spinner.show();
          this.updatePv()
          this.contribuableService.updateContribuable(this.cont.id,this.pointVente.contribuable).subscribe((data) => { 
            console.log(data)
            this.spinner.hide();
            this.messageService.add({severity:'success', summary: 'Succés', detail: 'Paramètres de compte changer', life: 3000});   
            this.storage.clear
            this.storage.store("userConnect",data)
            console.log(this.storage)
          }, error => {
            this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Un erreur apparu', life: 3000});  
            this.spinner.hide();  
          } 
          )
        } 
          });
          
    }
    updatePv(){
      this.contribuableService.updatePointvente(this.pointVente.id,this.pointVente).subscribe()
    }
    



}
