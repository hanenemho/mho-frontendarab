import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FACTURATION-FRONT';

  constructor(private translate: TranslateService){
    this.translate.addLangs(['fr']);
    this.translate.setDefaultLang('fr');
  }
}
