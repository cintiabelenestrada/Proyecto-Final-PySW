import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotaComponent } from './cuota.component';

describe('CuotaComponent', () => {
  let component: CuotaComponent;
  let fixture: ComponentFixture<CuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
