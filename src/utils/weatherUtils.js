import { addDays, isAfter, startOfDay } from "date-fns";

export const filterDataStartingFrom6AM = (list, intervals) => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    6,
    0,
    0
  );
  let filteredList = [];
  list.forEach((entry) => {
    const entryTime = new Date(entry.dt_txt);
    if (entryTime >= startOfToday) {
      filteredList.push(entry);
    }
  });
  if (intervals == 3) {
    return filteredList.slice(0, intervals);
  }

  return filteredList;
};

export const getFilteredData = (list) => {
  const now = new Date();
  const startDate = startOfDay(now);
  const endOfPeriod = addDays(startDate, 6);

  return (
    list?.filter((entry) => {
      const entryDate = new Date(entry.dt * 1000);
      return isAfter(entryDate, now) && entryDate <= endOfPeriod;
    }) ?? []
  );
};

export const getUniqueDates = (list) => {
  return [
    ...new Set(
      list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])
    ),
  ];
};
