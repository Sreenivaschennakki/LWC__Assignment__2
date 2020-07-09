import { LightningElement, api, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { fireEvent } from "c/pubsub";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LdsDetailComponent extends LightningElement {
  @api accountRecordId;
  @track editButton = false;
  @track editButtonVisible = false;
  objectApiName = "Account";

  @wire(CurrentPageReference) pageRef;
  constructor() {
    super();
  }
  connectedCallback() {
    registerListener("accountlistupdate", this.handleAccount, this);
  }
  handleAccount(data) {
    this.accountRecordId = data.Id;
  }

  handleEditClick() {
    this.editButton = true;
  }
  handleReset() {
    this.editButton = false;
  }
  handleSucess(event) {
    fireEvent(this.pageRef, "refreshaccount", event.target.value);

    this.editButton = false;
    const evt = new ShowToastEvent({
      title: "Record Update",
      message: "Account is Succesfully Updated ",
      variant: "success",
      mode: "dismissable"
    });
  }
}