import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedServiceFormComponent } from './ordered-service-form.component';

describe('OrderedServiceFormComponent', () => {
  let component: OrderedServiceFormComponent;
  let fixture: ComponentFixture<OrderedServiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedServiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
