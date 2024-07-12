import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleditComponent } from './localedit.component';

describe('LocaleditComponent', () => {
  let component: LocaleditComponent;
  let fixture: ComponentFixture<LocaleditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocaleditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocaleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
