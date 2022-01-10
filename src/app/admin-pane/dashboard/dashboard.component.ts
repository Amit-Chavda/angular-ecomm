import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  action:string="Users";
  searchString:string="";

  eventsSubject:Subject<string>=new Subject<string>();

  @Output() searchStringEvent=new EventEmitter<string>();


  constructor() {}

  ngOnInit(): void {}

  onACtionChanged(actionName){
    this.action=actionName;
  }

  onSearchStringChanged(searchString){
    this.searchString=searchString;
    console.log(searchString);
    this.searchStringEvent.emit(searchString);
    this.eventsSubject.next(searchString);
  }

}
