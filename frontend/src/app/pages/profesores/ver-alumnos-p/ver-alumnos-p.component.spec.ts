import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnosPComponent } from './ver-alumnos-p.component';

describe('VerAlumnosPComponent', () => {
  let component: VerAlumnosPComponent;
  let fixture: ComponentFixture<VerAlumnosPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerAlumnosPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerAlumnosPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
