import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
// import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
//import { BehaviorSubject } from 'rxjs';
import { TaskNode, WorkflowService } from '../workflow.service';
// import {Observable} from 'rxjs/Observable';
// import {merge} from 'rxjs/observable/merge';
// import {map} from 'rxjs/operators/map';

/**
 * Node for Task
 */


// export class TaskNode {
//   children: BehaviorSubject<TaskNode[]>;
//   constructor(public item: string, children?: TaskNode[], public parent?: TaskNode) {
//     this.children = new BehaviorSubject(children === undefined ? [] : children);
//   }
// }

// /**
//  * The list of Tasks
//  */
// const TREE_DATA = [
//   new TaskNode('Simulation', [
//     new TaskNode('Factorio'),
//     new TaskNode('Oxygen not included'),
//   ]),
//   new TaskNode('Indie', [
//     new TaskNode(`Don't Starve`, [
//       new TaskNode(`Region of Giants`),
//       new TaskNode(`Together`),
//       new TaskNode(`Shipwrecked`)
//     ]),
//     new TaskNode('Terraria'),
//     new TaskNode('Starbound'),
//     new TaskNode('Dungeon of the Endless')
//   ]),
//   new TaskNode('Action', [
//     new TaskNode('Overcooked')
//   ]),
//   new TaskNode('Strategy', [
//     new TaskNode('Rise to ruins')
//   ]),
//   new TaskNode('RPG', [
//     new TaskNode('Magicka', [
//       new TaskNode('Magicka 1'),
//       new TaskNode('Magicka 2')
//     ])
//   ])
// ];

@Component({
  selector: 'app-view-workflow',
  templateUrl: './view-workflow.component.html',
  styleUrls: ['./view-workflow.component.scss']
})
export class ViewWorkflowComponent implements OnInit {
  treeData: Array<any> = [];
  recursive: boolean = false;
  levels = new Map<TaskNode, number>();
  treeControl: NestedTreeControl<TaskNode>;


  dataSource: MatTreeNestedDataSource<TaskNode>;

  constructor(private workflowService: WorkflowService,private changeDetectorRef: ChangeDetectorRef) {
    this.treeData = this.workflowService.getWorkFlow();
    this.treeControl = new NestedTreeControl<TaskNode>(this.getChildren);
    this.treeControl.dataNodes = this.treeData;
    this.treeControl.expandAll();
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = this.treeData;
  }
  ngOnInit() {
    //this.treeData = this.workflowService.getWorkFlow();
}
  getChildren = (node: TaskNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: TaskNode) => {
    return node.children.value.length > 0;
  }


}
