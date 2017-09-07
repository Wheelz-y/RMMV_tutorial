
//-----------------------------------------------------------------------------
// Game_ActionResult
// ��Ϸ�������
// The game object class for a result of a battle action. For convinience, all
// member variables in this class are public.
// �����Ϸ������Ϊ��һ��ս���������.

function Game_ActionResult() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_ActionResult.prototype.initialize = function() {
	//���
    this.clear();
};
//���
Game_ActionResult.prototype.clear = function() {
	//ʹ�ù��� = false
    this.used = false;
    //δ���е� = false
    this.missed = false;
    //���ܵ� = false
    this.evaded = false;
    //���� = false
    this.physical = false;
    //���� = false 
    this.drain = false;
    //���� = false
    this.critical = false;
    //�ɹ� = false
    this.success = false;
    //hpЧ�� = false
    this.hpAffected = false;
    //hp�˺� =  0
    this.hpDamage = 0;
    //mp�˺� = 0
    this.mpDamage = 0;
    //tp�˺� = 0
    this.tpDamage = 0;
    this.addedStates = [];
    this.removedStates = [];
    this.addedBuffs = [];
    this.addedDebuffs = [];
    this.removedBuffs = [];
};
//���״̬����
Game_ActionResult.prototype.addedStateObjects = function() {
	//���� ��ӵ�״̬ ӳ�� ( ���� id )
    return this.addedStates.map(function(id) {
	    //���� ����״̬[id]
        return $dataStates[id];
    });
};
//�Ƴ�״̬����
Game_ActionResult.prototype.removedStateObjects = function() {
    return this.removedStates.map(function(id) {
        return $dataStates[id];
    });
};
//��״̬Ӱ���
Game_ActionResult.prototype.isStatusAffected = function() {
    return (this.addedStates.length > 0 || this.removedStates.length > 0 ||
            this.addedBuffs.length > 0 || this.addedDebuffs.length > 0 ||
            this.removedBuffs.length > 0);
};
//�ǻ���
Game_ActionResult.prototype.isHit = function() {
    return this.used && !this.missed && !this.evaded;
};
//��״̬��Ӻ�
Game_ActionResult.prototype.isStateAdded = function(stateId) {
    return this.addedStates.contains(stateId);
};
//������״̬
Game_ActionResult.prototype.pushAddedState = function(stateId) {
    if (!this.isStateAdded(stateId)) {
        this.addedStates.push(stateId);
    }
};
//��״̬�Ƴ�
Game_ActionResult.prototype.isStateRemoved = function(stateId) {
    return this.removedStates.contains(stateId);
};
//����Ƴ�״̬
Game_ActionResult.prototype.pushRemovedState = function(stateId) {
    if (!this.isStateRemoved(stateId)) {
        this.removedStates.push(stateId);
    }
};
//������Ч�����
Game_ActionResult.prototype.isBuffAdded = function(paramId) {
    return this.addedBuffs.contains(paramId);
};
//����������Ч��
Game_ActionResult.prototype.pushAddedBuff = function(paramId) {
    if (!this.isBuffAdded(paramId)) {
        this.addedBuffs.push(paramId);
    }
};
//�Ǹ���Ч�����
Game_ActionResult.prototype.isDebuffAdded = function(paramId) {
    return this.addedDebuffs.contains(paramId);
};
//�����Ӹ���Ч��
Game_ActionResult.prototype.pushAddedDebuff = function(paramId) {
    if (!this.isDebuffAdded(paramId)) {
        this.addedDebuffs.push(paramId);
    }
};
//��Ч���Ƴ�
Game_ActionResult.prototype.isBuffRemoved = function(paramId) {
    return this.removedBuffs.contains(paramId);
};
//����Ƴ�Ч��
Game_ActionResult.prototype.pushRemovedBuff = function(paramId) {
    if (!this.isBuffRemoved(paramId)) {
        this.removedBuffs.push(paramId);
    }
};
