import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesUsuarioComponent } from './novedadesusuario.component';

describe('NovedadesusuarioComponent', () => {
  let component: NovedadesUsuarioComponent;
  let fixture: ComponentFixture<NovedadesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadesUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovedadesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
