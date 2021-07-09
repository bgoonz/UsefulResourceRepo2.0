/* @flow */

export default class Element {
    _parentElement: Element;

    get ownerProgram(): Program {
        let element = this;
        while (element && !element._isProgram) {
            element = element._parentElement;
        }
        return element;
    }
}

export default class Program extends Element {

}
// export default class Program extends Statement {
// export default class Statement extends Node {
// export default class Node extends Element {

 // 11:         return element;
 //                    ^^^^^^^ Element. This type is incompatible with
 //  6:     get ownerProgram(): Program {
 //                             ^^^^^^^ Program
