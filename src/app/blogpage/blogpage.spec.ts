import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blogpage } from './blogpage';

describe('Blogpage', () => {
  let component: Blogpage;
  let fixture: ComponentFixture<Blogpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blogpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blogpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
