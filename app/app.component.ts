import { Component, ViewChild } from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap/tabs";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular 5";

  currentTabId: any;
  previousTabId: any;
  tabsList = [
    { title: "Dynamic Title 1", content: "Dynamic content 1", active: true },
    { title: "Dynamic Title 2", content: "Dynamic content 2" },
    { title: "Dynamic Title 3", content: "Dynamic content 3" }
  ];

  @ViewChild("someTabs") someTabs: TabsetComponent;

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  onDragEnd(event: DragEvent) {
    try {
      let toIndex = this.previousTabId.split("_")[1];
      let fromIndex = this.currentTabId.split("_")[1];
      let tabListItems = this.tabsList;
      if (toIndex === undefined || fromIndex === undefined) { // executes when user doenst to a proper drag and drop
        alert("Please drag and drop / move tabs properly");
      } else {
        if (Number(toIndex) && Number(fromIndex)) { // restricts index == 0 tab from moving
          tabListItems.splice(toIndex, 0, tabListItems.splice(fromIndex, 1)[0]);
          this.someTabs.tabs.splice(
            toIndex,
            0,
            this.someTabs.tabs.splice(fromIndex, 1)[0]
          );
          console.log(tabListItems);
        } else { // executes when from or to tab is fist tab (index == 0)
          alert("Primary tab cannot be moved or replaced with other");
        }
      }
    } catch (e) { // executes when user doenst to a proper drag and drop (any exception)
      alert("Please drag and drop / move tabs properly");
    }
  }

  onDraggableCancel(event: DragEvent) { // on drag cancel or if user doing invalid drag and drop zone we are cancelling that drag and drop task
    this.previousTabId = null; 
    this.currentTabId = null;
  }

   onDraggableMoved(event: DragEvent) {
    this.currentTabId = event.target["id"].split("_")[1];
    console.log("draggable moved");
  }

  onDrop(event: DragEvent) {
    this.previousTabId = event['event'].target["id"].split("_")[1];
    
    console.log("dragover");
  }
}
