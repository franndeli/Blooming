import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentroComponent } from './editar-centro.component';

describe('EditarCentroComponent', () => {
  let component: EditarCentroComponent;
  let fixture: ComponentFixture<EditarCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCentroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
