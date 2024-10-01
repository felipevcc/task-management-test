import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/task.interface';
import * as TaskActions from 'src/app/state/actions/task.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-task',
  templateUrl: './modal-create-task.component.html',
  styleUrls: ['./modal-create-task.component.scss']
})
export class ModalCreateTaskComponent {
  @ViewChild('content') content!: TemplateRef<any>;

  modalRef: NgbModalRef | undefined;
  taskForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.taskForm = this.fb.group({});
    this.initializeForm();
  }

  ngOnInit() { }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      people: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required, Validators.minLength(5)]],
          age: ['', [Validators.required, Validators.min(18)]],
          skills: this.fb.array([
            this.fb.control('', [Validators.required])
          ], [this.minArrayLength(1)])
        })
      ], [this.minArrayLength(1), this.uniqueNamesValidator()])
    });
  }

  open() {
    this.modalRef = this.modalService.open(this.content, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true
    });
  }

  closeModal() {
    this.modalRef?.close();
    this.taskForm.reset();
    this.initializeForm();
  }

  minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control && control.value && control.value.length < min) {
        return { 'minArrayLength': { valid: false } };
      }
      return null;
    };
  }

  uniqueNamesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        const names = control.controls.map(group => group.get('name')?.value);
        const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);
        return hasDuplicates ? { 'uniqueNames': { valid: false } } : null;
      }
      return null;
    };
  }

  addPerson() {
    this.people.push(this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([
        this.fb.control('', [Validators.required])
      ], [this.minArrayLength(1)])
    }));
  }
  removePerson(personIndex: number) {
    this.people.removeAt(personIndex);
  }

  addSkill(personIndex: number) {
    const person = this.people.at(personIndex) as FormGroup;
    const skills = person.get('skills') as FormArray;
    skills.push(this.fb.control('', Validators.required));
  }
  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.removeAt(skillIndex);
  }

  get people() {
    return this.taskForm.get('people') as FormArray;
  }
  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    };
    const taskData: Task = this.taskForm.value;
    this.closeModal();
    console.log("onSubmit");
    this.store.dispatch(TaskActions.addTask({ task: taskData }));
    Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: 'Tarea creada exitosamente.',
    });
  }

}
