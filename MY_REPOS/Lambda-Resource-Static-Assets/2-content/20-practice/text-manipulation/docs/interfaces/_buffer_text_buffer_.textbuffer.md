[text-manipulation](../README.md) > ["buffer/text-buffer"](../modules/_buffer_text_buffer_.md) > [TextBuffer](../interfaces/_buffer_text_buffer_.textbuffer.md)

# Interface: TextBuffer

## Hierarchy

**TextBuffer**

## Implemented by

* [BasicTextBuffer](../classes/_buffer_basic_text_buffer_.basictextbuffer.md)

## Index

### Methods

* [charAt](_buffer_text_buffer_.textbuffer.md#charat)
* [columnExists](_buffer_text_buffer_.textbuffer.md#columnexists)
* [getColumnCount](_buffer_text_buffer_.textbuffer.md#getcolumncount)
* [getColumnRange](_buffer_text_buffer_.textbuffer.md#getcolumnrange)
* [getLine](_buffer_text_buffer_.textbuffer.md#getline)
* [getLineCount](_buffer_text_buffer_.textbuffer.md#getlinecount)
* [getLineRange](_buffer_text_buffer_.textbuffer.md#getlinerange)
* [getRangeText](_buffer_text_buffer_.textbuffer.md#getrangetext)
* [getText](_buffer_text_buffer_.textbuffer.md#gettext)
* [insertText](_buffer_text_buffer_.textbuffer.md#inserttext)
* [insertTextAtLine](_buffer_text_buffer_.textbuffer.md#inserttextatline)
* [isLineEmpty](_buffer_text_buffer_.textbuffer.md#islineempty)
* [lineExists](_buffer_text_buffer_.textbuffer.md#lineexists)
* [removeColumn](_buffer_text_buffer_.textbuffer.md#removecolumn)
* [removeColumnRange](_buffer_text_buffer_.textbuffer.md#removecolumnrange)
* [removeFirstLine](_buffer_text_buffer_.textbuffer.md#removefirstline)
* [removeLastLine](_buffer_text_buffer_.textbuffer.md#removelastline)
* [removeLine](_buffer_text_buffer_.textbuffer.md#removeline)
* [removeLineRange](_buffer_text_buffer_.textbuffer.md#removelinerange)
* [replaceRange](_buffer_text_buffer_.textbuffer.md#replacerange)

---

## Methods

<a id="charat"></a>

###  charAt

▸ **charAt**(column: *`number`*, line: *`number`*): `string`

Read the character at the given line and column

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  - |
| line | `number` |  - |

**Returns:** `string`

___
<a id="columnexists"></a>

###  columnExists

▸ **columnExists**(column: *`number`*, line: *`number`*): `boolean`

Check if the column in the line exists, in the text buffer

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  - |
| line | `number` |  - |

**Returns:** `boolean`

___
<a id="getcolumncount"></a>

###  getColumnCount

▸ **getColumnCount**(line: *`number`*): `number`

Count the number of columns in the line

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |  - |

**Returns:** `number`

___
<a id="getcolumnrange"></a>

###  getColumnRange

▸ **getColumnRange**(columnStart: *`number`*, columnEnd: *`number`*, line: *`number`*): `string`

Get text between columnStart and up to but not including columnEnd

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| columnStart | `number` |  - |
| columnEnd | `number` |  - |
| line | `number` |  - |

**Returns:** `string`

___
<a id="getline"></a>

###  getLine

▸ **getLine**(line: *`number`*): `string`

Get the string of an entire line

(Lines are zero indexed)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |  - |

**Returns:** `string`

___
<a id="getlinecount"></a>

###  getLineCount

▸ **getLineCount**(): `number`

The number of lines in the buffer

**Returns:** `number`

___
<a id="getlinerange"></a>

###  getLineRange

▸ **getLineRange**(lineStart: *`number`*, lineEnd: *`number`*): `string`

Get all the lines within the inclusive line range

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| lineStart | `number` |  - |
| lineEnd | `number` |  - |

**Returns:** `string`

___
<a id="getrangetext"></a>

###  getRangeText

▸ **getRangeText**(range: *[TextRange](_buffer_text_range_.textrange.md)*): `string`

Get the text within a specified range

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| range | [TextRange](_buffer_text_range_.textrange.md) |  - |

**Returns:** `string`

___
<a id="gettext"></a>

###  getText

▸ **getText**(): `string`

The string representation of the buffer

**Returns:** `string`

___
<a id="inserttext"></a>

###  insertText

▸ **insertText**(column: *`number`*, line: *`number`*, text: *`string`*): `void`

Insert text at the specified column and line

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  - |
| line | `number` |  - |
| text | `string` |   |

**Returns:** `void`

___
<a id="inserttextatline"></a>

###  insertTextAtLine

▸ **insertTextAtLine**(line: *`number`*, textLine: *`string`*): `void`

Insert a new text line before the specified line

(Lines are zero indexed)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |  - |
| textLine | `string` |   |

**Returns:** `void`

___
<a id="islineempty"></a>

###  isLineEmpty

▸ **isLineEmpty**(line: *`number`*): `boolean`

Checks a if a specified line is empty

(Lines are zero indexed)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |  - |

**Returns:** `boolean`

___
<a id="lineexists"></a>

###  lineExists

▸ **lineExists**(line: *`number`*): `boolean`

Check if a line exists

(Lines are zero indexed)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |  - |

**Returns:** `boolean`

___
<a id="removecolumn"></a>

###  removeColumn

▸ **removeColumn**(column: *`number`*, line: *`number`*): `void`

Remove a column

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| column | `number` |  - |
| line | `number` |   |

**Returns:** `void`

___
<a id="removecolumnrange"></a>

###  removeColumnRange

▸ **removeColumnRange**(columnStart: *`number`*, columnEnd: *`number`*, line: *`number`*): `void`

Remove the text between columnStart and up to but not including columnEnd

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| columnStart | `number` |  - |
| columnEnd | `number` |  - |
| line | `number` |   |

**Returns:** `void`

___
<a id="removefirstline"></a>

###  removeFirstLine

▸ **removeFirstLine**(): `void`

Remove the first line

**Returns:** `void`

___
<a id="removelastline"></a>

###  removeLastLine

▸ **removeLastLine**(): `void`

Remove the last line

**Returns:** `void`

___
<a id="removeline"></a>

###  removeLine

▸ **removeLine**(line: *`number`*): `void`

Remove the specified line number

(Lines are zero indexed)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| line | `number` |   |

**Returns:** `void`

___
<a id="removelinerange"></a>

###  removeLineRange

▸ **removeLineRange**(lineStart: *`number`*, lineEnd: *`number`*): `void`

Remove the lines between lineStart and lineEnd The range between lineStart and lineEnd is inclusive.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| lineStart | `number` |  - |
| lineEnd | `number` |   |

**Returns:** `void`

___
<a id="replacerange"></a>

###  replaceRange

▸ **replaceRange**(textRange: *[TextRange](_buffer_text_range_.textrange.md)*, text: *`string`*):  [TextRange](_buffer_text_range_.textrange.md) &#124; `undefined`

Replaces the provided text range, with the given text string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| textRange | [TextRange](_buffer_text_range_.textrange.md) |  - |
| text | `string` |  - |

**Returns:**  [TextRange](_buffer_text_range_.textrange.md) &#124; `undefined`

___

