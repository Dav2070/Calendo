import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
declare var $: any;
import { Todo } from '../../models/Todo';
import { DataService } from '../../services/data-service';
import { NewTodoModalComponent } from '../../components/new-todo-modal/new-todo-modal.component';
import { AppointmentModalComponent } from '../../components/appointment-modal/appointment-modal.component';
import { enUS } from '../../../locales/locales';

@Component({
   selector: "calendo-start-page",
   templateUrl: "./start-page.component.html",
   styleUrls: [
      "./start-page.component.scss"
   ]
})
export class StartPageComponent{
	locale = enUS.startPage;
	@ViewChild(NewTodoModalComponent)
	private newTodoModalComponent: NewTodoModalComponent;
	@ViewChild(AppointmentModalComponent)
	private newAppointmentModalComponent: AppointmentModalComponent;
	largeDateFormat: string = this.locale.formats.smallDate;
	smallDateFormat: string = this.locale.formats.largeDate;

	constructor(public dataService: DataService,
					private router: Router){
		fontawesome.library.add(solid);
		this.locale = this.dataService.GetLocale().startPage;
		moment.locale(this.dataService.locale);
	}

	ngOnInit(){
		this.setSize();
	}

	public async DeleteTodo(todo: Todo){
		this.dataService.RemoveTodo(todo);
	}

	ShowCalendarDay(date: number){
		this.router.navigate(['/calendar/day', date]);
	}

	GetLargeDate(date: number): string{
      return moment.unix(date).format(this.largeDateFormat);
	}
	
	GetSmallDate(date: number): string{
		return moment.unix(date).format(this.smallDateFormat);
	}

	GetCurrentWeekday(){
		return moment().format("dddd")
	}

	GetCurrentDate(){
		return moment().format("LL")
	}

	ShowModal(index){
		if(index == 0){
			// Show the appointment modal
			this.newAppointmentModalComponent.Show();
		}else{
			// Show the todo modal
			this.newTodoModalComponent.Show();
		}
	}

	CreateTodo(todo){
		this.dataService.AddTodo(todo);
	}

	CreateAppointment(appointment){
		this.dataService.AddAppointment(appointment);
	}

	onResize(){
		this.setSize();
	}

	setSize(){
		if(window.innerWidth < 600){
			this.largeDateFormat = this.locale.formats.smallDate;
			this.smallDateFormat = this.locale.formats.largeDate;
		}else{
			this.largeDateFormat = this.locale.formats.largeDate;
			this.smallDateFormat = this.locale.formats.smallDate;
		}
	}
}