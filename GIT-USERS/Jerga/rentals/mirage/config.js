export default function () {
  this.namespace = "/api";

  let rentals = [
    {
      type: "rentals",
      id: "grand-old-mansion",
      attributes: {
        title: "Grand Old Mansion",
        owner: "Veruca Salt",
        city: "San Francisco",
        category: "Estate",
        bedrooms: 15,
        daily_rate: 100,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "2" },
            { type: "bookings", id: "1" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
    {
      type: "rentals",
      id: "urban-living",
      attributes: {
        title: "Urban Living",
        owner: "Mike Teavee",
        city: "Seattle",
        category: "Condo",
        bedrooms: 1,
        daily_rate: 200,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "6" },
            { type: "bookings", id: "3" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
    {
      type: "rentals",
      id: "downtown-charm",
      attributes: {
        title: "Downtown Charm",
        owner: "Violet Beauregarde",
        city: "Portland",
        category: "Apartment",
        bedrooms: 3,
        daily_rate: 300,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "6" },
            { type: "bookings", id: "7" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
    {
      type: "rentals",
      id: "grand-old-mansion-new",
      attributes: {
        title: "Grand Old Mansion",
        owner: "Veruca Salt",
        city: "San Francisco",
        category: "Estate",
        bedrooms: 15,
        daily_rate: 100,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "2" },
            { type: "bookings", id: "1" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
    {
      type: "rentals",
      id: "urban-living-new",
      attributes: {
        title: "Urban Living",
        owner: "Mike Teavee",
        city: "Seattle",
        category: "Condo",
        bedrooms: 1,
        daily_rate: 200,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "6" },
            { type: "bookings", id: "3" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
    {
      type: "rentals",
      id: "downtown-charm-new",
      attributes: {
        title: "Downtown Charm",
        owner: "Violet Beauregarde",
        city: "Portland",
        category: "Apartment",
        bedrooms: 3,
        daily_rate: 300,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "6" },
            { type: "bookings", id: "7" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
    {
      type: "rentals",
      id: "downtown-charm-new-new",
      attributes: {
        title: "Downtown Charm",
        owner: "Violet Beauregarde",
        city: "Portland",
        category: "Apartment",
        bedrooms: 3,
        daily_rate: 300,
        body: "asdsahdasjhdbdahd",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
      },
      relationships: {
        bookings: {
          data: [
            { type: "bookings", id: "6" },
            { type: "bookings", id: "7" },
          ],
        },
        user: {
          data: {
            type: "users",
            id: "1",
          },
        },
      },
    },
  ];

  this.get("/rentals", function (db, request) {
    if (request.queryParams.city !== undefined) {
      let filteredRentals = rentals.filter(function (i) {
        return (
          i.attributes.city
            .toLowerCase()
            .indexOf(request.queryParams.city.toLowerCase()) !== -1
        );
      });
      return { data: filteredRentals };
    } else {
      return { data: rentals };
    }
  });

  this.get("/rentals/:id", function (db, request) {
    return { data: rentals.find((rental) => request.params.id === rental.id) };
  });

  this.post("/rentals", function (db, request) {
    debugger;
    // return { data: rentals.find((rental) => request.params.id === rental.id) };
  });
}
