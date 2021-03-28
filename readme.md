# Datepicker built using stenciljs

# Todo:
- [ ] Build a Decade and Year selector
- [ ] Support Langs
- [ ] Support timezone

- [ ] Can change the start day from Sun to Mon
- [x] Disable, Enable
- [x] Enable Only Date ( Disable the rest of the date)
- [x] Disable by Weeks

- [ ] Select Timer
- [ ] Disable, Enable

- [ ] Customize theme/style
- [ ] Use Position Absolute ( Do to push the Adjacent element)
- [ ] Popup Up / Down depends on the screen.

- [ ] Support Custom Langs

# Planning to rebuild using sveltejs
1. The Output Bundle size is too Big for Wix
2. Need to use babel in Production? Can't find better solution without using Babel but i believe there should be one
3. Need to use `state` for each component cause using State from a `store.ts` works in dev mode but not in Wix site for some reason.
4. Using `state` for each component trigger reload the component multiple times during the `onMount` stage.
