import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureConsultationComponent } from './facture-consultation.component';

describe('FactureConsultationComponent', () => {
  let component: FactureConsultationComponent;
  let fixture: ComponentFixture<FactureConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
