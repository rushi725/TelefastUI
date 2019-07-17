import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedServiceListComponent } from './ordered-service-list.component';

describe('OrderedServiceListComponent', () => {
  let component: OrderedServiceListComponent;
  let fixture: ComponentFixture<OrderedServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
