import { Component, HostListener, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() queryOutput: EventEmitter<string> = new EventEmitter();

  public query: string;
  public loading: boolean;

  private readonly ENTER = 'Enter';

  constructor() {
    this.query = '';
  }

  public search(): void {
    if (this.query) {
      this.queryOutput.emit(this.query);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.ENTER === event.key && this.query) {
      this.queryOutput.emit(this.query);
    }
  }
}
