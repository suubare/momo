function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Helper function to calculate the number of non-Friday days in a month
    function getNonFridayDaysInMonth(year, month) {
      let daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month
      let count = 0;
  
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = new Date(year, month, day).getDay();
        if (currentDay !== 5) { // Exclude Fridays (Friday is day 5)
          count++;
        }
      }
      return count;
    }
  
    // Helper function to calculate working days between a given range
    function getWorkingDaysBetweenDates(start, end) {
      let count = 0;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getDay() !== 5) { // Exclude Fridays
          count++;
        }
      }
      return count;
    }
  
    let totalWorkingDays = 0;
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
  
    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
      let startMonth = (year === start.getFullYear()) ? start.getMonth() : 0;
      let endMonth = (year === end.getFullYear()) ? end.getMonth() : 11;
  
      for (let month = startMonth; month <= endMonth; month++) {
        let totalDaysInMonth = getNonFridayDaysInMonth(year, month);
        let workedDaysInMonth = 0;
  
        if (year === start.getFullYear() && month === start.getMonth()) {
          workedDaysInMonth = getWorkingDaysBetweenDates(start, new Date(year, month + 1, 0));
        } else if (year === end.getFullYear() && month === end.getMonth()) {
          workedDaysInMonth = getWorkingDaysBetweenDates(new Date(year, month, 1), end);
        } else {
          workedDaysInMonth = totalDaysInMonth;
        }
  
        daysExcludingFridays.push(totalDaysInMonth);
        daysWorkedExcludingFridays.push(workedDaysInMonth);
        totalWorkingDays += workedDaysInMonth;
      }
    }
  
    // Distribute the target proportionally
    daysWorkedExcludingFridays.forEach((daysWorked) => {
      const monthlyTarget = (daysWorked / totalWorkingDays) * totalAnnualTarget;
      monthlyTargets.push(monthlyTarget);
    });
  
    return {
      daysExcludingFridays,
      daysWorkedExcludingFridays,
      monthlyTargets,
      totalTarget: totalAnnualTarget
    };
  }
  
  // Example usage:
  console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));