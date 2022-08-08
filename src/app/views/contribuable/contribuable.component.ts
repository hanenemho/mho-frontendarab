import { Component, OnInit } from '@angular/core';
import { Contribuable } from 'src/app/models/contribuable';
import { contribuableService } from 'src/app/services/contribuable.service';
import { MessageService } from 'primeng/api';
import { error } from 'protractor';

@Component({
  selector: 'app-contribuable',
  templateUrl: './contribuable.component.html',
  styleUrls: ['./contribuable.component.scss']
})
export class ContribuableComponent implements OnInit {

     contribuableList : Array<Contribuable>=[]
     contribuable :  Contribuable
     matriculeFiscale : string;
     activDialog :boolean;


  constructor(private contribuableService:contribuableService,
    private messageService: MessageService) { }

  ngOnInit(): void {
     this.refresh()
  }

  refresh(){
    this.contribuableService.getAll().subscribe((data:Contribuable[])=>{
      this.contribuableList=data;
    })
  }


  activerContribuables(contr:Contribuable){
    this.contribuable=contr
  }

  getContribuables(){    
    this.contribuableService.getAllContribuables(this.matriculeFiscale).subscribe((data:Contribuable)=>{
      if(data != null){  
      this.contribuableList=[]
    this.contribuableList.push(data)
      }
 },error=>{this.refresh()})
  }

  hideDialog(){
    this.activDialog=false
  }
  
  activate(cont:Contribuable,event:any){
      this.contribuableService.ChangeState(cont).subscribe((data)=>{
        this.messageService.add({severity:'success', summary: 'Succés', detail: 'Contribuable activer', life: 3000});
      }); 
  }
}
