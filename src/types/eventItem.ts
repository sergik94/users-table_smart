export interface EventItem {
  id: number;
  title: string;
  posterURL: string;
  description: string;
  date: string;
  availableTickets?: number;
  eventType: string;
  location: string;
  [key: string]: string | number | undefined;
}
