import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportadoraFormularioComponent } from './transportadora-formulario.component';

describe('TransportadoraFormularioComponent', () => {
  let component: TransportadoraFormularioComponent;
  let fixture: ComponentFixture<TransportadoraFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportadoraFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportadoraFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
