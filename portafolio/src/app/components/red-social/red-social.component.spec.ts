import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedSocialComponent } from './red-social.component';

describe('RedSocialComponent', () => {
  let component: RedSocialComponent;
  let fixture: ComponentFixture<RedSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
