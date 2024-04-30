import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import { By } from '@angular/platform-browser';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe ('should show radiosingular title', () => {
    it ('should show radiosingular title', () => {
      expect(component.title).toBe('radiosingular')
    })
  
    it('should show title in h1', () => {
      const title = fixture.nativeElement.querySelector('h1');
      expect(title.textContent).toBe('radiosingular');
      // o component.title
    })

  })
  
  describe('should search radio station by name', () => {
    it('should have an input with the placeholder, "Escribe el nombre de la emisora"', () => {
      const placeholder = fixture.nativeElement.querySelector('input').placeholder;
      const valuePlaceholder = 'Escribe el nombre de la emisora';
      expect(placeholder).toBe(valuePlaceholder);
    })

    it('should have a button titled "Search"', () => {
      const button = fixture.nativeElement.querySelector('button').textContent;
      const buttonTitle = "Search"
      expect(button).toBe(buttonTitle)
    })

    it('should run search function once', () => {
      const radioStationSpy = jest.spyOn(component, 'searchRadio');
      const buttonEl = fixture.debugElement.query(By.css('button'))
      buttonEl.triggerEventHandler('click', null);
      expect (radioStationSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('should exist one list', () => {
    it ('should have a list', () => {
      const list = fixture.nativeElement.querySelector('ul');
      expect(list).not.toBeNull
    })
    it ('should initialize empty', () => {
      const liArray = fixture.nativeElement.querySelectorAll('li');
      const arrayLength = liArray.length;
      expect(arrayLength).toBe(0);
    })

    it('should show one result when search is succesful', () => {
      component.radioStations=[{
        name: "Test",
        url: "test",
        country: "test"
      }]
      const radioStationSpy = jest.spyOn(component, 'searchRadio').mockImplementation(() => {
        component.filterArray = component.radioStations.filter((radio)=>{
          return radio.name.includes('t')
        })
      })
      const button = fixture.nativeElement.querySelector('button')
      // const input = fixture.debugElement.query(By.css('input'))
      // input.triggerEventHandler('keyup', 'teletaxi')
      // component.inputValue="8";
      button.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      const liArray = fixture.nativeElement.querySelectorAll('li');

      expect(liArray.length).toBeGreaterThan(0)
      // expect (radioStationSpy).toHaveBeenCalledTimes(1)
    })
  }

  )
});

