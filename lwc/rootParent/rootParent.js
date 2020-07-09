import { LightningElement, api } from "lwc";

export default class RootParent extends LightningElement {
  @api typeValue;
  handleSearchEvent(event) {
    this.typeValue = event.detail;
  }
}