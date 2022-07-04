import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedFormComponent } from './based-form.component';

describe('BasedFormComponent', () => {
  let component: BasedFormComponent;
  let fixture: ComponentFixture<BasedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
