import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWorkloadComponent } from './input-workload.component';

describe('InputWorkloadComponent', () => {
  let component: InputWorkloadComponent;
  let fixture: ComponentFixture<InputWorkloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWorkloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
