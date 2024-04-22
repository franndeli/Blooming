import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensasComponent } from './recompensas.component';

describe('RecompensasComponent', () => {
  let component: RecompensasComponent;
  let fixture: ComponentFixture<RecompensasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecompensasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecompensasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
