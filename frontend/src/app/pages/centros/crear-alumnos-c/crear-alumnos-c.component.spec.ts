import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlumnosCComponent } from './crear-alumnos-c.component';

describe('CrearAlumnosCComponent', () => {
  let component: CrearAlumnosCComponent;
  let fixture: ComponentFixture<CrearAlumnosCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearAlumnosCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAlumnosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
