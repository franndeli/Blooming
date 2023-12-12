import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentrosComponent } from './editar-centros.component';

describe('EditarCentrosComponent', () => {
  let component: EditarCentrosComponent;
  let fixture: ComponentFixture<EditarCentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCentrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
