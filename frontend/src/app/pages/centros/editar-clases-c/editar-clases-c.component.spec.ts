import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClasesCComponent } from './editar-clases-c.component';

describe('EditarClasesCComponent', () => {
  let component: EditarClasesCComponent;
  let fixture: ComponentFixture<EditarClasesCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarClasesCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarClasesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
