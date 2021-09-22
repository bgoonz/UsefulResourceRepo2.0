// This snippet file was generated by processing the source file:
// ./functions-next/emulator-suite.js
//
// To make edits to the snippets in this file, please edit the source

// [START fb_functions_callable_call_modular]
import { getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(getApp());
const addMessage = httpsCallable(functions, "addMessage");

const result = await addMessage({ text: "<message text>" });
/** @type {any} */
const data = result.data;
const sanitizedMessage = data.text;
// ...
// [END fb_functions_callable_call_modular]
