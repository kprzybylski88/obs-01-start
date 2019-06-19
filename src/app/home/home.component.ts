import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';

class Timer extends Observable<number> {
  constructor(private time: number ) {
    super((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
/*         if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('No more numbers for you!'));
        } */
        observer.next(count);
        count++;
      }, time);
    });
    /* const t = time ? time : 1000;
    return new Observable<number>(); */
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  intervalObs: Subscription;
  customInterval: Timer;
  pipedOb: Observable<string>;

  constructor() { }

  ngOnInit() {
    this.customInterval = new Timer(500);

    this.pipedOb = this.customInterval.pipe(filter(data => {
      return data > 5;
    }),
     map(data => {
      return 'Round ' + (data + 1);
    }));

    this.intervalObs = this.pipedOb.subscribe({
      next: data =>  console.log(data),
      error: err => console.log(err.message),
      complete: () => console.log('booya!')});



    /* new Observable((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count > 3) {
          observer.error(new Error('No more numbers for you!'));
        }
        count++;
      }, 1000);
    });
    this.custIntervObs = customInterval.subscribe((nmbr) => {
      console.log(nmbr);
    }); */
  }

  ngOnDestroy() {

    // this.intervalObs.unsubscribe();
    this.intervalObs.unsubscribe();
  }

}
