import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymgraphdailyComponent } from './symgraphdaily.component';

describe('SymgraphdailyComponent', () => {
  let component: SymgraphdailyComponent;
  let fixture: ComponentFixture<SymgraphdailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymgraphdailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymgraphdailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
