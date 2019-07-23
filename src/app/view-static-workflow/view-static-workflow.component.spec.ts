import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaticWorkflowComponent } from './view-static-workflow.component';

describe('ViewStaticWorkflowComponent', () => {
  let component: ViewStaticWorkflowComponent;
  let fixture: ComponentFixture<ViewStaticWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStaticWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaticWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
