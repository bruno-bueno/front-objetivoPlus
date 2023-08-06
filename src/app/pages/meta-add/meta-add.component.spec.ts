import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaAddComponent } from './meta-add.component';

describe('MetaAddComponent', () => {
  let component: MetaAddComponent;
  let fixture: ComponentFixture<MetaAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaAddComponent]
    });
    fixture = TestBed.createComponent(MetaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
