import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBox1Component } from './dialog-box1.component';

describe('DialogBox1Component', () => {
  let component: DialogBox1Component;
  let fixture: ComponentFixture<DialogBox1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBox1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBox1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
