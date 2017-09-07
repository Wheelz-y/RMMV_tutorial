
//-----------------------------------------------------------------------------
// BattleManager
// ս��������
// The static class that manages battle progress.
// �����̬���� ���� ս������

function BattleManager() {
    throw new Error('This is a static class');
}

//��װ
BattleManager.setup = function(troopId, canEscape, canLose) {
	//��ʼ����Ա
    this.initMembers();
    //������
    this._canEscape = canEscape;
    //��ʧ��
    this._canLose = canLose;
    //��Ϸ��Ⱥ ��װ
    $gameTroop.setup(troopId);
    //��Ļ ��ս����ʼ
    $gameScreen.onBattleStart();
    //�������ܸ���
    this.makeEscapeRatio();
};

//��ʼ����Ա
BattleManager.initMembers = function() {
	//�׶� ��ʼ��
    this._phase = 'init';
    //������
    this._canEscape = false;
    //��ʧ��
    this._canLose = false;
    //ս������
    this._battleTest = false;
    //�¼����з���
    this._eventCallback = null;
    //����Ȩ
    this._preemptive = false;
    //ͻȻϮ��
    this._surprise = false;
    //��ɫid
    this._actorIndex = -1;
    //����ǿ��ս����
    this._actionForcedBattler = null;
    //��ͼ����
    this._mapBgm = null;
    //��ͼbgs
    this._mapBgs = null;
    //����ս������
    this._actionBattlers = [];
    //����
    this._subject = null;
    //����
    this._action = null;
    //Ŀ����
    this._targets = [];
    //��־����
    this._logWindow = null;
    //״̬����
    this._statusWindow = null;
    //������
    this._spriteset = null;
    //���ܸ���
    this._escapeRatio = 0;
    //���ܵ�
    this._escaped = false;
    //����
    this._rewards = {};
};
//��ս������
BattleManager.isBattleTest = function() {
    return this._battleTest;
};
//����ս������
BattleManager.setBattleTest = function(battleTest) {
    this._battleTest = battleTest;
};
//�����¼��ؽ�
BattleManager.setEventCallback = function(callback) {
    this._eventCallback = callback;
};
//���ü�¼����
BattleManager.setLogWindow = function(logWindow) {
    this._logWindow = logWindow;
};
//����״̬����
BattleManager.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
};
//���þ���
BattleManager.setSpriteset = function(spriteset) {
    this._spriteset = spriteset;
};
//������
BattleManager.onEncounter = function() {
	//�ȷ�����
    this._preemptive = (Math.random() < this.ratePreemptive());
    //ͻȻϮ��
    this._surprise = (Math.random() < this.rateSurprise() && !this._preemptive);
};
//�ȷ����˱���
BattleManager.ratePreemptive = function() {
    return $gameParty.ratePreemptive($gameTroop.agility());
};
//ͻȻϮ������
BattleManager.rateSurprise = function() {
    return $gameParty.rateSurprise($gameTroop.agility());
};
//����bgm��bgs
BattleManager.saveBgmAndBgs = function() {
	//mapBgm = ��Ƶ������ ����bgm
    this._mapBgm = AudioManager.saveBgm();
	//mapBgs = ��Ƶ������ ����bgs
    this._mapBgs = AudioManager.saveBgs();
};
//����ս��bgm
BattleManager.playBattleBgm = function() {
	//��Ƶ������ ����me (��Ϸϵͳ ս��me)
    AudioManager.playBgm($gameSystem.battleBgm());
	//��Ƶ������ ֹͣbgs
    AudioManager.stopBgs();
};
//����ʤ��me
BattleManager.playVictoryMe = function() {
	//��Ƶ������ ����me (��Ϸϵͳ ʤ��me)
    AudioManager.playMe($gameSystem.victoryMe());
};
//����ʧ��me
BattleManager.playDefeatMe = function() {
	//��Ƶ������ ����me (��Ϸϵͳ ʧ��me)
    AudioManager.playMe($gameSystem.defeatMe());
};
//�ز�bgm��bgs
BattleManager.replayBgmAndBgs = function() {
	//��� mapbgm(mapbgm����)
    if (this._mapBgm) {
	    //��Ƶ������ �ز�bgm(mapbgm)
        AudioManager.replayBgm(this._mapBgm);
    } else {
	    //��Ƶ������ ֹͣbgm
        AudioManager.stopBgm();
    }
    //��� mapBgs(mapbgs����)
    if (this._mapBgs) {
	    //��Ƶ������ �ز�bgs(mapbgs)
        AudioManager.replayBgs(this._mapBgs);
    }
};
//�������ܸ���
BattleManager.makeEscapeRatio = function() {
	//���ܸ��� = 0.5 * ��Ϸ���� ���� / ��Ϸ��Ⱥ ����
    this._escapeRatio = 0.5 * $gameParty.agility() / $gameTroop.agility();
};
//����
BattleManager.update = function() {
	//�� (���� ��æµ) ���� (���� �����¼�)
    if (!this.isBusy() && !this.updateEvent()) {
	    //��� �׶�
        switch (this._phase) {
	    //�� ��ʼ 
        case 'start':
            //��ʼ����
            this.startInput();
            break;
        //�� �غ�
        case 'turn':
            //���»غ�
            this.updateTurn();
            break;
        //�� ����
        case 'action':
            //���¶���
            this.updateAction();
            break;
        //�� �غϽ���
        case 'turnEnd':
        	//���»غϽ���
            this.updateTurnEnd();
            break;
        //�� ս������
        case 'battleEnd':
        	//����ս������
            this.updateBattleEnd();
            break;
        }
    }
};
//�����¼�
BattleManager.updateEvent = function() {
	//��� �׶�
    switch (this._phase) {
	//��ʼ
    case 'start':
    //�غ�
    case 'turn':
    //�غϽ���
    case 'turnEnd':
        //���  ��ǿ�ƶ���
        if (this.isActionForced()) {
	        //����ǿ�ƶ���
            this.processForcedAction();
            //���� true 
            return true;
        } else {
	        //���� �����¼���Ҫ
            return this.updateEventMain();
        }
    }
    //���� ����쳣��ֹ
    return this.checkAbort();
};
//�����¼���Ҫ
BattleManager.updateEventMain = function() {
	//��Ϸ��Ⱥ �����¼����������
    $gameTroop.updateInterpreter();
    //������ˢ��
    $gameParty.requestMotionRefresh();
    //��� (��Ϸ��Ⱥ ���¼���ת) ���� (���ս������)
    if ($gameTroop.isEventRunning() || this.checkBattleEnd()) {
	    //���� true
        return true;
    }
    //��Ϸ��Ⱥ ��װս���¼�
    $gameTroop.setupBattleEvent();
    //(��Ϸ��Ⱥ ���¼���ת) ���� (���������� �ǳ����ı�)
    if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
	    //���� true 
        return true;
    }
    //���� falae
    return false;
};
//��æµ
BattleManager.isBusy = function() {
	//���� (��Ϸ��Ϣ ��æµ) ���� (��������æµ) ���� (��־���� ��æµ)
    return ($gameMessage.isBusy() || this._spriteset.isBusy() ||
            this._logWindow.isBusy());
};
//��������
BattleManager.isInputting = function() {
	//���� �׶� == "input"
    return this._phase === 'input';
};
//���ڻغ�
BattleManager.isInTurn = function() {
	//���� �׶� == "turn"
    return this._phase === 'turn';
};
//�ǻغϽ���
BattleManager.isTurnEnd = function() {
	//���� �׶� == "turnEnd"
    return this._phase === 'turnEnd';
};
//���쳣��ֹ
BattleManager.isAborting = function() {
	//���� �׶� == "aborting"
    return this._phase === 'aborting';
};
//��ս������
BattleManager.isBattleEnd = function() {
	//���� �׶� == "battleEnd"
    return this._phase === 'battleEnd';
};

//������
BattleManager.canEscape = function() {
	//���� ������
    return this._canEscape;
};
//��ʧ��
BattleManager.canLose = function() {
	//���� ��ʧ��
    return this._canLose;
};
//������
BattleManager.isEscaped = function() {
	//���� ���ܵ�
    return this._escaped;
};
//��ɫ
BattleManager.actor = function() {
	//���� ��� ��ɫ����>=0 ,���� ��Ϸ���� ��Ա�� ��ɫ���� ���� null
    return this._actorIndex >= 0 ? $gameParty.members()[this._actorIndex] : null;
};
//�����ɫ
BattleManager.clearActor = function() {
	//�ı��ɫ (-1,"")
    this.changeActor(-1, '');
};
//�ı��ɫ(�½�ɫ����,��һ����ɫ����״̬)
BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
	//��һ����ɫ
    var lastActor = this.actor();
    //��ɫ���� ����Ϊ �½�ɫ����
    this._actorIndex = newActorIndex;
    //�½�ɫ 
    var newActor = this.actor();
    //�����һ����ɫ(����)
    if (lastActor) {
	    //��һ����ɫ ���ö���״̬(��һ����ɫ����״̬)
        lastActor.setActionState(lastActorActionState);
    }
    //��� �½�ɫ ����
    if (newActor) {
	    //�½�ɫ ���ö���״̬('inputting') //������
        newActor.setActionState('inputting');
    }
};
//��ʼս��
BattleManager.startBattle = function() {
	//�׶� ����Ϊ "start" //��ʼ
    this._phase = 'start';
    //��Ϸϵͳ ��ս����ʼ
    $gameSystem.onBattleStart();
    //��Ϸ���� ��ս����ʼ
    $gameParty.onBattleStart();
    //��Ϸ��Ⱥ ��ս����ʼ
    $gameTroop.onBattleStart();
    //��ʾ��ʼս��
    this.displayStartMessages();
};
//��ʾ��ʼս��
BattleManager.displayStartMessages = function() {
	//��Ϸ��Ⱥ ����������  ��ÿһ�� ���� 
    $gameTroop.enemyNames().forEach(function(name) {
	    //��Ϸ��Ϣ��� (�ı������� ����(��� �� ����) ) 
        $gameMessage.add(TextManager.emerge.format(name));
    });
    //�ȷ�����
    if (this._preemptive) {
	    //��Ϸ��Ϣ��� (�ı������� �ȷ�����(��� �� ����) ) 
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    //ͻȻϮ��
    } else if (this._surprise) {
	    //��Ϸ��Ϣ��� (�ı������� ͻȻϮ��(��� �� ����) ) 
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};
//��ʼ����
BattleManager.startInput = function() {
	//�׶� ����Ϊ "input" //����
    this._phase = 'input';
    //��Ϸ���� ��������
    $gameParty.makeActions();
    //��Ϸ��Ⱥ ��������
    $gameTroop.makeActions();
    //�����ɫ
    this.clearActor();
    //��� (ͻȻϮ��) ���� (���� ��Ϸ���� ������)
    if (this._surprise || !$gameParty.canInput()) {
	    //��ʼ�غ�
        this.startTurn();
    }
};
//�����ɫ
BattleManager.inputtingAction = function() {
	//���� ��� ��ɫ(����) ��ɫ ���붯�� ���� null
    return this.actor() ? this.actor().inputtingAction() : null;
};
//ѡ����һ������
BattleManager.selectNextCommand = function() {
	//���� 
    do {
	    //��� (���� ��ɫ(��ɫ������)) ���� (���� ��ɫ ѡ����һ������)
        if (!this.actor() || !this.actor().selectNextCommand()) {
	        //�ı��ɫ(��ɫ����+1 , "waiting" //�ȴ�) 
            this.changeActor(this._actorIndex + 1, 'waiting');
            //��� (��ɫ���� ���ڵ��� (��Ϸ���� ��С))
            if (this._actorIndex >= $gameParty.size()) {
	            //��ʼ�غ�
                this.startTurn();
                //�ж�
                break;
            }
        }
    //�� (���� ��ɫ ������)
    } while (!this.actor().canInput());
};
//ѡ��֮ǰ������
BattleManager.selectPreviousCommand = function() {
	//����
    do {
	    //��� (���� ��ɫ(��ɫ������)) ���� (���� ��ɫ ѡ����һ������)
        if (!this.actor() || !this.actor().selectPreviousCommand()) {
	        //�ı��ɫ(��ɫ����+1 , "undecided" //δ����) 
            this.changeActor(this._actorIndex - 1, 'undecided');
            //���(��ɫ���� С��0 )
            if (this._actorIndex < 0) {
	            //����
                return;
            }
        }
    //�� (���� ��ɫ ������)
    } while (!this.actor().canInput());
};
//ˢ��״̬
BattleManager.refreshStatus = function() {
	//״̬���� ˢ��
    this._statusWindow.refresh();
};
//��ʼ�غ�
BattleManager.startTurn = function() {
	//�׶� ����Ϊ "turn"  //�غ�
    this._phase = 'turn';
    //�����ɫ
    this.clearActor();
    //��Ϸ��Ⱥ ���ӻغ�
    $gameTroop.increaseTurn();
	//������������
    this.makeActionOrders();
    //��Ϸ���� ������ˢ��
    $gameParty.requestMotionRefresh();
    //��־���� ��ʼ�غ�
    this._logWindow.startTurn();
};
//���»غ�
BattleManager.updateTurn = function() {
    //��Ϸ���� ������ˢ��
    $gameParty.requestMotionRefresh();
    //��� ���� ����(����û��) 
    if (!this._subject) {
	    //���� ����Ϊ �����һ������
        this._subject = this.getNextSubject();
    }
    //��� ���� (�������)
    if (this._subject) {
		//���̻غ�
        this.processTurn();
    } else {
	    //�����غ�
        this.endTurn();
    }
};
//���̻غ�
BattleManager.processTurn = function() {
	//���� = ����
    var subject = this._subject;
    //���� = ��ǰ�� ����
    var action = subject.currentAction();
    //��� ����(���� ����)
    if (action) {
	    //���� ׼��
        action.prepare();
        //��� ���� ����Ч��
        if (action.isValid()) {
	        //��ʼ ����
            this.startAction();
        }
        //���� �Ƴ���ǰ�Ķ���
        subject.removeCurrentAction();
    } else {
	    //���� �����ж�������
        subject.onAllActionsEnd();
        //ˢ��״̬
        this.refreshStatus();
        //��־���� ��ʾ�Զ�Ӱ��״̬(����)
        this._logWindow.displayAutoAffectedStatus(subject);
		//��־���� ��ʾ��ǰ״̬(����)
        this._logWindow.displayCurrentState(subject);
		//��־���� ��ʾ�ָ�(����)
        this._logWindow.displayRegeneration(subject);
        //���� ����Ϊ �����һ������
        this._subject = this.getNextSubject();
    }
};
//�����غ�
BattleManager.endTurn = function() {
	//�׶� ����Ϊ "turnEnd" //�غϽ���
    this._phase = 'turnEnd';
    //�ȷ����� = false
    this._preemptive = false;
    //ͻȻϮ�� = false
    this._surprise = false;
    //����ս����Ա�� ��ÿһ�� ս���� 
    this.allBattleMembers().forEach(function(battler) {
	    //ս���� �ڻغϽ���
        battler.onTurnEnd();
        //ˢ��״̬
        this.refreshStatus();
        //��־���� ��ʾ�Զ�Ӱ��״̬(����)
        this._logWindow.displayAutoAffectedStatus(battler);
		//��־���� ��ʾ�ָ�(����)
        this._logWindow.displayRegeneration(battler);
    }, this);
};
//���»غϽ���
BattleManager.updateTurnEnd = function() {
	//��ʼ����
    this.startInput();
};
//�����һ������
BattleManager.getNextSubject = function() {
	//ѭ��
    for (;;) {
	    //ս���� = ����ս������ ���ص�һ����ɾ��
        var battler = this._actionBattlers.shift();
        //��� ���� ս����(ս���� ������) 
        if (!battler) {
            return null;
        }
        //��� ս���� ��ս����Ա ���� ս���� �ǻ��
        if (battler.isBattleMember() && battler.isAlive()) {
	        //���� ս����
            return battler;
        }
    }
};
//����ս����Ա��
BattleManager.allBattleMembers = function() {
	//���� ��Ϸ���� ��Ա�� ���� ��Ϸ��Ⱥ ��Ա��
    return $gameParty.members().concat($gameTroop.members());
};
//������������
BattleManager.makeActionOrders = function() {
	//ս������
    var battlers = [];
    //��� ���� ����(���� ������)
    if (!this._surprise) {
	    //ս������ = ս������ ���� (��Ϸ���� ��Ա��)
        battlers = battlers.concat($gameParty.members());
    }
    //��� ���� �ȷ�����
    if (!this._preemptive) {
	    //ս������ = ս������ ���� (��Ϸ��Ⱥ ��Ա��)
        battlers = battlers.concat($gameTroop.members());
    }
    //ս������ ��ÿһ�� ս���� 
    battlers.forEach(function(battler) {
	    //ս���� �����ٶ�
        battler.makeSpeed();
    });
    //ս������ ���� �� a,b
    battlers.sort(function(a, b) {
	    //���� b �ٶ� - a �ٶ�
        return b.speed() - a.speed();
    });
    //����ս������ ����Ϊ ս������
    this._actionBattlers = battlers;
};
//��ʼ����
BattleManager.startAction = function() {
	//���� = ����
    var subject = this._subject;
    //���� = ���� ��ǰ����
    var action = subject.currentAction();
    //Ŀ�� = ���� ����Ŀ��
    var targets = action.makeTargets();
	//�׶� ����Ϊ "action" //����
    this._phase = 'action';
    //����
    this._action = action;
    //Ŀ����
    this._targets = targets;
    //���� ����Ŀ(���� ��Ŀ) 
    subject.useItem(action.item());
    //���� Ӧ��ͨ�õ�
    this._action.applyGlobal();
    //ˢ��״̬
    this.refreshStatus();
    //��־���� ��ʼ����(����,����,Ŀ����)
    this._logWindow.startAction(subject, action, targets);
};
//���¶���
BattleManager.updateAction = function() {
	//Ŀ�� = Ŀ���� ����ͷһ����ɾ��
    var target = this._targets.shift();
    //��� Ŀ��(Ŀ�����)
    if (target) {
 		//���ö���
        this.invokeAction(this._subject, target);
    } else {
	    //��������
        this.endAction();
    }
};
//��������
BattleManager.endAction = function() {
	//��־���� �������� (����)
    this._logWindow.endAction(this._subject);
	//�׶� ����Ϊ "turn"  //�غ�
    this._phase = 'turn';
};
///���ö���
BattleManager.invokeAction = function(subject, target) {
	//��־���� ��� ��ӻ�����
    this._logWindow.push('pushBaseLine');
    //��� ����� < ���� ��Ŀ��������(Ŀ��)
    if (Math.random() < this._action.itemCnt(target)) {
	    //���÷���(����,Ŀ��)
        this.invokeCounterAttack(subject, target);
    //��� ����� < ���� ��Ŀħ����������(Ŀ��)
    } else if (Math.random() < this._action.itemMrf(target)) {
		//����ħ������(����,Ŀ��)
        this.invokeMagicReflection(subject, target);
    } else {
		//������������(����,Ŀ��)
        this.invokeNormalAction(subject, target);
    }
    //���� /��������Ŀ��
    subject.setLastTarget(target);
    //��־���� ��� ɾ��������
    this._logWindow.push('popBaseLine');
    //ˢ��״̬
    this.refreshStatus();
};
//������������
BattleManager.invokeNormalAction = function(subject, target) {
	//������Ŀ��  =   Ӧ�����(Ŀ��)
    var realTarget = this.applySubstitute(target);
    //���� Ӧ��(������Ŀ��)
    this._action.apply(realTarget);
    //��־���� ��ʾ������� (���� ,������Ŀ�� )
    this._logWindow.displayActionResults(subject, realTarget);
};
//���÷���
BattleManager.invokeCounterAttack = function(subject, target) {
	//���� = �� ��Ϸ����(Ŀ��)
    var action = new Game_Action(target);
    //���� ���ù���
    action.setAttack();
    //���� Ӧ��(����)
    action.apply(subject);
    //��־���� ��ʾ����(Ŀ��)
    this._logWindow.displayCounter(target);
    //��־���� ��ʾ�������(����,����)
    this._logWindow.displayActionResults(subject, subject);
};
//����ħ������
BattleManager.invokeMagicReflection = function(subject, target) {
	//��־���� ��ʾħ������(Ŀ��)
    this._logWindow.displayReflection(target);
    //���� Ӧ��(����)
    this._action.apply(subject);
    //��־���� ��ʾ�������(����,����)
    this._logWindow.displayActionResults(subject, subject);
};
//Ӧ�����
BattleManager.applySubstitute = function(target) {
	//������(Ŀ��)
    if (this.checkSubstitute(target)) {
	    //����� = Ŀ�� ����С�� ���ս��
        var substitute = target.friendsUnit().substituteBattler();
        //��� ( �����(����ߴ���) ) ���� (Ŀ�� ���� ����� )
        if (substitute && target !== substitute) {
	        //��־���� ��ʾ���(�����,Ŀ��)
            this._logWindow.displaySubstitute(substitute, target);
            //���������
            return substitute;
        }
    }
    //���� Ŀ��
    return target;
};
//������
BattleManager.checkSubstitute = function(target) {
	//���� (�Ǳ�����) ���� (���� ���� �Ǳ���)
    return target.isDying() && !this._action.isCertainHit();
};
//��ǿ�ƶ���
BattleManager.isActionForced = function() {
	//���� !!����ǿ��ս���� (����ǿ��ս���� ת��Ϊ true ���� false )
    return !!this._actionForcedBattler;
};
//ǿ�ƶ���
BattleManager.forceAction = function(battler) {
	//����ǿ��ս���� = ս����
    this._actionForcedBattler = battler;
    //���� = ����ս������ ���� ս����
    var index = this._actionBattlers.indexOf(battler);
    //��� ���� >=0
    if (index >= 0) {
	    //����ս������ ɾ�� ����
        this._actionBattlers.splice(index, 1);
    }
};
//����ǿ�ƶ���
BattleManager.processForcedAction = function() {
	//��� ����ǿ��ս���� (����ǿ��ս���� ����)
    if (this._actionForcedBattler) {
	    //���� = ����ǿ��ս����
        this._subject = this._actionForcedBattler;
        //����ǿ��ս���� = null
        this._actionForcedBattler = null;
        //��ʼ����
        this.startAction();
        //���� �Ƴ���ǰ����
        this._subject.removeCurrentAction();
    }
};
//�쳣��ֹ
BattleManager.abort = function() {
	//�׶� ����Ϊ "aborting"  //�쳣
    this._phase = 'aborting';
};
//���ս������
BattleManager.checkBattleEnd = function() {
	//��� �׶�(�׶δ���)
    if (this._phase) {
	    //��� ����쳣��ֹ
        if (this.checkAbort()) {
	        //���� true
            return true;
        //��Ȼ ��� ��Ϸ���� ��ȫ������
        } else if ($gameParty.isAllDead()) {
	        //����ʧ��
            this.processDefeat();
            //���� true 
            return true;
        //��Ȼ ��� ��Ϸ��Ⱥ ��ȫ������
        } else if ($gameTroop.isAllDead()) {
	        //����ʤ��
            this.processVictory();
            //���� true
            return true;
        }
    }
    //���� false
    return false;
};
//����쳣��ֹ
BattleManager.checkAbort = function() {
	//��� (��Ϸ���� �ǿյ�) ���� (���쳣��ֹ) 
    if ($gameParty.isEmpty() || this.isAborting()) {
	    //�����쳣��ֹ
        this.processAbort();
        //���� true
        return true;
    }
    //���� false 
    return false;
};
//����ʤ��
BattleManager.processVictory = function() {
	//��Ϸ���� �Ƴ�ս��״̬
    $gameParty.removeBattleStates();
    //��Ϸ���� ����ʤ��
    $gameParty.performVictory();
    //����ʤ��me
    this.playVictoryMe();
    //����bgm��bgs
    this.replayBgmAndBgs();
    //��������
    this.makeRewards();
    //��ʾʤ����Ϣ
    this.displayVictoryMessage();
    //��ʾ����
    this.displayRewards();
    //��ý���
    this.gainRewards();
    //����ս��(0)
    this.endBattle(0);
};
//��������
BattleManager.processEscape = function() {
	//��Ϸ���� �Ƴ�ս��״̬
    $gameParty.removeBattleStates();
    //��Ϸ���� ��������
    $gameParty.performEscape();
    //���������� ��������
    SoundManager.playEscape();
    //�ɹ� = ��� �ȷ����� Ϊ true ���� Ϊ(����� < ���ܸ���)
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    //��� �ɹ�
    if (success) {
	    //��ʾ���ܳɹ���Ϣ
        this.displayEscapeSuccessMessage();
        //���ܵ� = true 
        this._escaped = true;
        //�����쳣��ֹ
        this.processAbort();
    } else {
	    //��ʾ����ʧ����Ϣ
        this.displayEscapeFailureMessage();
        //���ܸ��� += 0.1
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
    return success;
};
//�����쳣��ֹ
BattleManager.processAbort = function() {
    this.replayBgmAndBgs();
    //����ս��(1)
    this.endBattle(1);
};
//����ʧ��
BattleManager.processDefeat = function() {
    this.displayDefeatMessage();
    this.playDefeatMe();
    if (this._canLose) {
        this.replayBgmAndBgs();
    } else {
        AudioManager.stopBgm();
    }
    //����ս��(2)
    this.endBattle(2);
};
//����ս��
BattleManager.endBattle = function(result) {
	//�׶� ����Ϊ "battleEnd" //ս������
    this._phase = 'battleEnd';
    //��� �¼��ؽ�(�¼��ؽ� ����)
    if (this._eventCallback) {
	    //�¼��ؽ�(result���)
        this._eventCallback(result);
    }
    //��� result��� == 0
    if (result === 0) {
	    //��Ϸϵͳ ��ս��ʤ��
        $gameSystem.onBattleWin();
    //��Ȼ ��� ���ܵ�
    } else if (this._escaped) {
	    //��Ϸϵͳ ��ս������
        $gameSystem.onBattleEscape();
    }
};
//����ս������
BattleManager.updateBattleEnd = function() {
	//��� ��ս������
    if (this.isBattleTest()) {
	    //��Ƶ������ ֹͣbgm
        AudioManager.stopBgm();
        //���������� �˳�
        SceneManager.exit();
    //��Ȼ ��� ��Ϸ���� ��ȫ������
    } else if ($gameParty.isAllDead()) {
	    //��� ��ʧ��
        if (this._canLose) {
	        //��Ϸ���� ����ս����Ա��
            $gameParty.reviveBattleMembers();
            //���������� ĩβ
            SceneManager.pop();
        } else {
	        //���������� ת�� (��Ϸ��������)
            SceneManager.goto(Scene_Gameover);
        }
    //��Ȼ
    } else {
	    //���������� ĩβ
        SceneManager.pop();
    }
    //�׶� ��Ϊ null 
    this._phase = null;
};
//��������
BattleManager.makeRewards = function() {
	//����
    this._rewards = {};
    //���� ��Ǯ = ��Ϸ��Ⱥ ��Ǯ����
    this._rewards.gold = $gameTroop.goldTotal();
    //���� ���� = ��Ϸ��Ⱥ ����ֵ����
    this._rewards.exp = $gameTroop.expTotal();
    //���� ��Ʒ�� = ��Ϸ��Ⱥ ����������Ʒ��
    this._rewards.items = $gameTroop.makeDropItems();
};
//��ʾʤ����Ϣ
BattleManager.displayVictoryMessage = function() {
	//��Ϸ��Ϣ ���(�ı������� ʤ��(�滻(��Ϸ���� ����)) )
    $gameMessage.add(TextManager.victory.format($gameParty.name()));
};
//��ʾʧ����Ϣ
BattleManager.displayDefeatMessage = function() {
	//��Ϸ��Ϣ ���(�ı������� ʧ��(�滻(��Ϸ���� ����)) )
    $gameMessage.add(TextManager.defeat.format($gameParty.name()));
};
///��ʾ���ܳɹ���Ϣ
BattleManager.displayEscapeSuccessMessage = function() {
	//��Ϸ��Ϣ ���(�ı������� ���ܿ�ʼ(�滻(��Ϸ���� ����)) )
    $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
};
//��ʾ����ʧ����Ϣ
BattleManager.displayEscapeFailureMessage = function() {
	//��Ϸ��Ϣ ���(�ı������� ���ܿ�ʼ(�滻(��Ϸ���� ����)) )
    $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
	//��Ϸ��Ϣ ���( ��ʾ����ʱ�ȴ��ķ�֮һ�� + �ı������� ����ʧ��(�滻(��Ϸ���� ����)) )
    $gameMessage.add('\\.' + TextManager.escapeFailure);
};
//��ʾ����
BattleManager.displayRewards = function() {
	//��ʾ����ֵ
    this.displayExp();
	//��ʾ��Ǯ
    this.displayGold();
	//��ʾ������Ʒ��
    this.displayDropItems();
};
//��ʾ����ֵ
BattleManager.displayExp = function() {
	//����ֵ = ���� ����ֵ
    var exp = this._rewards.exp;
    //��� ����ֵ >0
    if (exp > 0) {
	    //�ı� = �ı������� ��þ���ֵ(�滻(����ֵ , �ı������� ����ֵ))
        var text = TextManager.obtainExp.format(exp, TextManager.exp);
		//��Ϸ��Ϣ ���( ��ʾ����ʱ�ȴ��ķ�֮һ�� + �ı�   )
        $gameMessage.add('\\.' + text);
    }
};
//��ʾ��Ǯ
BattleManager.displayGold = function() {
	//��Ǯ = ���� ��Ǯ
    var gold = this._rewards.gold;
    //��� ��Ǯ > 0
    if (gold > 0) {
		//��Ϸ��Ϣ ���( ��ʾ����ʱ�ȴ��ķ�֮һ�� + �ı������� ��ý�Ǯ(�滻(��Ǯ) ) )
        $gameMessage.add('\\.' + TextManager.obtainGold.format(gold));
    }
};
//��ʾ������Ʒ��
BattleManager.displayDropItems = function() {
	//��Ʒ�� = ���� ��Ʒ��
    var items = this._rewards.items;
    //��� ��Ʒ�� ���� > 0
    if (items.length > 0) {
	    //��Ϸ��Ϣ ��ҳ
        $gameMessage.newPage();
        //��Ʒ�� ��ÿһ�� ��Ʒ
        items.forEach(function(item) {
			//��Ϸ��Ϣ ���(  �ı������� �����Ʒ(�滻(��Ʒ ����) ) )
            $gameMessage.add(TextManager.obtainItem.format(item.name));
        });
    }
};
//��ý���
BattleManager.gainRewards = function() {
	//��þ���ֵ
    this.gainExp();
	//��ý�Ǯ
    this.gainGold();
	//��õ�����Ʒ��
    this.gainDropItems();
};
//��þ���ֵ
BattleManager.gainExp = function() {
	//����ֵ = ���� ����ֵ
    var exp = this._rewards.exp;
    //��Ϸ���� ���г�Ա�� ��ÿһ�� ��ɫ 
    $gameParty.allMembers().forEach(function(actor) {
	    //��ɫ ��þ���ֵ(����ֵ)
        actor.gainExp(exp);
    });
};
//��ý�Ǯ
BattleManager.gainGold = function() {
	//��Ϸ���� ��ý�Ǯ(���� ��Ǯ)
    $gameParty.gainGold(this._rewards.gold);
};
//��õ�����Ʒ��
BattleManager.gainDropItems = function() {
	//��Ʒ�� = ���� ��Ʒ��
    var items = this._rewards.items;
    //��Ʒ�� ��ÿһ�� ��Ʒ
    items.forEach(function(item) {
	    //��Ϸ���� �����Ʒ (��Ʒ,1)
        $gameParty.gainItem(item, 1);
    });
};
