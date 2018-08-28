import {HttpHeaders} from '@angular/common/http';

export const appURL: string = 'http://localhost:4200';
export const serverURL: string = 'http://localhost:3000';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};
