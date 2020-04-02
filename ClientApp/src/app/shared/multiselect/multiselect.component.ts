import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectorRef, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EqualPipe } from '../pipes/equal.pipe';

import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'multiselect',
  templateUrl: 'multiselect.component.html',
  styleUrls: ['multiselect.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '(change)': 'manualChange($event)', '(document:click)': 'hostClick($event)' },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectComponent),
    multi: true
  }]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {
  public _items: Array<any>;
  public _selectedItems: Array<any>;
  public localHeader: string;
  public isOpen: Boolean = false;
  public enableFilter: Boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  @Input() items: Observable<any[]>;
  @Input() header = 'Select an option';
  @Input() selectedHeader = 'options selected';
  @Output() createItem: EventEmitter<string> = new EventEmitter<string>();

  // ControlValueAccessor Interface and mutator
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(private _elRef: ElementRef,
    private _renderer: Renderer2,
    private _equalPipe: EqualPipe,
    private _changeDetectorRef: ChangeDetectorRef) {
  }

  get selected(): any {
    return this._selectedItems;
  }

  addItem(value: string) {
    this.createItem.emit(value);
  }

  writeValue(value: any) {
    console.log('writing value ' + value);
    if (value !== undefined) {
      this._selectedItems = value;
    } else {
      this._selectedItems = [];
    }
  }

  setHeaderText() {
    this.localHeader = this.header;
    const isArray = this._selectedItems instanceof Array;
    if (isArray && this._selectedItems.length > 1) {
      this.localHeader = this._selectedItems.length + ' ' + this.selectedHeader;
    } else if (isArray && this._selectedItems.length === 1) {
      this.localHeader = this._selectedItems[0].label;
    }
    console.log('Set header text ' + this.localHeader);
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; console.log(fn); }
  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elRef.nativeElement, 'disabled', isDisabled);
  }

  manualChange() {
    this._onChange(this._selectedItems);
  }

  select(item: any) {
    item.checked = !item.checked;
    this._selectedItems = this._equalPipe.transform(this._items, { checked: true });
    this.setHeaderText();
    this._onChange(this._selectedItems);
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  clearFilter() {
    this.filterText = '';
  }

  hostClick(event) {
    if (this.isOpen && !this._elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnInit() {
    this.enableFilter = true;
    this.filterText = '';
    this.filterPlaceholder = 'Filter..';
    this._selectedItems = this._equalPipe.transform(this._items, { checked: true });
    this.setHeaderText();

    this.filterInput
      .valueChanges
      .subscribe(term => {
        this.filterText = term;
        this._changeDetectorRef.markForCheck();
        console.log(term);
      });
  }
}
