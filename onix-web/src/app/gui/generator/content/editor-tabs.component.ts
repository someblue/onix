import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'onix-generator-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.css']
})
export class EditorTabsComponent implements OnInit {

  tabs = ['Template', 'Schema'];
  selectedIndex = 0;

  constructor() { }

  ngOnInit() {
  }

}
