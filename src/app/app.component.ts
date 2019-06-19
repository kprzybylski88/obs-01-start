import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  show: boolean;
  evSubs: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {

    this.evSubs = this.userService.activatedEmmiter.pipe(map( data => {
      return !data;
    })).subscribe(activated => {
        console.log(activated);
        this.show = activated;
      });

  }

  ngOnDestroy(): void {
    this.evSubs.unsubscribe();
  }
}
