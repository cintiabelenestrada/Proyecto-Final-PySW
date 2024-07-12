import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPagosComponent } from './listado-pagos.component';

describe('ListadoPagosComponent', () => {
  let component: ListadoPagosComponent;
  let fixture: ComponentFixture<ListadoPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPagosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
