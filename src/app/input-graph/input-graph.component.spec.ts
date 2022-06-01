import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGraphComponent } from './input-graph.component';

describe('InputGraphComponent', () => {
  let component: InputGraphComponent;
  let fixture: ComponentFixture<InputGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
