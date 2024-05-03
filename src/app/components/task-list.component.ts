import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../services/system.service';
import { Priority, TaskDetails } from '../models/task-details.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: [],
  imports: [
    CommonModule,
    FormsModule      
  ],
})
export class TaskListComponent implements OnInit {
    @ViewChild('taskModal') taskModal: ElementRef | undefined;
    selectedTaskIds: string[] = [];


    tasks: TaskDetails[] = [];
    task: TaskDetails = new TaskDetails();

    priorityOptions: { id: Priority, name: string }[] = 
    [{ id: Priority.Low, name: 'Low' }, 
    { id: Priority.Medium, name: 'Medium' }, 
    { id: Priority.High, name: 'High' }];

    constructor(
        private service: SystemService,
        private modal: NgbModal) {
    }

    ngOnInit() {
        this.getAllTasks();
    }

    getAllTasks() {
        this.service.getAllTasks().subscribe((res) => {
            this.tasks = res; 
        });
    }

    getPriorityClass(priority: Priority) {
        switch (priority) {
        case Priority.High:
            return 'red';
        case Priority.Medium:
            return 'blue';
        case Priority.Low:
        default:
            return 'green';
        }
    }

    enumToString(priority: Priority) {
        switch (priority) {
        case Priority.High:
            return 'High';
        case Priority.Medium:
            return 'Medium';
        case Priority.Low:
        default:
            return 'Low';
        }
    }

    openModal() {
        this.task = new TaskDetails();
        this.modal.open(this.taskModal, { centered: true, ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result;
    }

    addTask() {
        this.service.addTask(this.task).subscribe(() => {
            this.getAllTasks();
            this.closeModal();
        });
    }

    closeModal(){
        this.modal.dismissAll();
    }

    toggleSelection(taskId: string) {
        const index = this.selectedTaskIds.indexOf(taskId);
        if (index === -1) {
            this.selectedTaskIds.push(taskId);
        } else {
            this.selectedTaskIds.splice(index, 1);
        }
    }

    isSelected(taskId: string): boolean {
        return this.selectedTaskIds.includes(taskId);
    }

    deleteSelectedTasks() {
        this.service.deleteTasks(this.selectedTaskIds).subscribe(() => {
            this.selectedTaskIds = [];
            this.getAllTasks();
        });
    }
}