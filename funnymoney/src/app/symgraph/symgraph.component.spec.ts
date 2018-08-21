import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymgraphComponent } from './symgraph.component';

describe('SymgraphComponent', () => {
  let component: SymgraphComponent;
  let fixture: ComponentFixture<SymgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
