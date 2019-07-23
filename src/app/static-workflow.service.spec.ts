import { TestBed } from '@angular/core/testing';

import { StaticWorkflowService } from './static-workflow.service';

describe('StaticWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticWorkflowService = TestBed.get(StaticWorkflowService);
    expect(service).toBeTruthy();
  });
});
