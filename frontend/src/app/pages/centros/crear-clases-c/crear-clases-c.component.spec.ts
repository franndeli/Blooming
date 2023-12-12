import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearClasesCComponent } from './crear-clases-c.component';

describe('CrearClasesCComponent', () => {
  let component: CrearClasesCComponent;
  let fixture: ComponentFixture<CrearClasesCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearClasesCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearClasesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
