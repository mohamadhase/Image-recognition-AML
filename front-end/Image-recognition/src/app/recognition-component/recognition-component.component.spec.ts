import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionComponentComponent } from './recognition-component.component';

describe('RecognitionComponentComponent', () => {
  let component: RecognitionComponentComponent;
  let fixture: ComponentFixture<RecognitionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognitionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
