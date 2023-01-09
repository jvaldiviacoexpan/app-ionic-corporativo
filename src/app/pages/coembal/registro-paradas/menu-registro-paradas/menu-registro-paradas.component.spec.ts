import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuRegistroParadasComponent } from './menu-registro-paradas.component';

describe('CmbMenuExtrusionPage', () => {
  let component: MenuRegistroParadasComponent;
  let fixture: ComponentFixture<MenuRegistroParadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRegistroParadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegistroParadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
