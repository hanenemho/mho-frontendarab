import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordOublieComponent } from './password-oublie.component';

describe('PasswordOublieComponent', () => {
  let component: PasswordOublieComponent;
  let fixture: ComponentFixture<PasswordOublieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordOublieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
