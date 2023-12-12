import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRecienteComponent } from './actividad-reciente.component';

describe('ActividadRecienteComponent', () => {
  let component: ActividadRecienteComponent;
  let fixture: ComponentFixture<ActividadRecienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadRecienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadRecienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
