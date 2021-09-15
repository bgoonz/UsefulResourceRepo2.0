import { Component, Input, Output, EventEmitter } from "@angular/core";

export class EditableComponent {
  @Output("entityUpdated") entityUpdated = new EventEmitter();

  @Input("entity") entity: any;
  @Input("className") className: string;
  @Input("type") type = "text";
  @Input("inline") inline = false;

  entityField: string;
  originEntityValue: any;
  isActiveInput = false;

  @Input("transformView") transformView = (value) => value;
  @Input("field") set field(entityField: string) {
    this.entityField = entityField;
    this.setOriginValue();
  }

  updateEntity() {
    if (this.entityValue !== this.originEntityValue) {
      this.entityUpdated.emit({
        data: { [this.entityField]: this.entityValue },
        notifier: this.inputNotifier,
      });
    }
  }

  inputNotifier = (error: any) => {
    if (error) {
      this.cancelUpdate();
      return;
    }

    this.setOriginValue();
    this.isActiveInput = false;
  };

  cancelUpdate() {
    this.entityValue = this.originEntityValue;
    this.isActiveInput = false;
  }

  private setOriginValue() {
    this.originEntityValue = this.entityValue;
  }

  protected set entityValue(value: any) {
    this.entity[this.entityField] = value;
  }

  protected get entityValue() {
    return this.entity[this.entityField];
  }
}
