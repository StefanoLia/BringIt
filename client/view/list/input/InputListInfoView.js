/**
 * Base Abstract class represents the generic view for add list
 * Created by lucadario on 27/03/17.
 */

import {GeneralView} from "../../../GeneralView"

export class InputListView extends GeneralView{

    /**
     * Public constructor. If called directly it will produce an exception as this class is abstract.
     */
    constructor() {
        super();
        /*if (this instanceof CreateListView) {
         throw new TypeError("Cannot construct CreateListView instances directly");
         }*/
    }

}



