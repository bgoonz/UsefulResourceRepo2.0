import { writable } from 'svelte/store';

const date = new Date();
const dateTime = `${new Intl.DateTimeFormat('en-ca').format(
  date
)}T${date.toLocaleTimeString('de-de', { hour: '2-digit', minute: '2-digit' })}`;

export const boardingCard = writable({
  guest: 'Peter Parker',
  host: 'Tony Stark',
  occasion: '50th Birthday',
  location: `123 Main Street
New York
NY 10030`,
  phone: '11 972393003',
  directions: '500m after the chapel',
  dateTime,
});
