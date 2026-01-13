import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digitalmarketing } from './digitalmarketing';

describe('Digitalmarketing', () => {
  let component: Digitalmarketing;
  let fixture: ComponentFixture<Digitalmarketing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Digitalmarketing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Digitalmarketing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
