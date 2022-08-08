import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamProduitComponent } from './param-produit.component';

describe('ParamProduitComponent', () => {
  let component: ParamProduitComponent;
  let fixture: ComponentFixture<ParamProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
