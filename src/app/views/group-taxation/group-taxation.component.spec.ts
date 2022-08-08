import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTaxationComponent } from './group-taxation.component';

describe('GroupTaxationComponent', () => {
  let component: GroupTaxationComponent;
  let fixture: ComponentFixture<GroupTaxationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTaxationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTaxationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
