import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlumnosComponent } from './crear-alumnos.component';

describe('CrearAlumnosComponent', () => {
  let component: CrearAlumnosComponent;
  let fixture: ComponentFixture<CrearAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
