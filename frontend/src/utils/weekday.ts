const DAYS_IN_MONTH = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let DAYS_BEFORE_MONTH = [-1]
let dbm = 0
for (let i = 1; i < DAYS_IN_MONTH.length; i++) {
  DAYS_BEFORE_MONTH.push(dbm)
  dbm += DAYS_IN_MONTH[i]
}

function isLeap(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

function daysBeforeYear(year: number): number {
  const y = year - 1
  return y*365 + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400)
}

function daysBeforeMonth(year: number, month: number): number {
  const additionalDay = (month > 2 && isLeap(year)) ? 1 : 0
  return DAYS_BEFORE_MONTH[month] + additionalDay
}

export function getWeekday(year: number, month: number, day: number): number {
  return (daysBeforeYear(year) + daysBeforeMonth(year, month) + day) % 7
}
