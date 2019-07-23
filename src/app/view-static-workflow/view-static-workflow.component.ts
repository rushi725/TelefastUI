import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { TaskNode, WorkflowService } from '../workflow.service';
import { ActivatedRoute } from '@angular/router';
import { StaticWorkflowService } from '../static-workflow.service';

@Component({
  selector: 'app-view-static-workflow',
  templateUrl: './view-static-workflow.component.html',
  styleUrls: ['./view-static-workflow.component.scss']
})
export class ViewStaticWorkflowComponent implements OnInit {

  treeData: Array<any> = [];
  recursive: boolean = false;
  levels = new Map<TaskNode, number>();
  treeControl: NestedTreeControl<TaskNode>;
  serviceId = 26;
  taskWorkflow: Array<any> = [];


  dataSource: MatTreeNestedDataSource<TaskNode>;

  constructor(private staticWorkflowService: StaticWorkflowService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    // this.route.data.subscribe(e => {
    //   this.treeData = e.taskWorkflow;
    //   console.log(this.treeData)
    // });

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        this.serviceId = params.serviceId;
        console.log(this.serviceId); // popular
      });
    this.treeData = this.staticWorkflowService.getWorkFlow(this.serviceId);
    this.staticWorkflowService.getWorkFlowStream().subscribe((e: any) => {
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
