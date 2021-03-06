// This snippet file was generated by processing the source file:
// ./analytics-next/ecommerce.js
//
// To make edits to the snippets in this file, please edit the source

// [START analytics_ecommerce_payment_info_modular]
import { getAnalytics, logEvent } from "firebase/analytics";

// Prepare ecommerce params
const params9 = {
  currency: "USD",
  value: 14.98, // Total Revenue
  coupon: "SUMMER_FUN",
  payment_type: "Visa",
  items: [item_jeggings],
};

// Log event
const analytics = getAnalytics();
logEvent(analytics, "add_payment_info", params9);
// [END analytics_ecommerce_payment_info_modular]
