import { Component, OnInit } from '@angular/core';
import { paramPaysService } from 'src/app/services/paramPays.service';
import { Parampays } from 'src/app/models/parampays';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-param-pays',
  templateUrl: './param-pays.component.html',
  styleUrls: ['./param-pays.component.scss']
})
export class ParamPaysComponent implements OnInit {
    
     paramPaysList : Array<Parampays>=[]
     paramDialog :boolean
     paramPays : Parampays
     submitted :boolean = false;
  constructor(private paramPaysService:paramPaysService ,private messageService: MessageService,
    private confirmationService: ConfirmationService, private toastreService: ToastrService) { }

  ngOnInit(): void {

    this.refresh()

  }
   
  saveParam(){
    this.submitted = true
    if (!this.paramPays.codePays||
     !this.paramPays.libPays ||
     !this.paramPays.langue 
    
   ) {
     return;
   }

    this.paramPaysService.postParamPays(this.paramPays).subscribe(()=>this.refresh());
    this.toastreService.success("Parametre pays ajouter!");

    this.paramDialog = false;
    this.paramPays = {};

  }
  hideDialog() {
    this.paramDialog = false;
    this.submitted = false;
  }

  openNew(){

    this.paramDialog=true
    this.paramPays={}
  }
 


deleteParam(prm:Parampays){
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + prm.libPays + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.paramPaysService.deletetParam(prm.codePays).subscribe(()=>this.refresh());
        this.messageService.add({severity:'success', summary: 'Succés', detail: 'Paramètres de pays supprimer', life: 3000});    
      }
});


}
refresh(){
  this.paramPaysService.getParamPays().subscribe((data:Parampays[])=>{
 this.paramPaysList=data
})
}

updateParam(prm:Parampays){
 
  this.paramPays=prm
  this.paramDialog=true

}
}
