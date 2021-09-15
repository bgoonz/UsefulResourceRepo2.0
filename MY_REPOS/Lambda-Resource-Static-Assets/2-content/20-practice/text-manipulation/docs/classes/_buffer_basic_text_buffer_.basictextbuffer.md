[text-manipulation](../README.md) > ["buffer/basic-text-buffer"](../modules/_buffer_basic_text_buffer_.md) > [BasicTextBuffer](../classes/_buffer_basic_text_buffer_.basictextbuffer.md)

# Class: BasicTextBuffer

## Hierarchy

**BasicTextBuffer**

## Implements

* [TextBuffer](../interfaces/_buffer_text_buffer_.textbuffer.md)

## Index

### Constructors

* [constructor](_buffer_basic_text_buffer_.basictextbuffer.md#constructor)

### Properties

* [lineDelimiter](_buffer_basic_text_buffer_.basictextbuffer.md#linedelimiter)
* [originalText](_buffer_basic_text_buffer_.basictextbuffer.md#originaltext)
* [table](_buffer_basic_text_buffer_.basictextbuffer.md#table)

### Methods

* [buildTable](_buffer_basic_text_buffer_.basictextbuffer.md#buildtable)
* [charAt](_buffer_basic_text_buffer_.basictextbuffer.md#charat)
* [columnExists](_buffer_basic_text_buffer_.basictextbuffer.md#columnexists)
* [getColumnCount](_buffer_basic_text_buffer_.basictextbuffer.md#getcolumncount)
* [getColumnRange](_buffer_basic_text_buffer_.basictextbuffer.md#getcolumnrange)
* [getLine](_buffer_basic_text_buffer_.basictextbuffer.md#getline)
* [getLineCount](_buffer_basic_text_buffer_.basictextbuffer.md#getlinecount)
* [getLineRange](_buffer_basic_text_buffer_.basictextbuffer.md#getlinerange)
* [getRangeText](_buffer_basic_text_buffer_.basictextbuffer.md#getrangetext)
* [getText](_buffer_basic_text_buffer_.basictextbuffer.md#gettext)
* [init](_buffer_basic_text_buffer_.basictextbuffer.md#init)
* [insertText](_buffer_basic_text_buffer_.basictextbuffer.md#inserttext)
* [insertTextAtLine](_buffer_basic_text_buffer_.basictextbuffer.md#inserttextatline)
* [isLineEmpty](_buffer_basic_text_buffer_.basictextbuffer.md#islineempty)
* [lineExists](_buffer_basic_text_buffer_.basictextbuffer.md#lineexists)
* [removeColumn](_buffer_basic_text_buffer_.basictextbuffer.md#removecolumn)
* [removeColumnRange](_buffer_basic_text_buffer_.basictextbuffer.md#removecolumnrange)
* [removeFirstLine](_buffer_basic_text_buffer_.basictextbuffer.md#removefirstline)
* [removeLastLine](_buffer_basic_text_buffer_.basictextbuffer.md#removelastline)
* [removeLine](_buffer_basic_text_buffer_.basictextbuffer.md#removeline)
* [removeLineRange](_buffer_basic_text_buffer_.basictextbuffer.md#removelinerange)
* [removeRange](_buffer_basic_text_buffer_.basictextbuffer.md#removerange)
* [replaceRange](_buffer_basic_text_buffer_.basictextbuffer.md#replacerange)
* [replaceTextInLine](_buffer_basic_text_buffer_.basictextbuffer.md#replacetextinline)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BasicTextBuffer**(originalText: *`string`*, lineDelimiter?: *`string`*): [BasicTextBuffer](_buffer_basic_text_buffer_.basictextbuffer.md)

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| originalText | `string` | - |
| `Default value` lineDelimiter | `string` | &quot;&quot; |

**Returns:** [BasicTextBuffer](_buffer_basic_text_buffer_.basictextbuffer.md)

___

## Properties

<a id="linedelimiter"></a>

### `<Private>` lineDelimiter

**● lineDelimiter**: *`string`*

___
<a id="originaltext"></a>

### `<Private>` originalText

**● originalText**: *`string`*

___
<a id="table"></a>

### `<Private>` table

**● table**: *`string`[][]*

___

## Methods

<a id="buildtable"></a>

### `<Private>` buildTable

▸ **buildTable**(text: *`string`*, lineDelimiter: *`string`*): `string`[][]

**Parameters:**

| Param | Type |
| ------ | ------ |
| text | `string` |
| lineDelimiter | `string` |

**Returns:** `string`[][]

___
<a id="charat"></a>

###  charAt

▸ **charAt**(column: *`number`*, line: *`number`*):  `string` &#124; `undefined`

**Parameters:**

| Param | Type |
| ------ | ------ |
| column | `number` |
| line | `number` |

**Returns:**  `string` &#124; `undefined`

___
<a id="columnexists"></a>

###  columnExists

▸ **columnExists**(column: *`number`*, line: *`number`*): `boolean`

**Parameters:**

| Param | Type |
| ------ | ------ |
| column | `number` |
| line | `number` |

**Returns:** `boolean`

___
<a id="getcolumncount"></a>

###  getColumnCount

▸ **getColumnCount**(line: *`number`*): `number`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |

**Returns:** `number`

___
<a id="getcolumnrange"></a>

###  getColumnRange

▸ **getColumnRange**(columnStart: *`number`*, columnEnd: *`number`*, line: *`number`*): `string`

**Parameters:**

| Param | Type |
| ------ | ------ |
| columnStart | `number` |
| columnEnd | `number` |
| line | `number` |

**Returns:** `string`

___
<a id="getline"></a>

###  getLine

▸ **getLine**(line: *`number`*): `string`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |

**Returns:** `string`

___
<a id="getlinecount"></a>

###  getLineCount

▸ **getLineCount**(): `number`

**Returns:** `number`

___
<a id="getlinerange"></a>

###  getLineRange

▸ **getLineRange**(lineStart: *`number`*, lineEnd: *`number`*): `string`

**Parameters:**

| Param | Type |
| ------ | ------ |
| lineStart | `number` |
| lineEnd | `number` |

**Returns:** `string`

___
<a id="getrangetext"></a>

###  getRangeText

▸ **getRangeText**(range: *[TextRange](../interfaces/_buffer_text_range_.textrange.md)*): `string`

**Parameters:**

| Param | Type |
| ------ | ------ |
| range | [TextRange](../interfaces/_buffer_text_range_.textrange.md) |

**Returns:** `string`

___
<a id="gettext"></a>

###  getText

▸ **getText**(): `string`

**Returns:** `string`

___
<a id="init"></a>

### `<Private>` init

▸ **init**(): `void`

**Returns:** `void`

___
<a id="inserttext"></a>

###  insertText

▸ **insertText**(column: *`number`*, line: *`number`*, text: *`string`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| column | `number` |
| line | `number` |
| text | `string` |

**Returns:** `void`

___
<a id="inserttextatline"></a>

###  insertTextAtLine

▸ **insertTextAtLine**(line: *`number`*, text: *`string`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |
| text | `string` |

**Returns:** `void`

___
<a id="islineempty"></a>

###  isLineEmpty

▸ **isLineEmpty**(line: *`number`*): `boolean`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |

**Returns:** `boolean`

___
<a id="lineexists"></a>

###  lineExists

▸ **lineExists**(line: *`number`*): `boolean`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |

**Returns:** `boolean`

___
<a id="removecolumn"></a>

###  removeColumn

▸ **removeColumn**(column: *`number`*, line: *`number`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| column | `number` |
| line | `number` |

**Returns:** `void`

___
<a id="removecolumnrange"></a>

###  removeColumnRange

▸ **removeColumnRange**(columnStart: *`number`*, columnEnd: *`number`*, line: *`number`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| columnStart | `number` |
| columnEnd | `number` |
| line | `number` |

**Returns:** `void`

___
<a id="removefirstline"></a>

###  removeFirstLine

▸ **removeFirstLine**(): `void`

**Returns:** `void`

___
<a id="removelastline"></a>

###  removeLastLine

▸ **removeLastLine**(): `void`

**Returns:** `void`

___
<a id="removeline"></a>

###  removeLine

▸ **removeLine**(line: *`number`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |

**Returns:** `void`

___
<a id="removelinerange"></a>

###  removeLineRange

▸ **removeLineRange**(lineStart: *`number`*, lineEnd: *`number`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| lineStart | `number` |
| lineEnd | `number` |

**Returns:** `void`

___
<a id="removerange"></a>

###  removeRange

▸ **removeRange**(range: *[TextRange](../interfaces/_buffer_text_range_.textrange.md)*): [TextPosition](_buffer_text_position_.textposition.md)

**Parameters:**

| Param | Type |
| ------ | ------ |
| range | [TextRange](../interfaces/_buffer_text_range_.textrange.md) |

**Returns:** [TextPosition](_buffer_text_position_.textposition.md)

___
<a id="replacerange"></a>

###  replaceRange

▸ **replaceRange**(range: *[TextRange](../interfaces/_buffer_text_range_.textrange.md)*, text: *`string`*):  [TextRange](../interfaces/_buffer_text_range_.textrange.md) &#124; `undefined`

**Parameters:**

| Param | Type |
| ------ | ------ |
| range | [TextRange](../interfaces/_buffer_text_range_.textrange.md) |
| text | `string` |

**Returns:**  [TextRange](../interfaces/_buffer_text_range_.textrange.md) &#124; `undefined`

___
<a id="replacetextinline"></a>

###  replaceTextInLine

▸ **replaceTextInLine**(line: *`number`*, lineText: *`string`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| line | `number` |
| lineText | `string` |

**Returns:** `void`

___

