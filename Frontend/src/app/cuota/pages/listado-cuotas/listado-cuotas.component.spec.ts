import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCuotasComponent } from './listado-cuotas.component';

describe('ListadoCuotasComponent', () => {
  let component: ListadoCuotasComponent;
  let fixture: ComponentFixture<ListadoCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCuotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
