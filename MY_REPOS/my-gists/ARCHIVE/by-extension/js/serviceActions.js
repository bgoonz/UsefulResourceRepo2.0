import { FETCH_SERVICES } from "../actionTypes";

const services = [
  {
    id: "2asd8sa7d98",
    user: "some_id_1",
    category: "mathematics",
    title: "I will teach you math fast!",
    description:
      "I am teaching highschool mathematics, algebra, triogometry. I can teach you anything!",
    price: 10, //per hour
    image:
      "https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "ssa9d789as7",
    user: "some_id_2",
    category: "programming",
    title: "I will teach you Programming fast!",
    description: "I am teaching C++, C#, JS ...",
    price: 10, //per hour
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  },
];

export const fetchServices = () => {
  return {
    type: FETCH_SERVICES,
    services,
  };
};
