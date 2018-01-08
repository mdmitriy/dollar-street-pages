import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AboutComponent } from '../about.component';
import { AboutService } from '../about.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CommonServicesTestingModule } from '../../test/commonServicesTesting.module';

describe('AboutComponent', () => {
  let componentInstance: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;
  let aboutService: AboutServiceMock;

  class ActivatedRouteMock {
    queryParams = new BehaviorSubject({jump: 'info-context'});
  }

  let expectedContent = 'About Dollar Street';
  let error = null;

  class AboutServiceMock {
    public getInfo(query: any): Observable<any> {
      return of({
        err: error, data: {
          context: expectedContent
        }
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonServicesTestingModule],
      declarations: [AboutComponent],
      providers: [
        {provide: AboutService, useClass: AboutServiceMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteMock}
      ]
    });

    fixture = TestBed.createComponent(AboutComponent);

    componentInstance = fixture.componentInstance;
    aboutService = TestBed.get(AboutService);
    debugElement = fixture.debugElement.query(By.css('div'));
    nativeElement = debugElement.nativeElement;
  }));

  it('Div with ID', () => {
    fixture.detectChanges();
    expect(nativeElement.getAttribute('id')).toEqual('info-context');
    expect(nativeElement.innerText).toEqual(expectedContent);
  });

  it('should scroll to element from queryParams', () => {
    spyOn(window, 'scrollTo');

    fixture.detectChanges();
    componentInstance.ngAfterViewInit(); // How to handle this automatically???

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('error', () => {
    error = 'error';
    fixture.detectChanges();

    // how to test this???
  })
})
;
