import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMasPreguntasComponent } from './ver-mas-preguntas.component';

describe('VerMasPreguntasComponent', () => {
  let component: VerMasPreguntasComponent;
  let fixture: ComponentFixture<VerMasPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMasPreguntasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerMasPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
