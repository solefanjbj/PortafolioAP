import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoArgPComponent } from './logo-arg-p.component';

describe('LogoArgPComponent', () => {
  let component: LogoArgPComponent;
  let fixture: ComponentFixture<LogoArgPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoArgPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoArgPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
