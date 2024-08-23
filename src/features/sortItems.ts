import { EventItem } from '../types/eventItem';

export function sortItems(items: EventItem[], sortBy: string): EventItem[] {
  const copyArr = [...items];

  if (sortBy) {
    copyArr.sort((item1, item2) => {
      switch (sortBy) {
        case 'title': {
          const prop1 = item1[sortBy].toLowerCase() as string;
          const prop2 = item2[sortBy].toLowerCase() as string;

          return prop1.localeCompare(prop2);
        }

        case 'date': {
          const prop1 = new Date(item1.date).getTime();
          const prop2 = new Date(item2.date).getTime();

          return prop2 - prop1;
        }

        default:
          return 0;
      }
    });
  }

  return copyArr;
}
