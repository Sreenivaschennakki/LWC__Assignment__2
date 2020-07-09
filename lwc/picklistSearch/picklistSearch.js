import { LightningElement, wire, api } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import TYPE_FIELD from "@salesforce/schema/Account.Type";
import getAccountRecordTypeId from "@salesforce/apex/parentSearchController.getAccountRecordTypeId";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class PicklistSearch extends LightningElement {
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  objectInfo;
  @wire(getAccountRecordTypeId) accountRecordType;

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: TYPE_FIELD
  })
  picklistValues;

  @api selectedFieldType;
  constructor() {
    super();
  }
  connectedCallback() {}

  handleChange(event) {
    this.selectedFieldType = event.target.value;
  }

  handleClick(event) {
    event.preventDefault();

    // create and Dispatch Event
    const selectedEvent = new CustomEvent("picklistsearchevent", {
      detail: this.selectedFieldType
    });

    this.dispatchEvent(selectedEvent);
  }
}