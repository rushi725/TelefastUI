import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import { TaskNode, WorkflowService } from '../workflow.service';
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

  constructor(private workflowService: WorkflowService,
              private changeDetectorRef: ChangeDetectorRef,
              private serviceWorkflow: WorkflowService) {
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
