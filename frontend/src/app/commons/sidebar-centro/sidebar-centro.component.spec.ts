import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCentroComponent } from './sidebar-centro.component';

describe('SidebarCentroComponent', () => {
  let component: SidebarCentroComponent;
  let fixture: ComponentFixture<SidebarCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarCentroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
