import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTaskFormComponent } from './transfer-task-form.component';

describe('TransferTaskFormComponent', () => {
  let component: TransferTaskFormComponent;
  let fixture: ComponentFixture<TransferTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
