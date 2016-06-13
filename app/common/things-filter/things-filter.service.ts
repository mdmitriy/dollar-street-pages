import {Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Config} from '../../app.config';

export class ThingsFilterService {
  public http:any;

  public constructor(@Inject(Http) http:Http) {
    this.http = http;
  }

  public getThings(query:string):Observable<any> {
    return this.http
      .get(`${Config.api}/consumer/api/v1/things-filter?${query}`)
      .map((res:any) => {
        let parseRes = JSON.parse(res._body);

        return {err: parseRes.error, data: parseRes.data};
      });
  }
}