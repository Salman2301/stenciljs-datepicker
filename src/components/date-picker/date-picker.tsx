import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import store, { state } from '../../store';


@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})

export class DatePicker {
  @Event() ready: EventEmitter<true>;

  @Prop() disableDates: string = "";
  @Prop() show: "true"|"false" = "true";
  @Prop() width: number = 300;
  @Prop() height: number = 355;


  getStyleContainer() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
      display: `${this.show === "true"? "block":"none"}`,
      position: "absolute"
    }
  }

  componentDidLoad() {
    store.set("disableDates", this.formatToDate(this.disableDates) );
    this.ready.emit(true);
  }

  formatToDate(JSONString: string) {
    try {
      let arr = JSON.parse(JSONString);
      arr = arr.map(e=>new Date(e) );
      return arr;
    }
    catch(e) {
      console.error("failed to parse JSON")
    }

  }

  render() {
    return <div class="container"
     style={this.getStyleContainer()}
    >
      <date-head></date-head>
      <date-body></date-body>
    </div>;
  }
}
