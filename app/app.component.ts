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
    { title: "Dynamic Title 3", content: "Dynamic content 3" },
    { title: "Dynamic Title 4", content: "Dynamic content 4" },
    { title: "Dynamic Title 5", content: "Dynamic content 5" }
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
      let toIndex = this.currentTabId;
      let fromIndex = this.previousTabId;
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
  
  }

  onDragStart(event: DragEvent){
      this.previousTabId = event.target["id"].split("_")[1];

  }

  onDrop(event) {
    this.currentTabId = event.event.target["id"].split("_")[1];
    console.log("dragover");
  }

}
