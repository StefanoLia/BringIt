/**
 * The presenter of AddItemViewImpl.
 * Created by Francesco Bazzerla on 21/03/17.
 * Version 1.0.0 -
 */

export class AddItemViewPresenter{
    /**
     * @type {Object}: AddItemViewImpl element for the presenter
     */
    _view;

    /**
     * @type {Object}: Graphic component for the input of data of an item into bringit.
     */
    _inputItemInfoView;

    /**
     * @type {Object}: Component required for communication between presenter and databases.
     */
    _modifyListUseCase;

    /**
     * @constructor
     * Constructor of AddItemViewPresenter
     * @param view {Object}
     * @param inputView {Object}
     * @param useCase {Object}
     */
    constructor(view,inputView,useCase){
        this._view = view;
        this._inputItemInfoView = inputView;
        this._modifyListUseCase = useCase;
    }

    /**
     * @method
     * Shows the graphics component required to input data into bringit.
     */
    _showInputItemInfoView(){

    }

    /**
     *@method
     * It allows you to add a new item into bringit
     * @param listId {String}
     * @param item {Object}
     */
    addItem(listId,item){
        this._view.addNewItem(listId,item);
    }

    /**
     * @method
     * Generates HTML CSS JS needed to display the widget.
     */
    renderView(){
        // TODO: Implement this
    }
}