import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadReposComponent } from './load-repos.component';

describe('LoadReposComponent', () => {
  let component: LoadReposComponent;
  let fixture: ComponentFixture<LoadReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadReposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
