import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'duedate';

  // [(selectedIndex)]="selectedIndex" (selectedTabChange)="tabChanged($event)"
  public selectedIndex = 0;

  public weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public weekOffListSelected = [];
  public startDate;
  public endDate;
  public minDate = new Date();
  public endMinDate = new Date();
  public endWeekMinDate = new Date();
  public dueDatesDaily = [];
  public dueDatesWeek = [];
  public weekListSelected: any = [];
  public strtWeek;
  public endWeek;
  public oneTime;
  public valueChecked: boolean = false;
  public configuration: boolean = true;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }

  public weekOffSelect(checked, index) {
    let i = this.weekOffListSelected.indexOf(index);
    if (checked) {
      this.weekOffListSelected.push(index);
    } else {
      this.weekOffListSelected.splice(i, 1);
    }
  }

  public addEvent(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.endMinDate = this.startDate;
  }

  public changeEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
  }

  public startWeekDate(event: MatDatepickerInputEvent<Date>) {
    this.strtWeek = event.value;
    this.endWeekMinDate = this.strtWeek;
  }

  public endWeekDate(event: MatDatepickerInputEvent<Date>) {
    this.endWeek = event.value;
  }

  public oneDate(event: MatDatepickerInputEvent<Date>) {
    this.oneTime = event.value;
    console.log(this.oneTime);
  }

  public generateDueDates() {
    if (this.startDate !== undefined) {
      this.dailyDueDate();
    }
    if (this.strtWeek !== undefined) {
      this.weekDueDate();
    }
    this.configuration = false;
  }

  public nextDailyStep() {
    if (this.startDate != undefined) {
      this.selectedIndex += 1;
    } else {
      window.alert('Select Start Date')
    }
  }

  public nextWeekStep() {
    if (this.strtWeek != undefined) {
      this.selectedIndex += 1;
    } else {
      window.alert('Select Start Date')
    }
  }
  public dailyDueDate() {
    let date = new Date();
    date = this.startDate;
    let diff = 1;
    if (this.endDate !== undefined) {
      const daysDiff = Math.floor(Math.abs(<any>this.startDate - <any>this.endDate) / (1000 * 60 * 60 * 24));
      this.dailyDueChild(date, diff, daysDiff);
    } else {
      this.dailyDueChild(date, diff, 20);
      this.dueDatesDaily.push('ETC...')
    }
    console.log(this.dueDatesDaily)
  }

  public dailyDueChild(date, diff, daysDiff) {
    let ind = this.weekOffListSelected.find(x => x == 0);
    console.log(ind)
    for (let i = 0; i < daysDiff; i++) {
      if (date > this.endDate) {
        break;
      }
      if (this.weekOffListSelected.length !== 0) {
        this.weekOffListSelected.forEach(el => {
          let day = date.getDay();
          if (day != el) {
            this.dueDatesDaily.push(new Date(date.setDate(date.getDate() + diff)))
          } else {
            date.setDate(date.getDate() + diff)
          }
        })
      } else {
        this.dueDatesDaily.push(new Date(date.setDate(date.getDate() + diff)))
      }
    }
  }

  public weekSelect(checked, index) {
    let i = this.weekListSelected.indexOf(index);
    if (checked) {
      this.weekListSelected.push(index);
    } else {
      this.weekListSelected.splice(i, 1);
    }
  }

  public weekDueDate() {
    let date = new Date();
    date = this.strtWeek;
    let diff = 1;
    if (this.endWeek != undefined) {
      const daysDiff = Math.floor(Math.abs(<any>this.strtWeek - <any>this.endWeek) / (1000 * 60 * 60 * 24));
      this.weekDueChild(date, 100, diff);
    } else {
      this.weekDueChild(date, 100, diff);
      this.dueDatesWeek.push('ETC...');
    }
    console.log(this.dueDatesWeek);
  }

  public weekDueChild(date, daysDiff, diff) {
    let weekStart = cloneDeep(this.strtWeek);
    if (this.weekListSelected.length !== 0) {
      this.weekListSelected.forEach(el => {
        date = cloneDeep(this.strtWeek);
        for (let i = 0; i < daysDiff; i++) {
          if (date < this.endWeek) {
            let day = date.getDay();
            if (day == el) {
              this.dueDatesWeek.push(new Date(date.setDate(date.getDate() + diff)));
            } else {
              date.setDate(date.getDate() + diff);
            }
          } else {
            break;
          }
        }
      })
    }
  }

  public backToConfiguration() {
    this.configuration = true;
  }
}
