/**
 * Created by Francesco Bazzerla on 26/04/2017
 * Version 3.0.0 - Completed
 */
import {container,inject} from 'dependency-injection-es6';
import {DeleteListViewImpl} from './view/list/delete/view/DeleteListViewImpl';
import {DeleteListEventEmitter} from './event/DeleteListEventEmitter';
import {ShareWithContactViewImpl} from './view/list/shareListWithContact/view/ShareWithContactViewImpl';
import {ShowPopupUseCase} from "./usecase/ShowPopupUseCase";
import {ShareWithGroupViewImpl} from './view/list/ShareListWithGroup/view/ShareWithGroupViewImpl';

/**
 * This function looks for an user in an array of users
 * @param user : username of the user you want to find
 * @param array : array of users available
 * @return {boolean} : true if the user is found, false otherwise
 */
function searchUser(user, array){
    for(let i=0; i<array.records.length; i++){
        if(array.records[i] === user){
            return true;
        }
    }
    return false;
}

//override the validation function
Meteor.startup(()=> {
    const btn = RocketChat.MessageAction.getButtons(null,null);
    for(let i in btn) {
        if (btn[i].validation !== undefined && btn[i].id !== 'reaction-message') {
            let oldVal = btn[i].validation.toString();
            oldVal = oldVal.substring(20);
            btn[i].validation = new Function("message", "{if (message.listData !== undefined" + //NOSONAR
                ") {return false;}" + //NOSONAR
                oldVal); //NOSONAR
        }
    }
});

Meteor.startup (function () {
    //the final receiver of the shareEvent emitted by the popup
    const shareGroup = new ShareWithGroupViewImpl(); //NOSONAR
    const pop = container.resolve(ShowPopupUseCase);
    //add the button to share the ToDoListBubble with a group
    RocketChat.MessageAction.addButton({
        "id": 'shareGroup-pin',
        "icon": 'icon-forward',
        "i18nLabel": 'Share your list with channel',
        "context": [
            'message',
            'message-mobile'
        ],
        "action": (event, instance) => {
            //this function gets the list of channels which are open in your instance of Rocket.Chat
            Meteor.call('channelsList', '', '', function (error, result) {
                if (result) {

                    let html = '<select id="sites" name="sites[]" class="form-control" multiple="multiple">';
                    for(let i=0; i<result.channels.length; i++) {
                        Meteor.call('getUsersOfRoom', result.channels[i]._id, true, (error2, result2) => {
                            let cond = searchUser(Meteor.user().username, result2);
                            if(cond){
                                html = html + '<option data-tokens="' + result.channels[i].name + '">'
                                    + result.channels[i].name + '</option>';
                            }
                            //when it's the last user
                            if(i+1 === result.channels.length){
                                html = html + '</select>';
                                pop.showPopupAndSend('Choose a channel', html, this.message);
                            }
                        });
                    }

                    /*make the html which will be shown inside the popup
                    let html = '<select id="sites" name="sites[]" class="form-control" multiple="multiple">';
                    for (let i = 0; i < result.channels.length; i++) {
                        html = html + '<option data-tokens="' + result.channels[i].name + '">'
                            + result.channels[i].name + '</option>';
                    }
                    html = html + '</select>';
                    pop.showPopupAndSend('Choose a channel', html, this.message);*/
                }
                if (error) {
                    new Error(error);
                }
            });
        },
        "validation": (message) => {
            //shows the button only if the message contains a listData field
            if (message.listData !== undefined) {
                /*
                let auth = true;
                for(let i in message.listData._users) {
                    auth = auth && (message.listData._users[i] === Meteor.userId());
                }*/
                // copy the message
                this.message = {
                    listData: message.listData,
                    bubbleType: message.bubbleType
                };
                return (message.listData._creatorId === Meteor.userId());
            }
            return false;
        }
    });

    //the final receiver of the shareEvent emitted by the popup
    const shareContact = new ShareWithContactViewImpl(); //NOSONAR
    //add the button to share the ToDoListBubble with a group
    RocketChat.MessageAction.addButton({
        "id": 'shareContact-pin',
        "icon": 'icon-user',
        "i18nLabel": 'Share your list with user',
        "context": [
            'message',
            'message-mobile'
        ],
        "action": (event, instance) => {

            Meteor.call('getUsers',function(error,result){
                let cond = false; //true if there are users available
                // this html will be shown inside the popup
                let html = '<select id="sites" name="sites[]" class="form-control" multiple="multiple">';
                //check the found users
                for (let i = 0; i < result.length; i++) {
                    if(result[i].username !== Meteor.user().username && result[i].username !== 'rocket.cat') {
                        html = html + '<option data-tokens="' + result[i].username + '">'
                            + result[i].username + '</option>';
                        if(cond === false){
                            cond = true;
                        }
                    }
                }
                html = html + '</select>';
                if(cond) {
                    pop.showPopupAndSend('Choose a user',html, this.message);
                }
                else{
                    pop.showPopup('Choose a user','No Users available');
                }
            });
        },
        "validation": (message) => {
            //shows the button only if the message contains a listData field
            if(message.listData !== undefined){
                /*let auth = true;
                for(let i in message.listData._users) {
                    auth = auth && (message.listData._users[i] === Meteor.userId());
                }*/
                // copy the message
                this.message = {
                    listData: message.listData,
                    bubbleType: message.bubbleType
                };
                return (message.listData._creatorId === Meteor.userId());
            }
            return false;
        }
    });
});

Meteor.startup (function () {
    const deleteView = new DeleteListViewImpl(); //NOSONAR
    const $ = require('jquery');
    global.jQuery = require("bootstrap-jquery");
    window.$ = $;
    //add the button to delete the list
    RocketChat.MessageAction.addButton({
        "id": 'deleteList-pin',
        "icon": 'icon-cancel',
        "i18nLabel": 'Delete list',
        "context": [
            'message',
            'message-mobile'
        ],
        "action": (event, instance) => {
            const listId = message.listData._id;
            const nameList = message.listData._name;
            const delEvent = container.resolve(DeleteListEventEmitter);
            delEvent.emitDeleteThis(listId,nameList);
        },
        "validation": (message) => {
            if(message.listData !== undefined){
                /*let auth = true;
                for(let i in message.listData._users) {
                    auth = auth && (message.listData._users[i] === Meteor.userId());
                }*/
                return (message.listData._creatorId === Meteor.userId());
            }
            return false;
        }
    });
});
