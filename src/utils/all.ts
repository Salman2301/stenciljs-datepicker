
export function repeatLoop(len:number=10): number[]
{
  return Array.apply(null, { length: len })
}

export function getRange(start:number=0, end:number=0): number[]
{
  return [...new Array(end-start+1)].map((_,i)=>i+start);
}

export function getStartEndDate(date:Date): {startDate:Date, endDate:Date } {
  date.setHours(0, 0, 0, 0);
  const startDate = new Date( date );

  date.setHours(23, 59, 59, 999);
  const endDate = date;
  
  return { startDate, endDate }
}
