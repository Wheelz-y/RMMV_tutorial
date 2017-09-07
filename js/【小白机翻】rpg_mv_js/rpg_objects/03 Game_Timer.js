
//-----------------------------------------------------------------------------
// Game_Timer
// ��Ϸ��ʱ     $gameTimer
// The game object class for the timer.
// Ϊ�˼�ʱ����Ϸ������

function Game_Timer() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Timer.prototype.initialize = function() {
	//֡�� = 0
    this._frames = 0;
    //������ = false
    this._working = false;
};
//����
Game_Timer.prototype.update = function(sceneActive) {
	//��� sceneActive ���� ������  ���� ֡��>0
    if (sceneActive && this._working && this._frames > 0) {
	    //֡�� -- 
        this._frames--;
        //��� ֡�� == 0
        if (this._frames === 0) {
	        //������
            this.onExpire();
        }
    }
};
//��ʼ
Game_Timer.prototype.start = function(count) {
	//֡�� = ����
    this._frames = count;
    //������ = true 
    this._working = true;
};
//ֹͣ
Game_Timer.prototype.stop = function() {
    //������ = false 
    this._working = false;
};
//�ǹ�����
Game_Timer.prototype.isWorking = function() {
	//���� ������
    return this._working;
};
//��
Game_Timer.prototype.seconds = function() {
	//���� ����ȡ��(֡��/60)
    return Math.floor(this._frames / 60);
};
//������
Game_Timer.prototype.onExpire = function() {
	//ս�������� �쳣��ֹ
    BattleManager.abort();
};
