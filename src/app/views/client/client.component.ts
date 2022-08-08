import { Component, OnInit } from '@angular/core';
import { clientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { error } from 'protractor';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  client:Client;
  clientList : Array<Client>=[]
  matriculeFiscaleClient:string;
  id:Number;
  cont:any;
  
  grpTaxDialog:boolean
  updateDialog :boolean
  submitted :boolean = false;

  clientDialog :boolean;



  constructor(private clientService:clientService,private storage:LocalStorageService,
    private spinner: NgxSpinnerService,private toastreService: ToastrService,private messageService: MessageService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cont=this.storage.retrieve(("userConnect"));
    console.log(this.cont)
    this.refresh();
  }

  getClient(){    
    
    this.clientService.getClient(this.matriculeFiscaleClient).subscribe((data:Client)=>{  
      if(data != null){
      this.clientList=[]
    this.clientList.push(data)
  }
 },error =>{ this.refresh() })
  
}


saveClient(){
  this.submitted = true
  if (!this.client.matriculeFiscaleClient||
    !this.client.nom ||
   !this.client.email ||
   !this.client.addresse ||
   !this.client.numTel
  
 ) {
   return;
 }

  this.clientService.postClient(this.client).subscribe(()=>this.refresh());
  this.toastreService.success("Client est ajouter!");

  this.clientDialog = false;
  this.client = {};

}
refresh(){
  this.spinner.show();
    this.clientService.getMyClients(this.cont.contribuable.id).subscribe((data:Client[])=>{     
      this.clientList=data
      this.spinner.hide();
   });
}
openAddClient(){

  this.clientDialog=true
  this.client={}
}
openUpdateClient(cli:Client){

  this.updateDialog=true
  this.client=cli
}
hideAddDialog() {
  this.clientDialog = false;
  this.submitted = false;
}
hideUpdateDialog() {
  this.updateDialog = false;
  this.submitted = false;
}

updateClient(cl:Client){
 
  this.client=cl
  this.clientService.updateClient(cl.id, cl).subscribe(()=>this.refresh());
  this.messageService.add({severity:'success', summary: 'Succés', detail: 'Client changer', life: 3000});    
  this.updateDialog=false

}

deleteClient(cl:Client){
  this.confirmationService.confirm({
    message: 'Etes-vous sûr de vouloir supprimer ' + cl.nom + '?',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.clientService.deleteClient(cl.id).subscribe(()=>this.refresh());
        this.messageService.add({severity:'success', summary: 'Succés', detail: 'Client supprimer', life: 3000});
       
      }
});
}



}
