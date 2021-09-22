// This snippet file was generated by processing the source file:
// ./analytics-next/ecommerce.js
//
// To make edits to the snippets in this file, please edit the source

// [START analytics_ecommerce_checkout_modular]
import { getAnalytics, logEvent } from "firebase/analytics";

// Prepare ecommerce params
const params7 = {
  currency: "USD",
  value: 14.98, // Total Revenue
  coupon: "SUMMER_FUN",
  items: [item_jeggings],
};

// Log event
const analytics = getAnalytics();
logEvent(analytics, "begin_checkout", params7);
// [END analytics_ecommerce_checkout_modular]
