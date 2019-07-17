import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTaskListComponent } from './ordered-task-list.component';

describe('OrderedTaskListComponent', () => {
  let component: OrderedTaskListComponent;
  let fixture: ComponentFixture<OrderedTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
