import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderedServicesComponent } from './view-ordered-services.component';

describe('ViewOrderedServicesComponent', () => {
  let component: ViewOrderedServicesComponent;
  let fixture: ComponentFixture<ViewOrderedServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderedServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
