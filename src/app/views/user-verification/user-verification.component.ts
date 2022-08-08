import { Component, OnInit } from '@angular/core';
import { Contribuable } from 'src/app/models/contribuable';
import { contribuableService } from 'src/app/services/contribuable.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {

  constructor(private contribuableService: contribuableService, private router: Router,
    private activatedRouter:ActivatedRoute, private messageService: MessageService,
    private toastreService: ToastrService, private spinner: NgxSpinnerService) {
     
       console.log(this.router.getCurrentNavigation().extras.state);
      }
  contribuable: Contribuable;
  submitted: boolean;

  ngOnInit(): void {
    this.contribuable = history.state;
  }

  validate() {
    this.submitted = true
    if (!this.contribuable.verificationCode) {
      return;
    }
    this.spinner.show();
    this.contribuableService.userVerification(this.contribuable).subscribe((data) => {
      setTimeout(()=>{
        this.toastreService.success("Compte validé avec succée!");
      },20000);
      this.router.navigate(['/user/login']).then(()=>{
        this.toastreService.success("Compte validé avec succée!");
      });
    }, error => {
      this.spinner.hide()
      console.log(error);
      this.toastreService.error(error.error.message);
    }
    )
  }


}
