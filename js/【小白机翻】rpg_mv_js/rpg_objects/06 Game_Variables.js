
//-----------------------------------------------------------------------------
// Game_Variables
// ��Ϸ������  $gameVariables
// The game object class for variables.
// ��������Ϸ������

function Game_Variables() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Variables.prototype.initialize = function() {
	//���
    this.clear();
};
//���
Game_Variables.prototype.clear = function() {
	//���� = []
    this._data = [];
};
//ֵ
Game_Variables.prototype.value = function(variableId) {
	//���� ����[����id] || 0
    return this._data[variableId] || 0;
};
//����ֵ
Game_Variables.prototype.setValue = function(variableId, value) {
	//��� ����id > 0 ���� ����id < ����ϵͳ ������ ����
    if (variableId > 0 && variableId < $dataSystem.variables.length) {
	    //��� ���� ֵ === "number" //����
        if (typeof value === 'number') {
	        //ֵ = ����ȡ��(ֵ)
            value = Math.floor(value);
        }
        //����[����id] = ֵ
        this._data[variableId] = value;
        //���ı�
        this.onChange();
    }
};
//���ı�
Game_Variables.prototype.onChange = function() {
	//��Ϸ��ͼ ����ˢ��
    $gameMap.requestRefresh();
};
