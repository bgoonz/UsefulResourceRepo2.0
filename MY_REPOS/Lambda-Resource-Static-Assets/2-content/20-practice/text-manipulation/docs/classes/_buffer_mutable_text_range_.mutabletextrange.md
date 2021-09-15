[text-manipulation](../README.md) > ["buffer/mutable-text-range"](../modules/_buffer_mutable_text_range_.md) > [MutableTextRange](../classes/_buffer_mutable_text_range_.mutabletextrange.md)

# Class: MutableTextRange

## Hierarchy

**MutableTextRange**

## Implements

* [TextRange](../interfaces/_buffer_text_range_.textrange.md)

## Index

### Constructors

* [constructor](_buffer_mutable_text_range_.mutabletextrange.md#constructor)

### Properties

* [end](_buffer_mutable_text_range_.mutabletextrange.md#end)
* [start](_buffer_mutable_text_range_.mutabletextrange.md#start)
* [textBuffer](_buffer_mutable_text_range_.mutabletextrange.md#textbuffer)

### Methods

* [exists](_buffer_mutable_text_range_.mutabletextrange.md#exists)
* [getText](_buffer_mutable_text_range_.mutabletextrange.md#gettext)
* [setText](_buffer_mutable_text_range_.mutabletextrange.md#settext)
* [sort](_buffer_mutable_text_range_.mutabletextrange.md#sort)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MutableTextRange**(interval: *[[TextPosition](_buffer_text_position_.textposition.md), [TextPosition](_buffer_text_position_.textposition.md)]*, textBuffer: *[TextBuffer](../interfaces/_buffer_text_buffer_.textbuffer.md)*): [MutableTextRange](_buffer_mutable_text_range_.mutabletextrange.md)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| interval | [[TextPosition](_buffer_text_position_.textposition.md), [TextPosition](_buffer_text_position_.textposition.md)] |  - |
| textBuffer | [TextBuffer](../interfaces/_buffer_text_buffer_.textbuffer.md) |   |

**Returns:** [MutableTextRange](_buffer_mutable_text_range_.mutabletextrange.md)

___

## Properties

<a id="end"></a>

###  end

**● end**: *[TextPosition](_buffer_text_position_.textposition.md)*

___
<a id="start"></a>

###  start

**● start**: *[TextPosition](_buffer_text_position_.textposition.md)*

___
<a id="textbuffer"></a>

### `<Private>` textBuffer

**● textBuffer**: *[TextBuffer](../interfaces/_buffer_text_buffer_.textbuffer.md)*

___

## Methods

<a id="exists"></a>

###  exists

▸ **exists**(): `boolean`

The range from start to end exists

**Returns:** `boolean`

___
<a id="gettext"></a>

###  getText

▸ **getText**(): `string`

Get the text of the range

**Returns:** `string`

___
<a id="settext"></a>

###  setText

▸ **setText**(text: *`string`*): `void`

Change the text of the range

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| text | `string` |   |

**Returns:** `void`

___
<a id="sort"></a>

###  sort

▸ **sort**(): [MutableTextRange](_buffer_mutable_text_range_.mutabletextrange.md)

Sort the range ensuring that start is less than or equal to end start <= end

**Returns:** [MutableTextRange](_buffer_mutable_text_range_.mutabletextrange.md)

___

