
//-----------------------------------------------------------------------------
// Window_EventItem
// �����¼���Ʒ
// The window used for the event command [Select Item].
// �����¼�����Ĵ���(ѡ����Ʒ)

function Window_EventItem() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_EventItem.prototype = Object.create(Window_ItemList.prototype);
//���ô�����
Window_EventItem.prototype.constructor = Window_EventItem;
//��ʼ��
Window_EventItem.prototype.initialize = function(messageWindow) {
    this._messageWindow = messageWindow;
    var width = Graphics.boxWidth;
    var height = this.windowHeight();
    Window_ItemList.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
    this.deactivate();
    this.setHandler('ok',     this.onOk.bind(this));
    this.setHandler('cancel', this.onCancel.bind(this));
};
//���ڸ�
Window_EventItem.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
//�ɼ�����Ŀ
Window_EventItem.prototype.numVisibleRows = function() {
    return 4;
};
//��ʼ
Window_EventItem.prototype.start = function() {
    this.refresh();
    this.updatePlacement();
    this.select(0);
    this.open();
    this.activate();
};
//����λ��
Window_EventItem.prototype.updatePlacement = function() {
    if (this._messageWindow.y >= Graphics.boxHeight / 2) {
        this.y = 0;
    } else {
        this.y = Graphics.boxHeight - this.height;
    }
};
//����
Window_EventItem.prototype.includes = function(item) {
    var itypeId = $gameMessage.itemChoiceItypeId();
    return DataManager.isItem(item) && item.itypeId === itypeId;
};
//������
Window_EventItem.prototype.isEnabled = function(item) {
    return true;
};
//��ȷ��
Window_EventItem.prototype.onOk = function() {
    var item = this.item();
    var itemId = item ? item.id : 0;
    $gameVariables.setValue($gameMessage.itemChoiceVariableId(), itemId);
    this._messageWindow.terminateMessage();
    this.close();
};
//��ȡ��
Window_EventItem.prototype.onCancel = function() {
    $gameVariables.setValue($gameMessage.itemChoiceVariableId(), 0);
    this._messageWindow.terminateMessage();
    this.close();
};
