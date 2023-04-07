export function getNewDateObj(newDate) {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = newDate.getDay();
  
    return { year, month, date, day };
}
