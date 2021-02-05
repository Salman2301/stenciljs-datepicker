import { Component, h } from '@stencil/core';
import { state } from "../../store";
import { getRange } from "../../utils/all";

@Component({
  tag: 'date-head',
  styleUrl: 'date-head.css',
  shadow: true
})

export class DatePicker {
  
  months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

  years = getRange(1970, 2050);

  handleMonthSel(e) {
    state.month = +e.target.value;
  }

  handleYearSel(e) {
    state.year = +e.target.value + 1970;
  }

  handleDecMonth() {
    if( state.month === 0 ) {
      state.month = 11;
      if( state.year !== 1970 ) --state.year;
    } else {
      --state.month;
    }
  }
  
  handleIncMonth() {
    if( state.month === 11 ) {
      state.month = 0;
      if( state.year !== 2050 ) ++state.year;
    } else {
      ++state.month;
    }
  }

  svgArrow() {
    return <svg version="1.1" id="Capa_1" x="0px" y="0px"
      viewBox="0 0 512.002 512.002" style={{"enable-background":"new 0 0 512.002 512.002"}} >
        <g>
          <g>
            <path d="M388.425,241.951L151.609,5.79c-7.759-7.733-20.321-7.72-28.067,0.04c-7.74,7.759-7.72,20.328,0.04,28.067l222.72,222.105
              L123.574,478.106c-7.759,7.74-7.779,20.301-0.04,28.061c3.883,3.89,8.97,5.835,14.057,5.835c5.074,0,10.141-1.932,14.017-5.795
              l236.817-236.155c3.737-3.718,5.834-8.778,5.834-14.05S392.156,245.676,388.425,241.951z"
              fill="white"/>
          </g>
        </g>
    </svg>
  }

  renderMonths() {
    return <select onInput={this.handleMonthSel}>
      {this.months.map((month, index) =>
        <option value={index}
        selected={index===state.month}
        class={`${index===state.month?"drop-selected": ""}`}
        >{month}</option>
      )}
    </select>
  }

  renderYears() {
    return <select onInput={this.handleYearSel}>
      {this.years.map((year, index) => 
        <option value={index}
          selected={year===state.year}
          class={`${year===state.year?"drop-selected": ""}`}
          >
            {year}

          {!(year%10) &&<div class="decade"></div>}

          </option>
      )}
    </select>
  }


  render() {
    return <div class="head">
      <div class="prev" onClick={this.handleDecMonth}>
        {this.svgArrow()}
      </div>
      
      <div class="dropMonths">
        {this.renderMonths()}
      </div>
      <div class="dropYears">
        {this.renderYears()}
      </div>
      
      <div class="next" onClick={this.handleIncMonth}>
        {this.svgArrow()}
      </div>
    </div>
  }
}