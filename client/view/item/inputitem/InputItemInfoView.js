/**
 * Created by nicolo on 22/04/17.
 * This class is the interface for the InputItemInfoViewImpl
 * version 2.0.0 - Completed
 */

import {GeneralView} from "../../../GeneralView"

export class InputItemInfoView extends GeneralView{

    /**
     * Public constructor. If called directly it will produce an exception as this class is abstract.
     */
    constructor() {
        super();
        /*if (this instanceof CreateListView) {
         throw new TypeError("Cannot construct CreateListView instances directly");
         }*/
    }

    onSaveClicked(){}


}




