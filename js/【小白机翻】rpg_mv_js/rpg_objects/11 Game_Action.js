
//-----------------------------------------------------------------------------
// Game_Action
// ��Ϸ����
// The game object class for a battle action.
// ս����������Ϸ������

function Game_Action() {
    this.initialize.apply(this, arguments);
}
//Ч�� �ָ� hp
Game_Action.EFFECT_RECOVER_HP       = 11;
//Ч�� �ָ� mp
Game_Action.EFFECT_RECOVER_MP       = 12;
//Ч�� ��� tp
Game_Action.EFFECT_GAIN_TP          = 13;
//Ч�� ��� ״̬
Game_Action.EFFECT_ADD_STATE        = 21;
//Ч�� �Ƴ� ״̬
Game_Action.EFFECT_REMOVE_STATE     = 22;
//Ч�� ��� ����Ч��
Game_Action.EFFECT_ADD_BUFF         = 31;
//Ч�� ��� ����Ч��
Game_Action.EFFECT_ADD_DEBUFF       = 32;
//Ч�� �Ƴ� ����Ч��
Game_Action.EFFECT_REMOVE_BUFF      = 33;
//Ч�� �Ƴ� ����Ч��
Game_Action.EFFECT_REMOVE_DEBUFF    = 34;
//Ч�� �����
Game_Action.EFFECT_SPECIAL          = 41;
//Ч�� ����
Game_Action.EFFECT_GROW             = 42;
//Ч�� ѧϰ����
Game_Action.EFFECT_LEARN_SKILL      = 43;
//Ч�� �����¼�
Game_Action.EFFECT_COMMON_EVENT     = 44;
//���� Ч�� ����
Game_Action.SPECIAL_EFFECT_ESCAPE   = 0;
//�������� ����
Game_Action.HITTYPE_CERTAIN         = 0;
//�������� ����
Game_Action.HITTYPE_PHYSICAL        = 1;
//�������� ħ��
Game_Action.HITTYPE_MAGICAL         = 2;
//��ʼ��
Game_Action.prototype.initialize = function(subject, forcing) {
	//�����ɫid
    this._subjectActorId = 0;
    //�����������
    this._subjectEnemyIndex = -1;
    //ǿ�Ƶ� =  forcing || false;
    this._forcing = forcing || false;
    //��������(subject)
    this.setSubject(subject);
    //���
    this.clear();
};
//���
Game_Action.prototype.clear = function() {
	//��Ŀ = �� ��Ϸ��Ŀ
    this._item = new Game_Item();
    //Ŀ������ = - 1
    this._targetIndex = -1;
};
//��������
Game_Action.prototype.setSubject = function(subject) {
	//��� ���� �ǽ�ɫ
    if (subject.isActor()) {
	    //�����ɫid = ���� ��ɫid
        this._subjectActorId = subject.actorId();
        //����������� = -1
        this._subjectEnemyIndex = -1;
    } else {
        //����������� = ���� ����
        this._subjectEnemyIndex = subject.index();
	    //�����ɫid = 0
        this._subjectActorId = 0;
    }
};
//����
Game_Action.prototype.subject = function() {
	//��� �����ɫid > 0 
    if (this._subjectActorId > 0) {
	    //���� ��Ϸ��ɫ�� ��ɫ(�����ɫid)
        return $gameActors.actor(this._subjectActorId);
    } else {
	    //���� ��Ϸ��Ⱥ ��Ա��(�����������)
        return $gameTroop.members()[this._subjectEnemyIndex];
    }
};
//����С��
Game_Action.prototype.friendsUnit = function() {
	//���� ���� ����С��
    return this.subject().friendsUnit();
};
//����С��
Game_Action.prototype.opponentsUnit = function() {
	//���� ���� ����С��
    return this.subject().opponentsUnit();
};
//���õ��˶���
Game_Action.prototype.setEnemyAction = function(action) {
	//��� ����
    if (action) {
	    //���� ���� (���� ����id)
        this.setSkill(action.skillId);
    } else {
	    //���
        this.clear();
    }
};
//���ù���
Game_Action.prototype.setAttack = function() {
	//���ü��� (���� ��������id)
    this.setSkill(this.subject().attackSkillId());
};
//���÷���
Game_Action.prototype.setGuard = function() {
	//���ü��� (���� ��������id)
    this.setSkill(this.subject().guardSkillId());
};
//���ü���
Game_Action.prototype.setSkill = function(skillId) {
	//��Ŀ ���ö��� (���ݼ��� ����id)
    this._item.setObject($dataSkills[skillId]);
};
//������Ʒ
Game_Action.prototype.setItem = function(itemId) {
	//��Ŀ ���ö��� (������Ʒ ��Ʒid)
    this._item.setObject($dataItems[itemId]);
};
//������Ŀ����
Game_Action.prototype.setItemObject = function(object) {
	//��Ŀ ���ö���(object)
    this._item.setObject(object);
};
//����Ŀ��
Game_Action.prototype.setTarget = function(targetIndex) {
	//Ŀ������ = targetIndex
    this._targetIndex = targetIndex;
};
//��Ŀ
Game_Action.prototype.item = function() {
	//���� ��Ŀ ����
    return this._item.object();
};
//�Ǽ���
Game_Action.prototype.isSkill = function() {
	//���� ��Ŀ �Ǽ���
    return this._item.isSkill();
};
//����Ʒ
Game_Action.prototype.isItem = function() {
	//���� ��Ŀ ����Ʒ
    return this._item.isItem();
};
//�ظ���
Game_Action.prototype.numRepeats = function() {
	//�ظ� = ��Ŀ �ظ���
    var repeats = this.item().repeats;
    //��� �ǹ���
    if (this.isAttack()) {
	    //�ظ��� += ���� ������������
        repeats += this.subject().attackTimesAdd();
    }
    //���� ����ȡ��( �ظ���)
    return Math.floor(repeats);
};
//�����Ŀ��Χ
Game_Action.prototype.checkItemScope = function(list) {
	//�� ���� (��Ŀ ��Χ)
    return list.contains(this.item().scope);
};
//��Ϊ�˵���
Game_Action.prototype.isForOpponent = function() {
	//�����Ŀ��Χ(1, 2, 3, 4, 5, 6)
    return this.checkItemScope([1, 2, 3, 4, 5, 6]);
};
//��Ϊ������
Game_Action.prototype.isForFriend = function() {
	//�����Ŀ��Χ(7, 8, 9, 10, 11)
    return this.checkItemScope([7, 8, 9, 10, 11]);
};
//��Ϊ����������
Game_Action.prototype.isForDeadFriend = function() {
	//�����Ŀ��Χ(9, 10)
    return this.checkItemScope([9, 10]);
};
//��Ϊ��ʹ����
Game_Action.prototype.isForUser = function() {
	//�����Ŀ��Χ(11)
    return this.checkItemScope([11]);
};
//��Ϊ��һ��
Game_Action.prototype.isForOne = function() {
	//�����Ŀ��Χ(1, 3, 7, 9, 11)
    return this.checkItemScope([1, 3, 7, 9, 11]);
};
//��Ϊ�����
Game_Action.prototype.isForRandom = function() {
	//�����Ŀ��Χ(3, 4, 5, 6)
    return this.checkItemScope([3, 4, 5, 6]);
};
//��Ϊ������
Game_Action.prototype.isForAll = function() {
	//�����Ŀ��Χ(2, 8, 10)
    return this.checkItemScope([2, 8, 10]);
};
//��Ҫѡ��
Game_Action.prototype.needsSelection = function() {
	//�����Ŀ��Χ(1, 7, 9)
    return this.checkItemScope([1, 7, 9]);
};
//Ŀ�����
Game_Action.prototype.numTargets = function() {
	//���� ��Ϊ�����  ���� ��Ŀ ��Χ - 2 ���� ����  0 
    return this.isForRandom() ? this.item().scope - 2 : 0;
};
//����˺�����
Game_Action.prototype.checkDamageType = function(list) {
	//�� ���� ��Ŀ �˺� ����
    return list.contains(this.item().damage.type);
};
//��hpЧ��
Game_Action.prototype.isHpEffect = function() {
	//����˺�����(1, 3, 5)
    return this.checkDamageType([1, 3, 5]);
};
//��mpЧ��
Game_Action.prototype.isMpEffect = function() {
	//����˺�����(2, 4, 6)
    return this.checkDamageType([2, 4, 6]);
};
//���˺�
Game_Action.prototype.isDamage = function() {
	//����˺�����(1, 2)
    return this.checkDamageType([1, 2]);
};
//�ǻָ�
Game_Action.prototype.isRecover = function() {
	//����˺�����(3, 4)
    return this.checkDamageType([3, 4]);
};
//������
Game_Action.prototype.isDrain = function() {
	//����˺�����(5, 6)
    return this.checkDamageType([5, 6]);
};
//��hp�ָ�
Game_Action.prototype.isHpRecover = function() {
	//����˺�����(3)
    return this.checkDamageType([3]);
};
//��mp�ָ�
Game_Action.prototype.isMpRecover = function() {
	//����˺�����(4)
    return this.checkDamageType([4]);
};
//�Ǳ���
Game_Action.prototype.isCertainHit = function() {
	//���� ��Ŀ �������� = ��Ϸ���� �������� ����
    return this.item().hitType === Game_Action.HITTYPE_CERTAIN;
};
//������
Game_Action.prototype.isPhysical = function() {
	//���� ��Ŀ �������� = ��Ϸ���� �������� ����
    return this.item().hitType === Game_Action.HITTYPE_PHYSICAL;
};
//��ħ��
Game_Action.prototype.isMagical = function() {
	//���� ��Ŀ �������� = ��Ϸ���� �������� ħ��
    return this.item().hitType === Game_Action.HITTYPE_MAGICAL;
};
//�ǹ���
Game_Action.prototype.isAttack = function() {
	//���� ��Ŀ === ���ݼ���(���� ��������id)
    return this.item() === $dataSkills[this.subject().attackSkillId()];
};
//�Ƿ���
Game_Action.prototype.isGuard = function() {
	//���� ��Ŀ === ���ݼ���(���� ��������id)
    return this.item() === $dataSkills[this.subject().guardSkillId()];
};
//��ħ������
Game_Action.prototype.isMagicSkill = function() {
	//��� �Ǽ��� 
    if (this.isSkill()) {
	    //���� ����ϵͳ ħ�������� ���� ��Ŀ s����id
        return $dataSystem.magicSkills.contains(this.item().stypeId);
    //����
    } else {
	    //���� false
        return false;
    }
};
//�������Ŀ��
Game_Action.prototype.decideRandomTarget = function() {
	//Ŀ�� 
    var target;
    //��� ��Ϊ����������
    if (this.isForDeadFriend()) {
	    //Ŀ�� = ����С�� �������Ŀ��
        target = this.friendsUnit().randomDeadTarget();
    //���� ��� ��Ϊ������
    } else if (this.isForFriend()) {
	    //Ŀ�� = ����С�� ���Ŀ��
        target = this.friendsUnit().randomTarget();
    //���� 
    } else {
	    //Ŀ�� = ����С�� ���Ŀ��
        target = this.opponentsUnit().randomTarget();
    }
    //��� Ŀ�� 
    if (target) {
	    //Ŀ������ = Ŀ�� ����
        this._targetIndex = target.index;
    } else {
	    //���
        this.clear();
    }
};
//���û���
Game_Action.prototype.setConfusion = function() {
	//���ù���
    this.setAttack();
};
//׼��
Game_Action.prototype.prepare = function() {
	//��� ���� �ǻ��ҵ� ���� ���� ǿ�Ƶ�
    if (this.subject().isConfused() && !this._forcing) {
	    //���û���
        this.setConfusion();
    }
};
//����Ч��
Game_Action.prototype.isValid = function() {
	//���� ǿ�Ƶ� ���� ��Ŀ  ����  ���� ����(��Ŀ)
    return (this._forcing && this.item()) || this.subject().canUse(this.item());
};
//�ٶ�
Game_Action.prototype.speed = function() {
	//���� = ���� ����
    var agi = this.subject().agi;
    //�ٶ� = ���� + ��� (����ȡ��  (5 + ���� / 4  )  )
    var speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
    //��� ��Ŀ
    if (this.item()) {
	    //�ٶ� += ��Ŀ�ٶ�
        speed += this.item().speed;
    }
    //��� �ǹ���
    if (this.isAttack()) {
	    //�ٶ� += ���� �����ٶ�
        speed += this.subject().attackSpeed();
    }
    //���� �ٶ�
    return speed;
};
//����Ŀ��
Game_Action.prototype.makeTargets = function() {
	//Ŀ���� = []
    var targets = [];
    //��� ���� ǿ���� ���� ���� �ǻ��ҵ�
    if (!this._forcing && this.subject().isConfused()) {
	    //Ŀ���� = [����Ŀ��]
        targets = [this.confusionTarget()];
    //���� ��� ��Ϊ�˵���
    } else if (this.isForOpponent()) {
	    //Ŀ���� =  Ŀ��Ϊ�˵���
        targets = this.targetsForOpponents();
    //���� ��� ��Ϊ������
    } else if (this.isForFriend()) {
	    //Ŀ���� =  Ŀ��Ϊ������
        targets = this.targetsForFriends();
    }
    //���� �ظ�Ŀ��(Ŀ����)
    return this.repeatTargets(targets);
};
//�ظ�Ŀ��
Game_Action.prototype.repeatTargets = function(targets) {
	//�ظ�Ŀ���� = []
    var repeatedTargets = [];
    //�ظ�  = �ظ���
    var repeats = this.numRepeats();
    //ѭ�� ��ʼʱ i= 0 ;�� i < Ŀ���� ���� ʱ;ÿһ�� i++
    for (var i = 0; i < targets.length; i++) {
	    //Ŀ�� = Ŀ����[i]
        var target = targets[i];
        //��� Ŀ��
        if (target) {
	        //ѭ�� ��ʼʱ j = 0 ;�� j< �ظ��� ʱ;ÿһ��j++
            for (var j = 0; j < repeats; j++) {
	            //�ظ�Ŀ���� ���(Ŀ��)
                repeatedTargets.push(target);
            }
        }
    }
    //���� �ظ�Ŀ����
    return repeatedTargets;
};
//����Ŀ��
Game_Action.prototype.confusionTarget = function() {
	//��� ���� ���ҵȼ�
    switch (this.subject().confusionLevel()) {
	//�� 1 
    case 1:
    //���� ����С�� ���Ŀ��
        return this.opponentsUnit().randomTarget();
    //�� 2
    case 2:
        //��� �����(2) == 0 
        if (Math.randomInt(2) === 0) {
	        //���� ����С�� ���Ŀ��
            return this.opponentsUnit().randomTarget();
        }
        //���� ����С�� ���Ŀ��
        return this.friendsUnit().randomTarget();
    //����
    default:
        //���� ����С�� ���Ŀ��
        return this.friendsUnit().randomTarget();
    }
};
//Ŀ��Ϊ�˵���
Game_Action.prototype.targetsForOpponents = function() {
	//Ŀ���� = []
    var targets = [];
    //С�� = ����С�� 
    var unit = this.opponentsUnit();
    //��� ��Ϊ�����
    if (this.isForRandom()) {
        //ѭ�� ��ʼʱ i= 0 ;�� i < Ŀ����� ʱ;ÿһ�� i++
        for (var i = 0; i < this.numTargets(); i++) {
	        //Ŀ���� ��� С��(���Ŀ��)
            targets.push(unit.randomTarget());
        }
    //���� ��� ��Ϊ��һ��
    } else if (this.isForOne()) {
	    //��� Ŀ������ < 0 
        if (this._targetIndex < 0) {
	        //Ŀ���� ��� С�� ���Ŀ��
            targets.push(unit.randomTarget());
        //����
        } else {
	        //Ŀ���� ��� С�� ����Ŀ��(Ŀ������)
            targets.push(unit.smoothTarget(this._targetIndex));
        }
    //����
    } else {
	    //Ŀ���� = С�� ��ĳ�Ա��
        targets = unit.aliveMembers();
    }
    //���� Ŀ���� 
    return targets;
};
//Ŀ��Ϊ������
Game_Action.prototype.targetsForFriends = function() {
	//Ŀ���� = []
    var targets = [];
    //С�� = ����С�� 
    var unit = this.friendsUnit();
    //��� ��Ϊ��ʹ����
    if (this.isForUser()) {
	    //���� [����]
        return [this.subject()];
    //���� ��� ��Ϊ����������
    } else if (this.isForDeadFriend()) {
	    //��� ��Ϊ��һ��
        if (this.isForOne()) {
	        //Ŀ���� ���(С�� ��������Ŀ��)
            targets.push(unit.smoothDeadTarget(this._targetIndex));
        //����
        } else {
	        //Ŀ����
            targets = unit.deadMembers();
        }
    //���� ��� ��Ϊ��һ�� 
    } else if (this.isForOne()) {
	    //��� Ŀ������ < 0
        if (this._targetIndex < 0) {
	        //Ŀ���� ���(С�� ��������Ŀ��)
            targets.push(unit.randomTarget());
        //���� 
        } else {
	        //Ŀ���� ��� С�� ����Ŀ��(Ŀ������)
            targets.push(unit.smoothTarget(this._targetIndex));
        }
    //���� 
    } else {
	    //Ŀ���� = С�� ��ĳ�Ա��
        targets = unit.aliveMembers();
    }
    //���� ��Ա��
    return targets;
};
//����
Game_Action.prototype.evaluate = function() {
	//ֵ = 0 
    var value = 0;
    this.itemTargetCandidates().forEach(function(target) {
        var targetValue = this.evaluateWithTarget(target);
        if (this.isForAll()) {
            value += targetValue;
        } else if (targetValue > value) {
            value = targetValue;
            this._targetIndex = target.index;
        }
    }, this);
    value *= this.numRepeats();
    if (value > 0) {
        value += Math.random();
    }
    return value;
};
//��ĿĿ���ѡ��
Game_Action.prototype.itemTargetCandidates = function() {
    if (!this.isValid()) {
        return [];
    //���� ��� ��Ϊ�˵���
    } else if (this.isForOpponent()) {
        return this.opponentsUnit().aliveMembers();
    } else if (this.isForUser()) {
        return [this.subject()];
    //���� ��� ��Ϊ����������
    } else if (this.isForDeadFriend()) {
        return this.friendsUnit().deadMembers();
    } else {
        return this.friendsUnit().aliveMembers();
    }
};
//��ֵ�÷�Χ
Game_Action.prototype.evaluateWithTarget = function(target) {
    if (this.isHpEffect()) {
        var value = this.makeDamageValue(target, false);
        //��� ��Ϊ�˵���
        if (this.isForOpponent()) {
            return value / Math.max(target.hp, 1);
        } else {
            var recovery = Math.min(-value, target.mhp - target.hp);
            return recovery / target.mhp;
        }
    }
};
//ʵ��Ӧ��
Game_Action.prototype.testApply = function(target) {
    return (this.isForDeadFriend() === target.isDead() &&
            ($gameParty.inBattle() || this.isForOpponent() ||
            (this.isHpRecover() && target.hp < target.mhp) ||
            (this.isMpRecover() && target.mp < target.mmp) ||
            (this.hasItemAnyValidEffects(target))));
};
//����Ŀ�κ�ȷʵЧ��
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
    return this.item().effects.some(function(effect) {
        return this.testItemEffect(target, effect);
    }, this);
};
//ʵ����ĿЧ��
Game_Action.prototype.testItemEffect = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_RECOVER_HP:
        return target.hp < target.mhp || effect.value1 < 0 || effect.value2 < 0;
    case Game_Action.EFFECT_RECOVER_MP:
        return target.mp < target.mmp || effect.value1 < 0 || effect.value2 < 0;
    case Game_Action.EFFECT_ADD_STATE:
        return !target.isStateAffected(effect.dataId);
    case Game_Action.EFFECT_REMOVE_STATE:
        return target.isStateAffected(effect.dataId);
    case Game_Action.EFFECT_ADD_BUFF:
        return !target.isMaxBuffAffected(effect.dataId);
    case Game_Action.EFFECT_ADD_DEBUFF:
        return !target.isMaxDebuffAffected(effect.dataId);
    case Game_Action.EFFECT_REMOVE_BUFF:
        return target.isBuffAffected(effect.dataId);
    case Game_Action.EFFECT_REMOVE_DEBUFF:
        return target.isDebuffAffected(effect.dataId);
    case Game_Action.EFFECT_LEARN_SKILL:
        return target.isActor() && !target.isLearnedSkill(effect.dataId);
    default:
        return true;
    }
};
//��Ŀ��������
Game_Action.prototype.itemCnt = function(target) {
    if (this.isPhysical() && target.canMove()) {
        return target.cnt;
    } else {
        return 0;
    }
};
//��Ŀħ���������
Game_Action.prototype.itemMrf = function(target) {
    if (this.isMagical()) {
        return target.mrf;
    } else {
        return 0;
    }
};
//��Ŀ����
Game_Action.prototype.itemHit = function(target) {
    if (this.isPhysical()) {
        return this.item().successRate * 0.01 * this.subject().hit;
    } else {
        return this.item().successRate * 0.01;
    }
};
//��Ŀ����
Game_Action.prototype.itemEva = function(target) {
    if (this.isPhysical()) {
        return target.eva;
    } else if (this.isMagical()) {
        return target.mev;
    } else {
        return 0;
    }
};
//��Ŀ ��������
Game_Action.prototype.itemCri = function(target) {
    return this.item().damage.critical ? this.subject().cri * (1 - target.cev) : 0;
};
//Ӧ��
Game_Action.prototype.apply = function(target) {
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    result.missed = (result.used && Math.random() >= this.itemHit(target));
    result.evaded = (!result.missed && Math.random() < this.itemEva(target));
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
        if (this.item().damage.type > 0) {
            result.critical = (Math.random() < this.itemCri(target));
            var value = this.makeDamageValue(target, result.critical);
            this.executeDamage(target, value);
        }
        this.item().effects.forEach(function(effect) {
            this.applyItemEffect(target, effect);
        }, this);
        this.applyItemUserEffect(target);
    }
};
//�����˺�����
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};
//��ֵ�˺���ʽ
Game_Action.prototype.evalDamageFormula = function(target) {
    try {
        var item = this.item();
        var a = this.subject();
        var b = target;
        var v = $gameVariables._data;
        var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
        return Math.max(eval(item.damage.formula), 0) * sign;
    } catch (e) {
        return 0;
    }
};
//����Ԫ�ر���
Game_Action.prototype.calcElementRate = function(target) {
    if (this.item().damage.elementId < 0) {
        return this.elementsMaxRate(target, this.subject().attackElements());
    } else {
        return target.elementRate(this.item().damage.elementId);
    }
};
//�ɷ�������
Game_Action.prototype.elementsMaxRate = function(target, elements) {
    if (elements.length > 0) {
        return Math.max.apply(null, elements.map(function(elementId) {
            return target.elementRate(elementId);
        }, this));
    } else {
        return 1;
    }
};
//Ӧ�ñ���
Game_Action.prototype.applyCritical = function(damage) {
    return damage * 3;
};
//Ӧ�ñ仯
Game_Action.prototype.applyVariance = function(damage, variance) {
    var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
    var v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
    return damage >= 0 ? damage + v : damage - v;
};
//Ӧ�÷���
Game_Action.prototype.applyGuard = function(damage, target) {
    return damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1);
};
//ִ���˺�
Game_Action.prototype.executeDamage = function(target, value) {
    var result = target.result();
    if (value === 0) {
        result.critical = false;
    }
    if (this.isHpEffect()) {
        this.executeHpDamage(target, value);
    }
    if (this.isMpEffect()) {
        this.executeMpDamage(target, value);
    }
};
//ִ��hp�˺�
Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    target.gainHp(-value);
    if (value > 0) {
        target.onDamage(value);
    }
    this.gainDrainedHp(value);
};
//ִ��mp�˺�
Game_Action.prototype.executeMpDamage = function(target, value) {
    if (!this.isMpRecover()) {
        value = Math.min(target.mp, value);
    }
    if (value !== 0) {
        this.makeSuccess(target);
    }
    target.gainMp(-value);
    this.gainDrainedMp(value);
};
//�������hp
Game_Action.prototype.gainDrainedHp = function(value) {
    if (this.isDrain()) {
        this.subject().gainHp(value);
    }
};
//��ȡ����mp
Game_Action.prototype.gainDrainedMp = function(value) {
    if (this.isDrain()) {
        this.subject().gainMp(value);
    }
};
//Ӧ����ĿЧ��
Game_Action.prototype.applyItemEffect = function(target, effect) {
    switch (effect.code) {
    case Game_Action.EFFECT_RECOVER_HP:
        this.itemEffectRecoverHp(target, effect);
        break;
    case Game_Action.EFFECT_RECOVER_MP:
        this.itemEffectRecoverMp(target, effect);
        break;
    case Game_Action.EFFECT_GAIN_TP:
        this.itemEffectGainTp(target, effect);
        break;
    case Game_Action.EFFECT_ADD_STATE:
        this.itemEffectAddState(target, effect);
        break;
    case Game_Action.EFFECT_REMOVE_STATE:
        this.itemEffectRemoveState(target, effect);
        break;
    case Game_Action.EFFECT_ADD_BUFF:
        this.itemEffectAddBuff(target, effect);
        break;
    case Game_Action.EFFECT_ADD_DEBUFF:
        this.itemEffectAddDebuff(target, effect);
        break;
    case Game_Action.EFFECT_REMOVE_BUFF:
        this.itemEffectRemoveBuff(target, effect);
        break;
    case Game_Action.EFFECT_REMOVE_DEBUFF:
        this.itemEffectRemoveDebuff(target, effect);
        break;
    case Game_Action.EFFECT_SPECIAL:
        this.itemEffectSpecial(target, effect);
        break;
    case Game_Action.EFFECT_GROW:
        this.itemEffectGrow(target, effect);
        break;
    case Game_Action.EFFECT_LEARN_SKILL:
        this.itemEffectLearnSkill(target, effect);
        break;
    case Game_Action.EFFECT_COMMON_EVENT:
        this.itemEffectCommonEvent(target, effect);
        break;
    }
};
//��ĿЧ���ָ�hp
Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
    var value = (target.mhp * effect.value1 + effect.value2) * target.rec;
    if (this.isItem()) {
        value *= this.subject().pha;
    }
    value = Math.floor(value);
    if (value !== 0) {
        target.gainHp(value);
        this.makeSuccess(target);
    }
};
//��ĿЧ�� �ָ� mp
Game_Action.prototype.itemEffectRecoverMp = function(target, effect) {
    var value = (target.mmp * effect.value1 + effect.value2) * target.rec;
    if (this.isItem()) {
        value *= this.subject().pha;
    }
    value = Math.floor(value);
    if (value !== 0) {
        target.gainMp(value);
        this.makeSuccess(target);
    }
};
//Ч�� ��� tp
Game_Action.prototype.itemEffectGainTp = function(target, effect) {
    var value = Math.floor(effect.value1);
    if (value !== 0) {
        target.gainTp(value);
        this.makeSuccess(target);
    }
};
//Ч�� ��� ״̬
Game_Action.prototype.itemEffectAddState = function(target, effect) {
    if (effect.dataId === 0) {
        this.itemEffectAddAttackState(target, effect);
    } else {
        this.itemEffectAddNormalState(target, effect);
    }
};
//Ч�� ��� ����״̬
Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
    this.subject().attackStates().forEach(function(stateId) {
        var chance = effect.value1;
        chance *= target.stateRate(stateId);
        chance *= this.subject().attackStatesRate(stateId);
        chance *= this.lukEffectRate(target);
        if (Math.random() < chance) {
            target.addState(stateId);
            this.makeSuccess(target);
        }
    }.bind(this), target);
};
//Ч�� ��� ��ͨ״̬
Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    var chance = effect.value1;
    if (!this.isCertainHit()) {
        chance *= target.stateRate(effect.dataId);
        chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
        target.addState(effect.dataId);
        this.makeSuccess(target);
    }
};
//Ч�� �Ƴ� ״̬
Game_Action.prototype.itemEffectRemoveState = function(target, effect) {
    var chance = effect.value1;
    if (Math.random() < chance) {
        target.removeState(effect.dataId);
        this.makeSuccess(target);
    }
};
//Ч�� ��� ����Ч��
Game_Action.prototype.itemEffectAddBuff = function(target, effect) {
    target.addBuff(effect.dataId, effect.value1);
    this.makeSuccess(target);
};
//Ч�� ��� ����Ч��
Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
    var chance = target.debuffRate(effect.dataId) * this.lukEffectRate(target);
    if (Math.random() < chance) {
        target.addDebuff(effect.dataId, effect.value1);
        this.makeSuccess(target);
    }
};
//Ч�� �Ƴ� ����Ч��
Game_Action.prototype.itemEffectRemoveBuff = function(target, effect) {
    if (target.isBuffAffected(effect.dataId)) {
        target.removeBuff(effect.dataId);
        this.makeSuccess(target);
    }
};
//Ч�� �Ƴ� ����Ч��
Game_Action.prototype.itemEffectRemoveDebuff = function(target, effect) {
    if (target.isDebuffAffected(effect.dataId)) {
        target.removeBuff(effect.dataId);
        this.makeSuccess(target);
    }
};
//Ч�� �����
Game_Action.prototype.itemEffectSpecial = function(target, effect) {
    if (effect.dataId === Game_Action.SPECIAL_EFFECT_ESCAPE) {
        target.escape();
        this.makeSuccess(target);
    }
};
//Ч�� ����
Game_Action.prototype.itemEffectGrow = function(target, effect) {
    target.addParam(effect.dataId, Math.floor(effect.value1));
    this.makeSuccess(target);
};
//Ч�� ѧϰ����
Game_Action.prototype.itemEffectLearnSkill = function(target, effect) {
    if (target.isActor()) {
        target.learnSkill(effect.dataId);
        this.makeSuccess(target);
    }
};
//�����¼�
Game_Action.prototype.itemEffectCommonEvent = function(target, effect) {
};
//�����ɹ�
Game_Action.prototype.makeSuccess = function(target) {
    target.result().success = true;
};
//Ӧ����Ŀʹ����Ч��
Game_Action.prototype.applyItemUserEffect = function(target) {
    var value = Math.floor(this.item().tpGain * this.subject().tcr);
    this.subject().gainSilentTp(value);
};
//����Ч������
Game_Action.prototype.lukEffectRate = function(target) {
    return Math.max(1.0 + (this.subject().luk - target.luk) * 0.001, 0.0);
};
//Ӧ��ͨ�õ�
Game_Action.prototype.applyGlobal = function() {
    this.item().effects.forEach(function(effect) {
        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
            $gameTemp.reserveCommonEvent(effect.dataId);
        }
    }, this);
};
