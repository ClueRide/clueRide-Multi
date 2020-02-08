import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPage } from './email.page';

describe('EmailPage', () => {
  let component: EmailPage;
  let fixture: ComponentFixture<EmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
