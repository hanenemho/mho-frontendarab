import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamPaysComponent } from './param-pays.component';

describe('ParamPaysComponent', () => {
  let component: ParamPaysComponent;
  let fixture: ComponentFixture<ParamPaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamPaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
