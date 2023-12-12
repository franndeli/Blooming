import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnosCComponent } from './ver-alumnos-c.component';

describe('VerAlumnosCComponent', () => {
  let component: VerAlumnosCComponent;
  let fixture: ComponentFixture<VerAlumnosCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerAlumnosCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerAlumnosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
