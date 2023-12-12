import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilAlumnoComponent } from './ver-perfil-alumno.component';

describe('VerPerfilAlumnoComponent', () => {
  let component: VerPerfilAlumnoComponent;
  let fixture: ComponentFixture<VerPerfilAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerPerfilAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPerfilAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
