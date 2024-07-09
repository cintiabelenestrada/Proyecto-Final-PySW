import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPropietarioComponent } from './form-propietario.component';

describe('FormPropietarioComponent', () => {
  let component: FormPropietarioComponent;
  let fixture: ComponentFixture<FormPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPropietarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
