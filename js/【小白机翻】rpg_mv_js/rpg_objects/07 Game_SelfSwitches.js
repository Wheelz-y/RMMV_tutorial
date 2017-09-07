
//-----------------------------------------------------------------------------
// Game_SelfSwitches
// ��Ϸ����������      $gameSelfSwitches
// The game object class for self switches.
// �������ص���Ϸ������

function Game_SelfSwitches() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_SelfSwitches.prototype.initialize = function() {
	//���
    this.clear();
};
//���
Game_SelfSwitches.prototype.clear = function() {
	//���� = {}
    this._data = {};
};
//ֵ
Game_SelfSwitches.prototype.value = function(key) {
	//���� !! ����[��] (����[��])
    return !!this._data[key];
};
//����ֵ
Game_SelfSwitches.prototype.setValue = function(key, value) {
	//��� ֵ
    if (value) {
	    //����[��] = true
        this._data[key] = true;
    //����
    } else {
	    //ɾ�� ����[��]
        delete this._data[key];
    }
    //���ı�
    this.onChange();
};
//���ı�
Game_SelfSwitches.prototype.onChange = function() {
	//��Ϸ��ͼ ����ˢ��
    $gameMap.requestRefresh();
};
