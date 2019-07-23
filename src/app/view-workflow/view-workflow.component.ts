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
  serviceId = 128;
  orderedServiceId = 132;
  taskWorkflow: Array<any> = [];


  dataSource: MatTreeNestedDataSource<TaskNode>;

  constructor(private workflowService: WorkflowService,
              private changeDetectorRef: ChangeDetectorRef,
              private serviceWorkflow: WorkflowService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    // this.route.data.subscribe(e => {
    //   this.treeData = e.taskWorkflow;
    //   console.log(this.treeData)
    // });

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        this.serviceId = params.serviceId;
        this.orderedServiceId = params.orderedServiceId;
        console.log(this.serviceId); // popular
      });
    this.treeData = this.workflowService.getWorkFlow(this.serviceId, this.orderedServiceId);
    this.workflowService.getWorkFlowStream().subscribe((e: any) => {
      this.treeData = e;
      this.treeControl = new NestedTreeControl<TaskNode>(this.getChildren);
      this.treeControl.dataNodes = this.treeData;
      this.treeControl.expandAll();
      this.dataSource = new MatTreeNestedDataSource();
      this.dataSource.data = this.treeData;
    });
    this.treeControl = new NestedTreeControl<TaskNode>(this.getChildren);
    // this.treeControl.dataNodes = this.treeData;
    // this.treeControl.expandAll();
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
