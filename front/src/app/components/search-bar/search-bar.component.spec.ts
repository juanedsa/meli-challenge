import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [SearchBarComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the query param', () => {
    const emitSpy = spyOn(component.queryOutput, 'emit');
    component.query = 'query';
    component.search();
    expect(emitSpy).toHaveBeenCalledWith('query');
  });

  it('should not emit the query param', () => {
    const emitSpy = spyOn(component.queryOutput, 'emit');
    component.query = null;
    component.search();
    expect(emitSpy).not.toHaveBeenCalledWith('query');
  });

  it('should emit query', () => {
    const event = {
      key: (component as any).ENTER
    } as KeyboardEvent;

    const emitSpy = spyOn(component.queryOutput, 'emit');
    component.query = 'query';
    component.keyEvent(event);
    expect(emitSpy).toHaveBeenCalledWith('query');
  });

  it('should not emit query', () => {
    const event = {
      key: ''
    } as KeyboardEvent;

    const emitSpy = spyOn(component.queryOutput, 'emit');
    component.query = 'query';
    component.keyEvent(event);
    expect(emitSpy).not.toHaveBeenCalledWith('query');
  });
});
