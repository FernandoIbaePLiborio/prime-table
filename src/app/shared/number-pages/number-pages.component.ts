import { NumberPages } from './number-pages.model';
import { Component, OnInit, Input, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DataTable, LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'pri-number-pages',
  templateUrl: './number-pages.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> NumberPagesComponent),
      multi: true
    }
  ]
})
export class NumberPagesComponent implements OnInit, ControlValueAccessor {

  @Input() options: NumberPages[]
  value: any
  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    console.log(value);
    this.value = value
    this.onChange(this.value)
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void{
    this.value = obj
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void{
    this.onChange = fn
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void{}
  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void{}

}
