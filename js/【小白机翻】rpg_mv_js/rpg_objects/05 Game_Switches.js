
//-----------------------------------------------------------------------------
// Game_Switches
// ��Ϸ������    $gameSwitches
// The game object class for switches.
// ���������Ϸ������

function Game_Switches() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Switches.prototype.initialize = function() {
	//���
    this.clear();
};
//���
Game_Switches.prototype.clear = function() {
	//���� = []
    this._data = [];
};
//ֵ
Game_Switches.prototype.value = function(switchId) {
	//���� !!����[����id] (����[����id]true����false)
    return !!this._data[switchId];
};
//����ֵ
Game_Switches.prototype.setValue = function(switchId, value) {
	//��� ����id > 0 ���� ����id < ����ϵͳ ������ ����
    if (switchId > 0 && switchId < $dataSystem.switches.length) {
	    //����[����id] = ֵ
        this._data[switchId] = value;
        //���ı�
        this.onChange();
    }
};
//���ı�
Game_Switches.prototype.onChange = function() {
	//��Ϸ��ͼ ����ˢ��
    $gameMap.requestRefresh();
};
