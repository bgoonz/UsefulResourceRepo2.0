// This snippet file was generated by processing the source file:
// ./remoteconfig-next/index.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START rc_get_values_modular]
import { getValue } from "firebase/remote-config";

const val = getValue(remoteConfig, "welcome_messsage");
// [END rc_get_values_modular]