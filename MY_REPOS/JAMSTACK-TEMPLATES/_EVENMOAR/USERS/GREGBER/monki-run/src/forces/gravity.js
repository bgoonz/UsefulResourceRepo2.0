import {Point} from 'pixi.js';
import Force from '../utils/force';

export default () => new Force(0, 20, {limit: new Point(0, 20)});
