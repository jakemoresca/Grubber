/// <reference path="../../../../scripts/typings/google.maps.d.ts" />

import {Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter} from 'angular2/core';

declare var $: any;

@Directive({
    selector: '[bootstrap-datepicker]'
})
export class BootstrapDatePicker implements AfterViewInit
{
    private _input: any;
    private _datePicker: any;

    constructor(el: ElementRef)
    {
        this._input = el.nativeElement;
    }

    ngAfterViewInit()
    {
        $(this._input).datepicker();
    }
}