import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFacebookComponent } from './post-facebook.component';

describe('PostFacebookComponent', () => {
  let component: PostFacebookComponent;
  let fixture: ComponentFixture<PostFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFacebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
