import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: String
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>

  constructor() { 
    this.messagesInput = new Subject<Command>()
    this.messagesOutput = this.messagesInput.pipe(      scan((acc: Command[] , value:Command)=>{
      if(value.type === 'clear'){
        return acc.filter((message:Command)=>
          message.id !== value.id
        )
      }else{
        return [...acc, value]
      }
    }, []))
  }

  addSuccess(message: String){
    const id = this.randomID()
    this.messagesInput.next({
      id: id,
      text: message,
      type: 'success'
    })

    setTimeout(()=>{
      this.clearMessage(id)
    },5000)
  }

  addError(message: String){
  const id = this.randomID()
    this.messagesInput.next({
      id: id,
      text: message,
      type: 'error'
    })

    setTimeout(()=>{
      this.clearMessage(id)
    },5000)
  }

  clearMessage(id: number){
    this.messagesInput.next({
      id,
      type: 'clear'
    })
  }
  
  private randomID(){
    return Math.round(Math.random()* 10000)
  }
}
