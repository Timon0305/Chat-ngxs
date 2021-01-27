import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscibeChannelComponent } from './subscibe-channel.component';

describe('SubscibeChannelComponent', () => {
  let component: SubscibeChannelComponent;
  let fixture: ComponentFixture<SubscibeChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscibeChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscibeChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
