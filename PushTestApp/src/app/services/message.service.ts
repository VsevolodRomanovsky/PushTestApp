import { Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '@interfaces/IMessage';
const Url = "/api/values";

@Injectable()
export class MessageService {

  constructor(public Http: HttpClient) {

  }
  sendMessage(message: IMessage): Observable<IMessage> {
    return this.Http.post<IMessage>(Url, message).pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );

  }
}
