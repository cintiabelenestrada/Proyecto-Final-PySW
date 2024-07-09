import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleshabilitadosComponent } from './localeshabilitados.component';

describe('LocaleshabilitadosComponent', () => {
  let component: LocaleshabilitadosComponent;
  let fixture: ComponentFixture<LocaleshabilitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleshabilitadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocaleshabilitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
