import { LightningElement, api, wire } from 'lwc';
import getTypeAccountList from '@salesforce/apex/parentSearchController.getTypeAccountList';

import { refreshApex } from '@salesforce/apex';
import { registerListener,unregisterAllListeners } from 'c/pubsub';
import{CurrentPageReference} from 'lightning/navigation';

export default class SearchResults extends LightningElement {
    @api searchtypekey;
    recordNumber =10;
    @wire(CurrentPageReference) pageRef;
    @wire (getTypeAccountList, {typeValue: '$searchtypekey',recordNumber:'$recordNumber'})accountList;
    constructor(){
        super();
    }
    
    connectedCallback() {
        registerListener("refreshaccount",this.handlerefreshaccount,this);
        }
        handlerefreshaccount(){
            refreshApex(this.accountList);
        } 

    

}