// This snippet file was generated by processing the source file:
// ./analytics-next/index.js
//
// To make edits to the snippets in this file, please edit the source

// [START analytics_log_event_modular]
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();
logEvent(analytics, "notification_received");
// [END analytics_log_event_modular]
