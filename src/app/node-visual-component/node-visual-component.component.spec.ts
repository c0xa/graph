import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeVisualComponentComponent } from './node-visual-component.component';

describe('NodeVisualComponentComponent', () => {
  let component: NodeVisualComponentComponent;
  let fixture: ComponentFixture<NodeVisualComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeVisualComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeVisualComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
