import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AMenuLogisticaComponent } from './a-menu-logistica.component';

describe('AMenuLogisticaComponent', () => {
  let component: AMenuLogisticaComponent;
  let fixture: ComponentFixture<AMenuLogisticaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AMenuLogisticaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AMenuLogisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
