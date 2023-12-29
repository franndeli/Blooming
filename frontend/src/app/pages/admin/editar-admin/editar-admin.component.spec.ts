import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdminComponent } from './editar-admin.component';

describe('EditarAdminComponent', () => {
  let component: EditarAdminComponent;
  let fixture: ComponentFixture<EditarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
