import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportadoraInserirComponent } from './transportadora-inserir.component';

describe('TransportadoraInserirComponent', () => {
  let component: TransportadoraInserirComponent;
  let fixture: ComponentFixture<TransportadoraInserirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportadoraInserirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportadoraInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
