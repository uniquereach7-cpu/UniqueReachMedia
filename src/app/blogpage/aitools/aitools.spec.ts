import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aitools } from './aitools';

describe('Aitools', () => {
  let component: Aitools;
  let fixture: ComponentFixture<Aitools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aitools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aitools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
