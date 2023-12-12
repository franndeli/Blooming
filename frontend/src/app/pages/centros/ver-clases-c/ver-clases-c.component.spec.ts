import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerClasesCComponent } from './ver-clases-c.component';

describe('VerClasesCComponent', () => {
  let component: VerClasesCComponent;
  let fixture: ComponentFixture<VerClasesCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerClasesCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerClasesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
