export interface Ticket {
  id: number;
  eventId: number;
  categories: {
    title: string;
    amount: number;
    price: number;
  }[];
}
