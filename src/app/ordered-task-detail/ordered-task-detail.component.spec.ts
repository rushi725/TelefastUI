import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTaskDetailComponent } from './ordered-task-detail.component';

describe('OrderedTaskDetailComponent', () => {
  let component: OrderedTaskDetailComponent;
  let fixture: ComponentFixture<OrderedTaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
