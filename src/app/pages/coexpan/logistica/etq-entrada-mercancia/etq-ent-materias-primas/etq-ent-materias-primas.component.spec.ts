import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtqEntMateriasPrimasComponent } from './etq-ent-materias-primas.component';

describe('EntMateriasPrimasComponent', () => {
  let component: EtqEntMateriasPrimasComponent;
  let fixture: ComponentFixture<EtqEntMateriasPrimasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtqEntMateriasPrimasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtqEntMateriasPrimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
