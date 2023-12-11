import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProfesoresComponent } from './ver-profesores.component';

describe('VerProfesoresComponent', () => {
  let component: VerProfesoresComponent;
  let fixture: ComponentFixture<VerProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
