import { EventItem } from '../types/eventItem';

function filterByQuery(title: string, query: string) {
  if (!query) return true;

  return title?.toLowerCase().includes(query?.toLowerCase() || '') || false;
}

function filterByDate(currDate: string, dateFrom: string, dateTo: string) {
  if (!dateFrom && !dateTo) return true;

  const eventTime = new Date(currDate).getTime();
  const timeFrom = new Date(dateFrom).getTime();
  const timeTo = new Date(dateTo).getTime();

  if (dateFrom && !dateTo) {
    return eventTime >= timeFrom;
  } else if (!dateFrom && dateTo) {
    return eventTime <= timeTo;
  } else {
    return eventTime >= timeFrom && eventTime <= timeTo;
  }
}

export function filterItems(
  items: EventItem[],
  query: string,
  dateFrom: string,
  dateTo: string,
): EventItem[] {
  const result = items.filter((item) => {
    return (
      filterByQuery(item.title, query) &&
      filterByDate(item.date, dateFrom, dateTo)
    );
  });

  return result;
}
