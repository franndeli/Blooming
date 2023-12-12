import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerClasesPComponent } from './ver-clases-p.component';

describe('VerClasesPComponent', () => {
  let component: VerClasesPComponent;
  let fixture: ComponentFixture<VerClasesPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerClasesPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerClasesPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
