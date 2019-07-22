import {ChangeDetectorRef, Component, Injectable, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import { TaskNode, WorkflowService } from '../workflow.service';
import { ActivatedRoute } from '@angular/router';
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
  serviceId = 91;
  orderedServiceId = 100;
  taskWorkflow: Array<any> = [];


  dataSource: MatTreeNestedDataSource<TaskNode>;

  constructor(private workflowService: WorkflowService,
              private changeDetectorRef: ChangeDetectorRef,
              private serviceWorkflow: WorkflowService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe(e => {
      this.treeData = e.taskWorkflow;
      console.log(this.treeData)
    });
    //this.workflowService.getWorkFlowStream().subscribe((e: any) => this.treeData = e.taskWorkFlow);
    //this.treeData = this.taskWorkflow;
    this.treeControl = new NestedTreeControl<TaskNode>(this.getChildren);
    this.treeControl.dataNodes = this.treeData;
    this.treeControl.expandAll();
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = this.treeData;
}
  getChildren = (node: TaskNode) => {
    return node.children;
  }

  hasChildren = (index: number, node: TaskNode) => {
    return node.children.value.length > 0;
  }
}
