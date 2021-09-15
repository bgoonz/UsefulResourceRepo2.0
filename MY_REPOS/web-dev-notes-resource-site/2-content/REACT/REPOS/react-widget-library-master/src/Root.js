import { findByPlaceholderText } from '@testing-library/react';
import React from 'react';
import Clock from "./Clock";
import Folder from "./Folder";


const folders = [
  {title: 'one', content: 'I am the first'},
  {title: 'two', content: 'Second folder here'},
  {title: 'three', content: 'Third folder here'}
];
const Root = () => (
  <div>
      <Clock />
      <Folder folders={folders}  />
  </div>
);
export default Root;
