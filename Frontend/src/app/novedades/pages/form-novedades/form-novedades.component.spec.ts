import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNovedadesComponent } from './form-novedades.component';

describe('FormNovedadesComponent', () => {
  let component: FormNovedadesComponent;
  let fixture: ComponentFixture<FormNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNovedadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
