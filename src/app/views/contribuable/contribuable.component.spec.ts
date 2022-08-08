import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuableComponent } from './contribuable.component';

describe('ContribuableComponent', () => {
  let component: ContribuableComponent;
  let fixture: ComponentFixture<ContribuableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContribuableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
