/**
 * Created by Stefano Lia on 31/03/2017
 * Version {1.0.0} - {Initial version}
 */

import {ShareWithGroupView} from "../ShareWithGroupView";
import {ShareWithGroupViewPresenter} from "../presenter/ShareWithGroupViewPresenter";
import {container,inject} from 'dependency-injection-es6';
import {ShareEventEmitter} from '../../../../event/ShareEventEmitter'

export class ShareWithGroupViewImpl extends ShareWithGroupView{

    constructor() {
        super();
        this._presenter = new ShareWithGroupViewPresenter(this);
        this._shareEvent = container.resolve(ShareEventEmitter);
        this._shareEvent.on('shareEvent', (group,json) => {
            this.onClickShareWithGroup(group,json);
        });
    }


    onClickShareWithGroup(group,json){
        this._presenter.openShareWithGroupView(group,json);
    }

}