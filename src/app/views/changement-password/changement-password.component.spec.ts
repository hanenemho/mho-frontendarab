import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementPasswordComponent } from './changement-password.component';

describe('ChangementPasswordComponent', () => {
  let component: ChangementPasswordComponent;
  let fixture: ComponentFixture<ChangementPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangementPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
