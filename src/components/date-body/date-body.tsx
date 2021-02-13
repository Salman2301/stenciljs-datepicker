import { Component, Prop, Event, State, EventEmitter, h } from '@stencil/core';
import { ArrayOfDates } from "./dateTypes";
import store, { state } from "../../store";
import { getStartEndDate } from "../../utils/all";

@Component({
  tag: 'date-body',
  styleUrl: 'date-body.css',
  shadow: true
})

export class DatePicker {
  @Event() dateSel: EventEmitter<Date>;

  @Prop({ mutable: true })
  dates:ArrayOfDates = [];

  @State()
  disableDates: Date[] = state.disableDates;

  @State()
  enableDates: Date[] = state.enableDates;

  @State()
  enableOnlyDates: Date[] = state.enableOnlyDates;

  @State()
  disableByWeek: number[] = state.disableByWeek;

	month:number = state.month;

  year:number = state.year;
  
  weeks = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"]

  buildDate() {
		let buildedDates:ArrayOfDates = [];

		let startDate:Date = this.getStartDate();
		
		for( let i=0; i<6; i++) {
			buildedDates.push([]);
			for( let j=0; j<7; j++) {
				let currYear = startDate.getFullYear();
				let currMon = startDate.getMonth();
        
        buildedDates[i][j] = {
          date: new Date(startDate),
          dateStr: startDate.getDate(),
          currWeek: this.getCurrWeek(startDate),
          currMon,
          currYear,
          classStr: `date ${this.getClassCurrMon(currMon)}`
        };

				startDate.setDate(startDate.getDate() + 1);
			}
		}
    this.dates = buildedDates;
  } 

  updateDisableDate() {
    for( const i in this.dates) {
      for( const j in this.dates[i] ) {
        const { date, currWeek, classStr } = this.dates[i][j];
        // TODO: filter the disableDates with enableDates
        const disableDate = this.dateInRange(date, this.disableDates); 
        const enableDate = this.dateInRange(date, this.enableDates);
        const disableWeek = this.disableByWeek.includes(currWeek);
        
        let isDisable = disableDate || disableWeek;

        if (enableDate) isDisable = false;

        if( this.enableOnlyDates.length > 0 ) {
          const enableOnly = this.dateInRange(date, this.enableOnlyDates);
          isDisable = !enableOnly;
        }

        if( isDisable ) {
          this.dates[i][j].classStr += ` disable`;
        } else {
          this.dates[i][j].classStr = classStr.replace(/ disable/ , "")
        }

      }
    }
  }

  componentWillLoad() {
    this.buildDate();

    store.onChange( "month" , ()=>{
      this.month = state.month;
      this.buildDate();
      this.updateDisableDate();
    });
    
    store.onChange( "year" , ()=>{
      this.year = state.year;
      this.buildDate();
      this.updateDisableDate();
    });

    store.onChange("disableDates", () => {
      this.disableDates = state.disableDates;
      this.updateDisableDate();
    });

    store.onChange("enableOnlyDates", () => {
      this.enableOnlyDates = state.enableOnlyDates;
      this.updateDisableDate();
    });

    store.onChange("disableByWeek", ()=> {
      this.disableByWeek = state.disableByWeek;
      this.updateDisableDate();
    });

    store.onChange("enableDates", () => {
      this.enableDates = state.enableDates;
      this.updateDisableDate();
    });
  }

  handleDateSel(date, e:any) {
    const [ el ]: [HTMLElement] = e.path;
    if(el.classList.contains("disable")) return;
    this.dateSel.emit(date);
  }

  dateInRange(date: Date, range: Date[]): Boolean {
    date = new Date(date);
    for( let currDate of range ) {
      const { startDate, endDate } = getStartEndDate(currDate);
      if( date >= startDate && date < endDate ) return true;
    }
    return false;
  }

  getStartDate(y=this.year, m=this.month) {
		let currDate =  new Date(y, m, 1, 0, 0, 0); 
    const currWeek = this.getCurrWeek(currDate);
    // TODO add plus one to set the day of the week as Monday.
    currDate.setDate(currDate.getDate() - currWeek);
		return currDate;
  }

  getCurrWeek(date: Date): number {
    let currWeek =  date.toLocaleString("en-US", {weekday:"short"});
    return this.weeks.findIndex(e=>e===currWeek);
  }

  getClassCurrMon(currMon) {
    return currMon===this.month?"currMon": "";
  }

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
            {row.map(({dateStr, date, classStr })=>(
              <div
                onClick={(e)=>this.handleDateSel(date, e)}
                class={classStr}
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
