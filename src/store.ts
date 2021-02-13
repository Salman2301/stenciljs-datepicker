import { createStore } from "@stencil/store";

interface storeType {
  month: number;
  year: number;
  disableDates: Date[];
  enableOnlyDates: Date[];
  disableByWeek: number[];
  enableDates: Date[];
}

const storeObj: storeType = {
  month:1,
  year: 2021,

  disableDates: [],
  enableOnlyDates: [],
  disableByWeek: [],
  enableDates: []
}

const store = createStore(storeObj);


export default store;
export const state = store.state;