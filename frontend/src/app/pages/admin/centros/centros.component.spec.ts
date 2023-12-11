import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosComponent } from './centros.component';

describe('CentrosComponent', () => {
  let component: CentrosComponent;
  let fixture: ComponentFixture<CentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
