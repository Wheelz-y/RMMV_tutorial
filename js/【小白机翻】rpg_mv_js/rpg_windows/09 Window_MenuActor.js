
//-----------------------------------------------------------------------------
// Window_MenuActor
// ���ڲ˵���ɫ
// The window for selecting a target actor on the item and skill screens.
// ��Ʒ���ܻ���ѡ��Ŀ���ɫ�Ĵ���

function Window_MenuActor() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_MenuActor.prototype = Object.create(Window_MenuStatus.prototype);
//���ô�����
Window_MenuActor.prototype.constructor = Window_MenuActor;
//��ʼ��
Window_MenuActor.prototype.initialize = function() {
    Window_MenuStatus.prototype.initialize.call(this, 0, 0);
    this.hide();
};
//����ȷ��
Window_MenuActor.prototype.processOk = function() {
    if (!this.cursorAll()) {
        $gameParty.setTargetActor($gameParty.members()[this.index()]);
    }
    this.callOkHandler();
};
//ѡ���б�
Window_MenuActor.prototype.selectLast = function() {
    this.select($gameParty.targetActor().index() || 0);
};
//ѡ��Ϊ��Ŀ
Window_MenuActor.prototype.selectForItem = function(item) {
    var actor = $gameParty.menuActor();
    var action = new Game_Action(actor);
    action.setItemObject(item);
    this.setCursorFixed(false);
    this.setCursorAll(false);
    if (action.isForUser()) {
        if (DataManager.isSkill(item)) {
            this.setCursorFixed(true);
            this.select(actor.index());
        } else {
            this.selectLast();
        }
    } else if (action.isForAll()) {
        this.setCursorAll(true);
        this.select(0);
    } else {
        this.selectLast();
    }
};
