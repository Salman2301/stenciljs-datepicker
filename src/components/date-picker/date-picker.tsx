import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';


@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})

export class DatePicker {
  @Event() ready: EventEmitter<true>;

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
    console.log({ show: !this.show })
    this.ready.emit(true);
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
