import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
import { SearchActions } from './search.actions';
import { IAppState } from '../store';

/**
 * Component that demonstrates merging input and selector streams
 * to react to user input.
 */
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  // Selected observables to test async pipe model.
  @select(['search', 'total']) numChars$: Observable<number>;
  @select(['search', 'keyword']) search$: Observable<string>;

  // Members to test subscribe model.
  numChars: number;
  keyword: string;

  constructor(
    public actions: SearchActions,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    // Exercise the flow where a state change results in a new action.
    this.search$.subscribe(keyword => {
      if (keyword != '') {
        this.actions.fetchResultDispatch(keyword.length)
      }
    });

    // Exercise the flow where you set a member on change manually instead of
    // using async pipe.
    this.numChars$.subscribe(state => {
      this.numChars = state;
    });
  }

  handleKeyUp(value) {
    this.keyword = value;
    this.actions.searchDispatch(value);
  }
}
