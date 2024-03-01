import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolEscenaComponent } from './arbol-escena.component';

describe('ArbolEscenaComponent', () => {
  let component: ArbolEscenaComponent;
  let fixture: ComponentFixture<ArbolEscenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArbolEscenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArbolEscenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
