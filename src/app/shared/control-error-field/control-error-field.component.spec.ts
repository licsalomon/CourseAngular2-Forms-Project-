import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorFieldComponent } from './control-error-field.component';

describe('ControlErrorFieldComponent', () => {
  let component: ControlErrorFieldComponent;
  let fixture: ComponentFixture<ControlErrorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlErrorFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
