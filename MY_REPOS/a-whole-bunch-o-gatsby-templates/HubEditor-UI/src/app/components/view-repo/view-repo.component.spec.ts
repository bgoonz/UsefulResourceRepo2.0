import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepoComponent } from './view-repo.component';

describe('ViewRepoComponent', () => {
  let component: ViewRepoComponent;
  let fixture: ComponentFixture<ViewRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
