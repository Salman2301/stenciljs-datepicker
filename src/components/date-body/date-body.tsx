import { Component, Prop,Event, EventEmitter, h } from '@stencil/core';
import { Dates } from "./dateTypes";
import store, { state } from "../../store";

@Component({
  tag: 'date-body',
  styleUrl: 'date-body.css',
  shadow: true
})

export class DatePicker {
  @Event() dateSel: EventEmitter<Date>;

  @Prop({ mutable: true })
  dates:Dates = [];
  
  @Prop()
	month:number = state.month;
  @Prop()
  year:number = state.year;
  
  buildDate() {
		let buildedDates:Dates = [];

		let startDate:Date = this.getStartDate();
		
		for( let i=0; i<6; i++) {
			buildedDates.push([]);
			for( let j=0; j<7; j++) {
				let currYear = startDate.getFullYear();
				let currMon = startDate.getMonth();
        
        buildedDates[i][j] = {
          date: new Date(startDate),
          dateStr: startDate.getDate(),
          currMon,
          currYear
        };

				startDate.setDate(startDate.getDate() + 1);
			}
		}
    this.dates = buildedDates;
  }

  componentWillLoad() {
    this.buildDate();

    store.onChange( "month" , ()=>{
      this.month = state.month;
      this.buildDate();
    });
    
    store.onChange( "year" , ()=>{
      this.year = state.year;
      this.buildDate();
    });

  }

  handleDateSel(date) {
    this.dateSel.emit(date);
  }

  getStartDate(y=this.year, m=this.month) {
		let weeks = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat" ]
		let currDate =  new Date(y, m, 1, 0, 0, 0); 
    let currWeek =  currDate.toLocaleString("en-US", {weekday:"short"});
    let toMinus = weeks.findIndex(e=>e===currWeek);
    // TODO add plus one to set the day of the week as Monday.
    currDate.setDate(currDate.getDate() - toMinus);
		return currDate;
  }
  
  weeks = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"]

  render() {
    return <div class="body">
      
      <div class="weeks">
        {this.weeks.map(week=><div class="week">{week}</div>)}
      </div>
      <div class="divider"></div>

      <div class="dates">
        {this.dates.map((row)=>(
          <div 
          class="date-row"
          >
            {row.map(({dateStr, date, currMon})=>(
              <div
              onClick={()=>this.handleDateSel(date)}
              class={`date ${currMon===this.month?"currMon": ""}`}
              >
             {dateStr}</div>
            ))}
          </div>
          )
        )}
      </div>
    </div>
  }
}