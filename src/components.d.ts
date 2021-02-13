/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ArrayOfDates } from "./components/date-body/dateTypes";
export namespace Components {
    interface DateBody {
        "dates": ArrayOfDates;
    }
    interface DateHead {
    }
    interface DatePicker {
        "disableByWeek": string;
        "disableDates": string;
        "enableDates": string;
        "height": number;
        "show": "true"|"false";
        "width": number;
    }
}
declare global {
    interface HTMLDateBodyElement extends Components.DateBody, HTMLStencilElement {
    }
    var HTMLDateBodyElement: {
        prototype: HTMLDateBodyElement;
        new (): HTMLDateBodyElement;
    };
    interface HTMLDateHeadElement extends Components.DateHead, HTMLStencilElement {
    }
    var HTMLDateHeadElement: {
        prototype: HTMLDateHeadElement;
        new (): HTMLDateHeadElement;
    };
    interface HTMLDatePickerElement extends Components.DatePicker, HTMLStencilElement {
    }
    var HTMLDatePickerElement: {
        prototype: HTMLDatePickerElement;
        new (): HTMLDatePickerElement;
    };
    interface HTMLElementTagNameMap {
        "date-body": HTMLDateBodyElement;
        "date-head": HTMLDateHeadElement;
        "date-picker": HTMLDatePickerElement;
    }
}
declare namespace LocalJSX {
    interface DateBody {
        "dates"?: ArrayOfDates;
        "onDateSel"?: (event: CustomEvent<Date>) => void;
    }
    interface DateHead {
    }
    interface DatePicker {
        "disableByWeek"?: string;
        "disableDates"?: string;
        "enableDates"?: string;
        "height"?: number;
        "onReady"?: (event: CustomEvent<true>) => void;
        "show"?: "true"|"false";
        "width"?: number;
    }
    interface IntrinsicElements {
        "date-body": DateBody;
        "date-head": DateHead;
        "date-picker": DatePicker;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "date-body": LocalJSX.DateBody & JSXBase.HTMLAttributes<HTMLDateBodyElement>;
            "date-head": LocalJSX.DateHead & JSXBase.HTMLAttributes<HTMLDateHeadElement>;
            "date-picker": LocalJSX.DatePicker & JSXBase.HTMLAttributes<HTMLDatePickerElement>;
        }
    }
}
