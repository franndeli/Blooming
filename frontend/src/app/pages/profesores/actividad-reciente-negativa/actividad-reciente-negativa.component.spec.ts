import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRecienteNegativaComponent } from './actividad-reciente-negativa.component';

describe('ActividadRecienteNegativaComponent', () => {
  let component: ActividadRecienteNegativaComponent;
  let fixture: ComponentFixture<ActividadRecienteNegativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadRecienteNegativaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadRecienteNegativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
