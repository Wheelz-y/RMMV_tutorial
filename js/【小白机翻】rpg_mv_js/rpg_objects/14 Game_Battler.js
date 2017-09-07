
//-----------------------------------------------------------------------------
// Game_Battler
// ��Ϸս����
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.
// ��Ϸ��ɫ����Ϸ���˵ĳ�����.��������Ͷ����ķ���

function Game_Battler() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Game_Battler.prototype = Object.create(Game_BattlerBase.prototype);
//���ô�����
Game_Battler.prototype.constructor = Game_Battler;
//��ʼ��
Game_Battler.prototype.initialize = function() {
    Game_BattlerBase.prototype.initialize.call(this);
};
//��ʼ����Ա
Game_Battler.prototype.initMembers = function() {
	//�̳� ��Ϸս������ ��ʼ����Ա
    Game_BattlerBase.prototype.initMembers.call(this);
    //������ = []
    this._actions = [];
    //�ٶ� = 0
    this._speed = 0;
    //��� = �� ��Ϸ������� 
    this._result = new Game_ActionResult();
    //����״̬ = ""
    this._actionState = '';
    //���Ŀ������
    this._lastTargetIndex = 0;
    //������ = []
    this._animations = [];
    //�˺�Ծ��
    this._damagePopup = false;
    //Ч������ = null
    this._effectType = null;
    //�������� = null
    this._motionType = null;
    //����ͼ��id = 0
    this._weaponImageId = 0;
    //����ˢ�� = false
    this._motionRefresh = false;
    //ѡ��� = false
    this._selected = false;
};
//���������
Game_Battler.prototype.clearAnimations = function() {
	//������ = []
    this._animations = [];
};
//����˺�Ծ��
Game_Battler.prototype.clearDamagePopup = function() {
    //�˺�Ծ��
    this._damagePopup = false;
};
//�����������
Game_Battler.prototype.clearWeaponAnimation = function() {
    //����ͼ��id = 0
    this._weaponImageId = 0;
};
//���Ч��
Game_Battler.prototype.clearEffect = function() {
    //Ч������ = null
    this._effectType = null;
};
//�������
Game_Battler.prototype.clearMotion = function() {
    //�������� = null
    this._motionType = null;
    //����ˢ�� = false
    this._motionRefresh = false;
};
//����Ч��
Game_Battler.prototype.requestEffect = function(effectType) {
    //Ч������ = effectType
    this._effectType = effectType;
};
//������
Game_Battler.prototype.requestMotion = function(motionType) {
    //�������� = motionType
    this._motionType = motionType;
};
//������ˢ��
Game_Battler.prototype.requestMotionRefresh = function() {
    //����ˢ�� = true
    this._motionRefresh = true;
};
//ѡ��
Game_Battler.prototype.select = function() {
    //ѡ��� = true
    this._selected = true;
};
//ȡ��
Game_Battler.prototype.deselect = function() {
    //ѡ��� = false
    this._selected = false;
};
//�Ƕ�������
Game_Battler.prototype.isAnimationRequested = function() {
    //���� ������ ����>0
    return this._animations.length > 0;
};
//���˺�Ծ������
Game_Battler.prototype.isDamagePopupRequested = function() {
    //���� �˺�Ծ��
    return this._damagePopup;
};
//��Ч������
Game_Battler.prototype.isEffectRequested = function() {
    //���� !!Ч������ (Ч������ ture ���� false)
    return !!this._effectType;
};
//�Ƕ�������
Game_Battler.prototype.isMotionRequested = function() {
    //���� !!�������� (�������� ture ���� false)
    return !!this._motionType;
};
//��������������
Game_Battler.prototype.isWeaponAnimationRequested = function() {
    //���� ����ͼ��id > 0
    return this._weaponImageId > 0;
};
//�Ƕ���ˢ������
Game_Battler.prototype.isMotionRefreshRequested = function() {
    //���� ����ˢ�� 
    return this._motionRefresh;
};
//��ѡ��
Game_Battler.prototype.isSelected = function() {
    //���� ѡ��� 
    return this._selected;
};
//Ч������
Game_Battler.prototype.effectType = function() {
    //���� Ч������ 
    return this._effectType;
};
//��������
Game_Battler.prototype.motionType = function() {
    //���� �������� 
    return this._motionType;
};
//����ͼƬid
Game_Battler.prototype.weaponImageId = function() {
    //���� ����ͼ��id 
    return this._weaponImageId;
};
//��һ������
Game_Battler.prototype.shiftAnimation = function() {
	//���� ������ ��һ��(��ɾ��)
    return this._animations.shift();
};
//��ʼ����
Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
	/*���� = {
		����id = animationId
		���� = mirror
		�ӳ� = delay
	}*/
    var data = { animationId: animationId, mirror: mirror, delay: delay };
    //������ ��� (����)
    this._animations.push(data);
};
//��ʼ�˺�Ծ��
Game_Battler.prototype.startDamagePopup = function() {
	//�˺�Ծ�� = true
    this._damagePopup = true;
};
//��ʼ��������
Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
	//����ͼ��id = weaponImageId
    this._weaponImageId = weaponImageId;
};
//����
Game_Battler.prototype.action = function(index) {
	//���� ������[index����]
    return this._actions[index];
};
//���ö���
Game_Battler.prototype.setAction = function(index, action) {
	//������ [index����] = action
    this._actions[index] = action;
};
//�������ܸ���
Game_Battler.prototype.numActions = function() {
	//���� ������ ����
    return this._actions.length;
};
//���������
Game_Battler.prototype.clearActions = function() {
	//������ = []
    this._actions = [];
};
//���
Game_Battler.prototype.result = function() {
	//���� ���
    return this._result;
};
//������
Game_Battler.prototype.clearResult = function() {
	//��� ���
    this._result.clear();
};
//ˢ��
Game_Battler.prototype.refresh = function() {
	//�̳� ��Ϸս������ ˢ��
    Game_BattlerBase.prototype.refresh.call(this);
    //��� hp == 0
    if (this.hp === 0) {
	    //���״̬(����״̬id)
        this.addState(this.deathStateId());
    } else {
	    //�Ƴ�״̬(����״̬id)
        this.removeState(this.deathStateId());
    }
};
//���״̬
Game_Battler.prototype.addState = function(stateId) {
	//��� ��״̬�����(stateId״̬id)
    if (this.isStateAddable(stateId)) {
	    //��� ���� ��״̬Ӱ��(״̬id)
        if (!this.isStateAffected(stateId)) {
	        //�����״̬(״̬id)
            this.addNewState(stateId);
            //ˢ��
            this.refresh();
        }
        //����״̬����(״̬id)
        this.resetStateCounts(stateId);
        //��� ������״̬
        this._result.pushAddedState(stateId);
    }
};
//��״̬�����
Game_Battler.prototype.isStateAddable = function(stateId) {
	//���� �ǻ�� ����( ����״̬[״̬id] (����״̬[״̬id] ����)) ���� (���� ��״̬�ֿ�(״̬id)) ���� (���� ��� ��״̬�Ƴ�(״̬id)) ���� (���� ��״̬����(״̬id))
    return (this.isAlive() && $dataStates[stateId] &&
            !this.isStateResist(stateId) &&
            !this._result.isStateRemoved(stateId) &&
            !this.isStateRestrict(stateId));
};
//��״̬����
Game_Battler.prototype.isStateRestrict = function(stateId) {
	//���� ����״̬[״̬id] �Ƴ�ͨ������ ���� �������Ƶ�
    return $dataStates[stateId].removeByRestriction && this.isRestricted();
};
//������
Game_Battler.prototype.onRestrict = function() {
	//�̳� ��Ϸս���߻��� ������
    Game_BattlerBase.prototype.onRestrict.call(this);
    //���������
    this.clearActions();
    //״̬�� ��ÿһ�� ״̬
    this.states().forEach(function(state) {
	    //��� ״̬ �Ƴ�ͨ������ (״̬ �Ƴ�ͨ������ ����)
        if (state.removeByRestriction) {
	        //�Ƴ�״̬(״̬id)
            this.removeState(state.id);
        }
    }, this);
};
//�Ƴ�״̬
Game_Battler.prototype.removeState = function(stateId) {
	//��� ��״̬Ӱ��(״̬id)
    if (this.isStateAffected(stateId)) {
	    //��� ״̬id == ����״̬id
        if (stateId === this.deathStateId()) {
	        //����
            this.revive();
        }
        //Ĩȥ״̬(״̬id)
        this.eraseState(stateId);
        //ˢ��
        this.refresh();
        //��� ����Ƴ�״̬(״̬id)
        this._result.pushRemovedState(stateId);
    }
};
//����
Game_Battler.prototype.escape = function() {
	//��� ��Ϸ���� ��ս�� 
    if ($gameParty.inBattle()) {
	    //����
        this.hide();
    }
    //���������
    this.clearActions();
    //���������
    this.clearStates();
    //���������� ��������
    SoundManager.playEscape();
};
//�������Ч��
Game_Battler.prototype.addBuff = function(paramId, turns) {
	//��� �ǻ��
    if (this.isAlive()) {
	    //����Ч��(paramId)
        this.increaseBuff(paramId);
        //��� ������Ч��Ӱ��(paramId)
        if (this.isBuffAffected(paramId)) {
	        //����дЧ���غ�(paramId,turns)
            this.overwriteBuffTurns(paramId, turns);
        }
        //��� ����������Ч��(paramId)
        this._result.pushAddedBuff(paramId);
        //ˢ��
        this.refresh();
    }
};
//��Ӽ���Ч��
Game_Battler.prototype.addDebuff = function(paramId, turns) {
	//��� �ǻ��
    if (this.isAlive()) {
	    //����Ч��(paramId)
        this.decreaseBuff(paramId);
        //��� �Ǹ���Ч��Ӱ��(paramId)
        if (this.isDebuffAffected(paramId)) {
	        //����дЧ���غ�(paramId,turns)
            this.overwriteBuffTurns(paramId, turns);
        }
        //��� �����Ӽ���Ч��(paramId)
        this._result.pushAddedDebuff(paramId);
        //ˢ��
        this.refresh();
    }
};
//�Ƴ�Ч��
Game_Battler.prototype.removeBuff = function(paramId) {
	//��� �ǻ�� ���� ������Ч�����߸���Ч��Ӱ��(paramId)
    if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
	    //ĨȥЧ��(paramId)
        this.eraseBuff(paramId);
        //��� ����Ƴ�Ч��(paramId)
        this._result.pushRemovedBuff(paramId);
        //ˢ��
        this.refresh();
    }
};
//�Ƴ�ս��״̬
Game_Battler.prototype.removeBattleStates = function() {
	//״̬�� ��ÿһ�� ״̬
    this.states().forEach(function(state) {
	    //״̬ �Ƴ���ս������
        if (state.removeAtBattleEnd) {
	        //�Ƴ�״̬(״̬id)
            this.removeState(state.id);
        }
    }, this);
};
//�Ƴ�����Ч��
Game_Battler.prototype.removeAllBuffs = function() {
	//ѭ�� i=0 ; i <Ч������ ; i++
    for (var i = 0; i < this.buffLength(); i++) {
	    //�Ƴ�Ч��(i)
        this.removeBuff(i);
    }
};
//�Ƴ��Զ�״̬
Game_Battler.prototype.removeStatesAuto = function(timing) {
	//״̬�� ��ÿһ�� ״̬
    this.states().forEach(function(state) {
	    //��� ��״̬����(״̬id) ���� ״̬ �Զ��Ƴ���ʱ == ��ʱ  
        if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
	        //�Ƴ�״̬(״̬id)
            this.removeState(state.id);
        }
    }, this);
};
//�Ƴ��Զ�����Ч��
Game_Battler.prototype.removeBuffsAuto = function() {
	//ѭ�� i=0 ; i <Ч������ ; i++
    for (var i = 0; i < this.buffLength(); i++) {
	    //��� ��Ч������(i)
        if (this.isBuffExpired(i)) {
	        //�Ƴ�Ч��(i)
            this.removeBuff(i);
        }
    }
};
//�Ƴ�Ч�� ���˺�
Game_Battler.prototype.removeStatesByDamage = function() {
    this.states().forEach(function(state) {
        if (state.removeByDamage && Math.randomInt(100) < state.chanceByDamage) {
            this.removeState(state.id);
        }
    }, this);
};
//��������ʱ��
Game_Battler.prototype.makeActionTimes = function() {
    return this.actionPlusSet().reduce(function(r, p) {
        return Math.random() < p ? r + 1 : r;
    }, 1);
};
//��������
Game_Battler.prototype.makeActions = function() {
    this.clearActions();
    if (this.canMove()) {
        var actionTimes = this.makeActionTimes();
        this._actions = [];
        for (var i = 0; i < actionTimes; i++) {
            this._actions.push(new Game_Action(this));
        }
    }
};
//�ٶ�
Game_Battler.prototype.speed = function() {
    return this._speed;
};
//�����ٶ�
Game_Battler.prototype.makeSpeed = function() {
    this._speed = Math.min.apply(null, this._actions.map(function(action) {
        return action.speed();
    })) || 0;
};
//��ǰ�Ķ���
Game_Battler.prototype.currentAction = function() {
    return this._actions[0];
};
//�Ƴ���ǰ�Ķ���
Game_Battler.prototype.removeCurrentAction = function() {
    this._actions.shift();
};
//��������Ŀ��
Game_Battler.prototype.setLastTarget = function(target) {
    if (target) {
        this._lastTargetIndex = target.index();
    } else {
        this._lastTargetIndex = 0;
    }
};
//ǿ�ƶ���
Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
    this.clearActions();
    var action = new Game_Action(this, true);
    action.setSkill(skillId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    this._actions.push(action);
};
//����Ŀ(����,��Ʒ)
Game_Battler.prototype.useItem = function(item) {
    if (DataManager.isSkill(item)) {
        this.paySkillCost(item);
    } else if (DataManager.isItem(item)) {
        this.consumeItem(item);
    }
};
//������Ʒ
Game_Battler.prototype.consumeItem = function(item) {
    $gameParty.consumeItem(item);
};
//����hp
Game_Battler.prototype.gainHp = function(value) {
    this._result.hpDamage = -value;
    this._result.hpAffected = true;
    this.setHp(this.hp + value);
};
//����mp
Game_Battler.prototype.gainMp = function(value) {
    this._result.mpDamage = -value;
    this.setMp(this.mp + value);
};
//����tp
Game_Battler.prototype.gainTp = function(value) {
    this._result.tpDamage = -value;
    this.setTp(this.tp + value);
};
//��������tp
Game_Battler.prototype.gainSilentTp = function(value) {
    this.setTp(this.tp + value);
};
//��ʼ��tp
Game_Battler.prototype.initTp = function() {
    this.setTp(Math.randomInt(25));
};
//���tp
Game_Battler.prototype.clearTp = function() {
    this.setTp(0);
};
//�ı�tp ���˺�
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
    var value = Math.floor(50 * damageRate * this.tcr);
    this.gainSilentTp(value);
};
//����hp
Game_Battler.prototype.regenerateHp = function() {
    var value = Math.floor(this.mhp * this.hrg);
    value = Math.max(value, -this.maxSlipDamage());
    if (value !== 0) {
        this.gainHp(value);
    }
};
//��󲻲��˺�
Game_Battler.prototype.maxSlipDamage = function() {
    return $dataSystem.optSlipDeath ? this.hp : Math.max(this.hp - 1, 0);
};
//����mp
Game_Battler.prototype.regenerateMp = function() {
    var value = Math.floor(this.mmp * this.mrg);
    if (value !== 0) {
        this.gainMp(value);
    }
};
//����tp
Game_Battler.prototype.regenerateTp = function() {
    var value = Math.floor(100 * this.trg);
    this.gainSilentTp(value);
};
//��������
Game_Battler.prototype.regenerateAll = function() {
    if (this.isAlive()) {
        this.regenerateHp();
        this.regenerateMp();
        this.regenerateTp();
    }
};
//��ս����ʼ
Game_Battler.prototype.onBattleStart = function() {
    this.setActionState('undecided');
    this.clearMotion();
    if (!this.isPreserveTp()) {
        this.initTp();
    }
};
//�����ж�������
Game_Battler.prototype.onAllActionsEnd = function() {
    this.clearResult();
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
};
//�ڻغϽ���
Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
    this.regenerateAll();
    this.updateStateTurns();
    this.updateBuffTurns();
    this.removeStatesAuto(2);
};
//��ս������
Game_Battler.prototype.onBattleEnd = function() {
    this.clearResult();
    this.removeBattleStates();
    this.removeAllBuffs();
    this.clearActions();
    if (!this.isPreserveTp()) {
        this.clearTp();
    }
    this.appear();
};
//���˺�
Game_Battler.prototype.onDamage = function(value) {
    this.removeStatesByDamage();
    this.chargeTpByDamage(value / this.mhp);
};
//���ö���״̬
Game_Battler.prototype.setActionState = function(actionState) {
    this._actionState = actionState;
    this.requestMotionRefresh();
};
//��δ����
Game_Battler.prototype.isUndecided = function() {
    return this._actionState === 'undecided';
};
//������
Game_Battler.prototype.isInputting = function() {
    return this._actionState === 'inputting';
};
//�ǵȴ�
Game_Battler.prototype.isWaiting = function() {
    return this._actionState === 'waiting';
};
//���ݳ�
Game_Battler.prototype.isActing = function() {
    return this._actionState === 'acting';
};
//������
Game_Battler.prototype.isChanting = function() {
	//��� �ǵȴ�
    if (this.isWaiting()) {
	    //���� ������(��һЩ ����)
        return this._actions.some(function(action) {
	        //���� ���� ��ħ������
            return action.isMagicSkill();
        });
    }
    //���� false
    return false;
};
//�Ƿ����ȴ�
Game_Battler.prototype.isGuardWaiting = function() {
	//��� �ǵȴ�
    if (this.isWaiting()) {
	    //���� ������(��һЩ ����)
        return this._actions.some(function(action) {
	        //���� ���� �Ƿ���
            return action.isGuard();
        });
    }
    //���� false
    return false;
};
//���ж��� ��ʼ
Game_Battler.prototype.performActionStart = function(action) {
	//��� ���� ���� �Ƿ���
    if (!action.isGuard()) {
	    //���ö���״̬
        this.setActionState('acting');
    }
};
//���ж���
Game_Battler.prototype.performAction = function(action) {
};
//���ж��� ����
Game_Battler.prototype.performActionEnd = function() {
    this.setActionState('done');
};
//�����˺�
Game_Battler.prototype.performDamage = function() {
};
//����δ����
Game_Battler.prototype.performMiss = function() {
    SoundManager.playMiss();
};
//���лָ�
Game_Battler.prototype.performRecovery = function() {
    SoundManager.playRecovery();
};
//���лر�
Game_Battler.prototype.performEvasion = function() {
    SoundManager.playEvasion();
};
//����ħ���ر�
Game_Battler.prototype.performMagicEvasion = function() {
    SoundManager.playMagicEvasion();
};
//���з���
Game_Battler.prototype.performCounter = function() {
    SoundManager.playEvasion();
};
//���з���
Game_Battler.prototype.performReflection = function() {
    SoundManager.playReflection();
};
//�������
Game_Battler.prototype.performSubstitute = function(target) {
};
//��������
Game_Battler.prototype.performCollapse = function() {
};
