import { createStore } from "@stencil/store";

const store = createStore({
  month:1,
  year: 2021,

  disableDates: []
});


export default store;
export const state = store.state;