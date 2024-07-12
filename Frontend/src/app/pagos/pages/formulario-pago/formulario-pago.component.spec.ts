import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPagoComponent } from './formulario-pago.component';

describe('FormularioPagoComponent', () => {
  let component: FormularioPagoComponent;
  let fixture: ComponentFixture<FormularioPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
