import { LightningElement, track, api, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";
export default class CardComponent extends LightningElement {
  @api account;
  @wire(CurrentPageReference) pageRef;

  handledetailClick(event) {
    try {
      fireEvent(this.pageRef, "accountlistupdate", event.target.value);
    } catch (e) {
      console.log("exception occured" + e);
    }
  }
}