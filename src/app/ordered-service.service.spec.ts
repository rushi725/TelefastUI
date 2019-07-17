import { TestBed } from '@angular/core/testing';

import { OrderedServiceService } from './ordered-service.service';

describe('OrderedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderedServiceService = TestBed.get(OrderedServiceService);
    expect(service).toBeTruthy();
  });
});
