
export function repeatLoop(len:number=10): number[] {
  return Array.apply(null, { length: len })
}

export function getRange(start=0, end=0) {
  return [...new Array(end-start+1)].map((_,i)=>i+start);
}
