/**
 * Created by manu on 02/05/17.
 */

import {CreateListViewPresenter} from "./CreateListViewPresenter";
import {ListData} from "../../../../../data/ListData";
import { sinon } from 'meteor/practicalmeteor:sinon';

describe('CreateListViewPresenter', function () {

    it('Check list name insertion [TU38]', function () {
        const presenter = new CreateListViewPresenter();
        const listData = new ListData();
        listData.setName("TEST");
        sinon.spy(presenter._chatSourse, "sendMessageToChatWithJson");
        presenter.createList(listData);
        expect(presenter._chatSourse.sendMessageToChatWithJson.called).to.be.ok;
        expect(presenter._chatSourse.sendMessageToChatWithJson.getCall(0).args[1].listData._name).to.be.eq("TEST");
        presenter._chatSourse.sendMessageToChatWithJson.restore();
    });

    it('Check that the list name have a default value [TU39]', function () {
        const presenter = new CreateListViewPresenter();
        const listData = new ListData();
        sinon.spy(presenter._chatSourse, "sendMessageToChatWithJson");
        presenter.createList(listData);
        expect(presenter._chatSourse.sendMessageToChatWithJson.called).to.be.ok;
        expect(presenter._chatSourse.sendMessageToChatWithJson.getCall(0).args[1].listData._name).to.be.eq("");
        presenter._chatSourse.sendMessageToChatWithJson.restore();
    });

    it('Check that the list image is setted correctly [TU40]', function () {
        const presenter = new CreateListViewPresenter();
        const listData = new ListData();
        listData.setImagePath("TEST");
        sinon.spy(presenter._chatSourse, "sendMessageToChatWithJson");
        presenter.createList(listData);
        expect(presenter._chatSourse.sendMessageToChatWithJson.called).to.be.ok;
        expect(presenter._chatSourse.sendMessageToChatWithJson.getCall(0).args[1].listData._imagePath).to.be.eq("TEST");
        presenter._chatSourse.sendMessageToChatWithJson.restore();
    });


});