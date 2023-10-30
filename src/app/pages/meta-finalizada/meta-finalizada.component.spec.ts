import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaFinalizadaComponent } from './meta-finalizada.component';

describe('MetaFinalizadaComponent', () => {
  let component: MetaFinalizadaComponent;
  let fixture: ComponentFixture<MetaFinalizadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaFinalizadaComponent]
    });
    fixture = TestBed.createComponent(MetaFinalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
