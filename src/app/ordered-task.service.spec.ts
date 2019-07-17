import { TestBed } from '@angular/core/testing';

import { OrderedTaskService } from './ordered-task.service';

describe('OrderedTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderedTaskService = TestBed.get(OrderedTaskService);
    expect(service).toBeTruthy();
  });
});
