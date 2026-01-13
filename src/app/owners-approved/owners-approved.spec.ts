import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersApproved } from './owners-approved';

describe('OwnersApproved', () => {
  let component: OwnersApproved;
  let fixture: ComponentFixture<OwnersApproved>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersApproved]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersApproved);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
