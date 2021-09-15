export class CImage {
  _id: string;
  url: string;
  cloudinaryId: string;
}

export class Rental {
  static readonly CATEGORIES = ["apartment", "house", "condo"];

  _id: string; // unique identifier as it will be stored in DB
  title: string; // Some nice place in LA
  city: string; // Los Angeles
  street: string; // Main Street
  category: string; // apartment
  image = new CImage();
  numOfRooms: number; // 5
  description: string; // Some nice place near a beach.
  dailyPrice: number; // 127
  shared: boolean; // true || false
  createdAt: string; // 23/12/2020 11:11:11
}
