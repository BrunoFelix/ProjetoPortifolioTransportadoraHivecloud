import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportadoraAlterarComponent } from './transportadora-alterar.component';

describe('TransportadoraAlterarComponent', () => {
  let component: TransportadoraAlterarComponent;
  let fixture: ComponentFixture<TransportadoraAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportadoraAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportadoraAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
