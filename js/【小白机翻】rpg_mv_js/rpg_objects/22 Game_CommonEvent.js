
//-----------------------------------------------------------------------------
// Game_CommonEvent
// ��Ϸ�����¼�
// The game object class for a common event. It contains functionality for
// running parallel process events.
// �����¼�����Ϸ������.��������ת�¼��Ĺ���

function Game_CommonEvent() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_CommonEvent.prototype.initialize = function(commonEventId) {
    this._commonEventId = commonEventId;
    this.refresh();
};
//�¼�
Game_CommonEvent.prototype.event = function() {
    return $dataCommonEvents[this._commonEventId];
};
//�б�
Game_CommonEvent.prototype.list = function() {
    return this.event().list;
};
//ˢ��
Game_CommonEvent.prototype.refresh = function() {
    if (this.isActive()) {
        if (!this._interpreter) {
            this._interpreter = new Game_Interpreter();
        }
    } else {
        this._interpreter = null;
    }
};
//�ǻ��
Game_CommonEvent.prototype.isActive = function() {
    var event = this.event();
    return event.trigger === 2 && $gameSwitches.value(event.switchId);
};
//����
Game_CommonEvent.prototype.update = function() {
    if (this._interpreter) {
        if (!this._interpreter.isRunning()) {
            this._interpreter.setup(this.list());
        }
        this._interpreter.update();
    }
};
