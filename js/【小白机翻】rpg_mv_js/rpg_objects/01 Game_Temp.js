
//-----------------------------------------------------------------------------
// Game_Temp
// ��Ϸ��ʱ  $gameTemp
// The game object class for temporary data that is not included in save data.
// �������ڱ��������е���ʱ���ݵ���Ϸ����

function Game_Temp() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Temp.prototype.initialize = function() {
	//����Ϸ���� = ���ó��� ��ĿURL�ַ����Ƿ���(test)
    this._isPlaytest = Utils.isOptionValid('test');
    //�����¼�id = 0
    this._commonEventId = 0;
    //Ŀ�ĵ�x = null
    this._destinationX = null;
    //Ŀ�ĵ�y = null
    this._destinationY = null;
};
//����Ϸ����
Game_Temp.prototype.isPlaytest = function() {
	//���� ����Ϸ����
    return this._isPlaytest;
};
//���湫���¼�
Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
	//�����¼�id = commonEventId
    this._commonEventId = commonEventId;
};
//��������¼�
Game_Temp.prototype.clearCommonEvent = function() {
	//�����¼�id = 0
    this._commonEventId = 0;
};
//�ǹ����¼�����  (�Ƿ��й����¼�)
Game_Temp.prototype.isCommonEventReserved = function() {
	//���� �����¼�id > 0 
    return this._commonEventId > 0;
};
//����Ĺ����¼�
Game_Temp.prototype.reservedCommonEvent = function() {
	//���� ���ݹ����¼�[�����¼�id]
    return $dataCommonEvents[this._commonEventId];
};
//����Ŀ�ĵ�
Game_Temp.prototype.setDestination = function(x, y) {
	//Ŀ�ĵ�x = x
    this._destinationX = x;
    //Ŀ�ĵ�y = y
    this._destinationY = y;
};
//���Ŀ�ĵ�
Game_Temp.prototype.clearDestination = function() {
	//Ŀ�ĵ�x = null
    this._destinationX = null;
    //Ŀ�ĵ�y = null
    this._destinationY = null;
};
//����Ч��Ŀ�ĵ�
Game_Temp.prototype.isDestinationValid = function() {
	//���� Ŀ�ĵ�x !== null 
    return this._destinationX !== null;
};
//Ŀ�ĵ�x
Game_Temp.prototype.destinationX = function() {
	//���� Ŀ�ĵ�x
    return this._destinationX;
};
//Ŀ�ĵ�y
Game_Temp.prototype.destinationY = function() {
	//���� Ŀ�ĵ�y
    return this._destinationY;
};
