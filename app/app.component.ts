import { Component,ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 5';

  currentTabId: any;
  previousTabId: any;
  tabsList = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1', active: true },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2' },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3' }
  ]

  @ViewChild('someTabs') someTabs: TabsetComponent;

   draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };


  onDragEnd(event: DragEvent) {
    let toIndex = this.previousTabId.split('_')[1];
    let fromIndex = this.currentTabId.split('_')[1];
    let tabListItems = this.tabsList;
    tabListItems.splice(toIndex, 0, tabListItems.splice(fromIndex, 1)[0]);
    this.someTabs.tabs.splice(toIndex, 0, this.someTabs.tabs.splice(fromIndex, 1)[0]);
    console.log(tabListItems);
  }



  onDraggableMoved(event: DragEvent) {
    this.currentTabId = event.target['id'];
    //console.log("draggable moved", event.target['id']);
  }


  onDragover(event: DragEvent) {
    this.previousTabId = event.target['id']
    //  console.log("dragover", event.target['id']);
  }
}


