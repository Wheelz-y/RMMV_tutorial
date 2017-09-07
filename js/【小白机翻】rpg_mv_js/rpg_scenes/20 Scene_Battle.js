
//-----------------------------------------------------------------------------
// Scene_Battle
// ս������
// The scene class of the battle screen.
// ���� ս������� ������

function Scene_Battle() {
	//���� ��ʼ��
    this.initialize.apply(this, arguments);
}
//����ԭ�� 
Scene_Battle.prototype = Object.create(Scene_Base.prototype);
//���ô�����
Scene_Battle.prototype.constructor = Scene_Battle;
//��ʼ��
Scene_Battle.prototype.initialize = function() {
	//�̳� �������� ��ʼ��
    Scene_Base.prototype.initialize.call(this);
};
//���� 
Scene_Battle.prototype.create = function() {
	//�̳� �������� ����
    Scene_Base.prototype.create.call(this);
    //������ʾ����
    this.createDisplayObjects();
};
//��ʼ
Scene_Battle.prototype.start = function() {
	//�̳� �������� ��ʼ
    Scene_Base.prototype.start.call(this);
    //��ʼ����(��������,false)
    this.startFadeIn(this.fadeSpeed(), false);
    //ս�������� ����ս��bgm
    BattleManager.playBattleBgm();
    //ս�������� ��ʼս��
    BattleManager.startBattle();
};
//����
Scene_Battle.prototype.update = function() {
    var active = this.isActive();
    //��Ϸʱ�� ����(�ǻ?)
    $gameTimer.update(active);
    //��Ϸ���� ����
    $gameScreen.update();
    //���� ״̬����
    this.updateStatusWindow();
    //���� ����λ��
    this.updateWindowPositions();
    //��� �ǻ ���� ���� ��æµ
    if (active && !this.isBusy()) {
	    //���� ս������
        this.updateBattleProcess();
    }
    //�̳� �������� ����
    Scene_Base.prototype.update.call(this);
};
//���� ս������
Scene_Battle.prototype.updateBattleProcess = function() {
	//��� (���� ���κ����봰�ڻ) ����  ս�����������쳣��ֹ�� �� ս�������� ��ս������
    if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
	    //ս�������� ����
        BattleManager.update();
        //�ı����봰��
        this.changeInputWindow();
    }
};
//���κ����봰�ڻ 
Scene_Battle.prototype.isAnyInputWindowActive = function() {
	//��������� �
    return (this._partyCommandWindow.active ||
            //��ɫ����� �
            this._actorCommandWindow.active ||
            //���ܴ��� �
            this._skillWindow.active ||
            //��Ʒ���ڻ
            this._itemWindow.active ||
            //��ɫ���ڻ
            this._actorWindow.active ||
            //���˴��ڻ
            this._enemyWindow.active);
};
//�ı����봰��
Scene_Battle.prototype.changeInputWindow = function() {
	//ս�������� ��������
    if (BattleManager.isInputting()) {
	    //��� ս�������� ��ɫ
        if (BattleManager.actor()) {
	        //��ʼ��ɫ����ѡ��
            this.startActorCommandSelection();
        } else {
	        //��ʼ��������ѡ��
            this.startPartyCommandSelection();
        }
    } else {
	    //��������ѡ��
        this.endCommandSelection();
    }
};
//ֹͣ
Scene_Battle.prototype.stop = function() {
	//�̳� �������� ֹͣ
    Scene_Base.prototype.stop.call(this);
    //��� ��Ҫ��������
    if (this.needsSlowFadeOut()) {
	    //��ʼ����(������������,false)
        this.startFadeOut(this.slowFadeSpeed(), false);
    } else {
	    //��ʼ����(��������,false)
        this.startFadeOut(this.fadeSpeed(), false);
    }
    //״̬���� �ر�
    this._statusWindow.close();
    //��������� �ر�
    this._partyCommandWindow.close();
    //��ɫ����� �ر�
    this._actorCommandWindow.close();
};
//����
Scene_Battle.prototype.terminate = function() {
	//�̳� �������� ����
    Scene_Base.prototype.terminate.call(this);
    //��Ϸ���� ��ս������
    $gameParty.onBattleEnd();
    //��Ϸ��Ⱥ ��ս������
    $gameTroop.onBattleEnd();
    //��Ƶ������ ֹͣ me
    AudioManager.stopMe();
};
//��Ҫ��������
Scene_Battle.prototype.needsSlowFadeOut = function() {
	//���������� ��һ������ �Ǳ��ⳡ�� �� 
    return (SceneManager.isNextScene(Scene_Title) ||
            //���������� ��һ������ ����Ϸ��������
            SceneManager.isNextScene(Scene_Gameover));
};
//���� ״̬����
Scene_Battle.prototype.updateStatusWindow = function() {
	//��� ��Ϸ������ �Ƿ�æ��
    if ($gameMessage.isBusy()) {
	    //״̬���� �ر� 
        this._statusWindow.close();
        //��������� �ر�
        this._partyCommandWindow.close();
        //��ɫ����� �ر�
        this._actorCommandWindow.close();
      //��� �ǻ ���� ���� ��Ϣ�����ǹر� 
    } else if (this.isActive() && !this._messageWindow.isClosing()) {
	    //״̬���ڴ�
        this._statusWindow.open();
    }
};
//���� ����λ��
Scene_Battle.prototype.updateWindowPositions = function() {
    var statusX = 0;
    // ��� ս�������� ��������
    if (BattleManager.isInputting()) {
	    //statusX ����Ϊ ��������� ��
        statusX = this._partyCommandWindow.width;
    } else {
	    //statusX ����Ϊ  ��������� ��/2
        statusX = this._partyCommandWindow.width / 2;
    }
    //��� ״̬���� �� x <  statusX 
    if (this._statusWindow.x < statusX) {
	    //״̬���� �� x + 16
        this._statusWindow.x += 16;
        //��� ״̬���� �� x > statusX 
        if (this._statusWindow.x > statusX) {
	        //״̬���� �� x ����Ϊ statusX
            this._statusWindow.x = statusX;
        }
    }
    //��� ״̬���� �� x >  statusX
    if (this._statusWindow.x > statusX) {
	    //״̬���� �� x - 16
        this._statusWindow.x -= 16;
        //��� ״̬���� �� x < statusX 
        if (this._statusWindow.x < statusX) {
	        //״̬���� �� x ����Ϊ statusX
            this._statusWindow.x = statusX;
        }
    }
};
//������ʾ����
Scene_Battle.prototype.createDisplayObjects = function() {
	//���� ����
    this.createSpriteset();
    //���� ���ڲ�
    this.createWindowLayer();
    //���� ���д��� 
    this.createAllWindows();
    //ս�������� ���� ��¼����
    BattleManager.setLogWindow(this._logWindow);
    //ս�������� ���� ״̬ ����
    BattleManager.setStatusWindow(this._statusWindow);
    //ս�������� ���� ����
    BattleManager.setSpriteset(this._spriteset);
    //��¼���� ���� ����
    this._logWindow.setSpriteset(this._spriteset);
};
//��������
Scene_Battle.prototype.createSpriteset = function() {
	//���� ս������
    this._spriteset = new Spriteset_Battle();
    //���� ��ӵ� �Ӵ�
    this.addChild(this._spriteset);
};
//�������д��� 
Scene_Battle.prototype.createAllWindows = function() {
	//������¼����
    this.createLogWindow();
    //����״̬����
    this.createStatusWindow();
    //�������������
    this.createPartyCommandWindow();
    //������ɫ�����
    this.createActorCommandWindow();
    //������������
    this.createHelpWindow();
    //�������ܴ���
    this.createSkillWindow();
    //������Ʒ����
    this.createItemWindow();
    //������ɫ����
    this.createActorWindow();
    //�������˴���
    this.createEnemyWindow();
    //������Ϣ����
    this.createMessageWindow();
    //�����������ִ���
    this.createScrollTextWindow();
};
//������¼����
Scene_Battle.prototype.createLogWindow = function() {
	//���� ս����¼
    this._logWindow = new Window_BattleLog();
    //��Ӵ���(��¼����) 
    this.addWindow(this._logWindow);
};
//����״̬����
Scene_Battle.prototype.createStatusWindow = function() {
	//���� ״̬����
    this._statusWindow = new Window_BattleStatus();
    //��Ӵ���(״̬����) 
    this.addWindow(this._statusWindow);
};
//�������������
Scene_Battle.prototype.createPartyCommandWindow = function() {
	//���� ���������
    this._partyCommandWindow = new Window_PartyCommand();
    //��������� ���ô��� ('fight',���� ս��)
    this._partyCommandWindow.setHandler('fight',  this.commandFight.bind(this));
    //��������� ���ô��� ('escape',���� ����)
    this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
    //��������� ȡ��ѡ��
    this._partyCommandWindow.deselect();
    //��Ӵ���(���������) 
    this.addWindow(this._partyCommandWindow);
};
//������ɫ�����
Scene_Battle.prototype.createActorCommandWindow = function() {
	//���� ��ɫ�����
    this._actorCommandWindow = new Window_ActorCommand();
    //��������� ���ô��� ('attack',���� ����) 
    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    //��������� ���ô��� ('skill',���� ����) 
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    //��������� ���ô��� ('guard',���� ����) 
    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    //��������� ���ô��� ('item',���� ��Ʒ) 
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
    //��������� ���ô��� ('cancel',ѡ��֮ǰ����) 
    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    //��Ӵ���(��ɫ�����) 
    this.addWindow(this._actorCommandWindow);
};
//������������
Scene_Battle.prototype.createHelpWindow = function() {
	//���� ��������
    this._helpWindow = new Window_Help();
    //�������� ��Ϊ ���ɼ� 
    this._helpWindow.visible = false;
    //��Ӵ���(��������) 
    this.addWindow(this._helpWindow);
};
//�������ܴ���
Scene_Battle.prototype.createSkillWindow = function() {
	//wy ����Ϊ �������� �� y + �������� �� �� height
    var wy = this._helpWindow.y + this._helpWindow.height;
    //wh ����Ϊ ״̬���� �� y - wy
    var wh = this._statusWindow.y - wy;
    //���� ״̬����
    this._skillWindow = new Window_BattleSkill(0, wy, Graphics.boxWidth, wh);
    //���ܴ��� ���ð�������
    this._skillWindow.setHelpWindow(this._helpWindow);
    //���ܴ��� ���ô��� ('ok',�� ���� ȷ��) 
    this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
    //���ܴ��� ���ô��� ('cancel',�� ���� ȡ��)
    this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
    //��Ӵ���(���ܴ���) 
    this.addWindow(this._skillWindow);
};
//������Ʒ����
Scene_Battle.prototype.createItemWindow = function() {
    var wy = this._helpWindow.y + this._helpWindow.height;
    var wh = this._statusWindow.y - wy;
    this._itemWindow = new Window_BattleItem(0, wy, Graphics.boxWidth, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    //��Ӵ���(��Ʒ����) 
    this.addWindow(this._itemWindow);
};
//������ɫ����
Scene_Battle.prototype.createActorWindow = function() {
	//���� ��ɫ����
    this._actorWindow = new Window_BattleActor(0, this._statusWindow.y);
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    //��Ӵ���(��ɫ����) 
    this.addWindow(this._actorWindow);
};
//�������˴���
Scene_Battle.prototype.createEnemyWindow = function() {
	//���� ���˴���
    this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
    this._enemyWindow.x = Graphics.boxWidth - this._enemyWindow.width;
    this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
    this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
    //��Ӵ���(���˴���) 
    this.addWindow(this._enemyWindow);
};
//���� ��Ϣ����
Scene_Battle.prototype.createMessageWindow = function() {
	//������Ϣ����
    this._messageWindow = new Window_Message();
    //��Ӵ���(��Ϣ����) 
    this.addWindow(this._messageWindow);
    //��Ϣ���� ������� ��ÿһ�� ���� 
    this._messageWindow.subWindows().forEach(function(window) {
	    //��Ӵ���(����)
        this.addWindow(window);
    }, this);
};
//���� �������ִ���
Scene_Battle.prototype.createScrollTextWindow = function() {
	//���ù������ִ���
    this._scrollTextWindow = new Window_ScrollText();
    //��Ӵ���(�������ִ���)
    this.addWindow(this._scrollTextWindow);
};
//ˢ��״̬
Scene_Battle.prototype.refreshStatus = function() {
	//״̬���� ˢ��
    this._statusWindow.refresh();
};
//��ʼ��������ѡ��
Scene_Battle.prototype.startPartyCommandSelection = function() {
	//ˢ��״̬
    this.refreshStatus();
    //״̬���� ȡ��ѡ��
    this._statusWindow.deselect();
    //״̬���� ��
    this._statusWindow.open();
    //��ɫ����� �ر�
    this._actorCommandWindow.close();
    //��������� ����
    this._partyCommandWindow.setup();
};
//���� ս��
Scene_Battle.prototype.commandFight = function() {
	//ѡ����һ������
    this.selectNextCommand();
};
//���� ����
Scene_Battle.prototype.commandEscape = function() {
	//ս�������� ��������
    BattleManager.processEscape();
    //�ı����봰��
    this.changeInputWindow();
};
//��ʼ��ɫ����ѡ��
Scene_Battle.prototype.startActorCommandSelection = function() {
	//״̬���� ѡ�� (ս�������� ��ɫ �� ����)
    this._statusWindow.select(BattleManager.actor().index());
    //��������� �ر�
    this._partyCommandWindow.close();
    //��ɫ����� ���� (ս�������� ��ɫ )
    this._actorCommandWindow.setup(BattleManager.actor());
};
//���� ����
Scene_Battle.prototype.commandAttack = function() {
	//ս�������� �����ɫ ���ù���
    BattleManager.inputtingAction().setAttack();
    //ѡ�� ����ѡ��
    this.selectEnemySelection();
};
//���� ����
Scene_Battle.prototype.commandSkill = function() {
	//���ܴ��� ���ý�ɫ(ս�������� ��ɫ)
    this._skillWindow.setActor(BattleManager.actor());
    //���ܴ��� ���� StypeId(��ɫѡ�񴰿� ��ǰ�� ��ȡ)
    this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
    //���ܴ��� ˢ��
    this._skillWindow.refresh();
    //���ܴ��� ��ʾ
    this._skillWindow.show();
    //���ܴ��� �
    this._skillWindow.activate();
};
//���� ����
Scene_Battle.prototype.commandGuard = function() {
	//ս�������� �����ɫ ���÷���
    BattleManager.inputtingAction().setGuard();
    //ѡ����һ������
    this.selectNextCommand();
};
//���� ��Ʒ
Scene_Battle.prototype.commandItem = function() {
	//��Ʒ���� ˢ��
    this._itemWindow.refresh();
    //��Ʒ���� ��ʾ
    this._itemWindow.show();
    //��Ʒ���� �
    this._itemWindow.activate();
};
//ѡ����һ������
Scene_Battle.prototype.selectNextCommand = function() {
	//ս�������� ѡ����һ������
    BattleManager.selectNextCommand();
    //�ı����봰��
    this.changeInputWindow();
};
//ѡ��֮ǰ����
Scene_Battle.prototype.selectPreviousCommand = function() {
	//ս�������� ѡ��֮ǰ����
    BattleManager.selectPreviousCommand();
    //�ı����봰��
    this.changeInputWindow();
};
//ѡ�� ��ɫѡ��
Scene_Battle.prototype.selectActorSelection = function() {
	//��ɫ���� ˢ��
    this._actorWindow.refresh();
    //��ɫ���� ��ʾ
    this._actorWindow.show();
    //��ɫ���� �
    this._actorWindow.activate();
};
//�� ��ɫ ȷ��
Scene_Battle.prototype.onActorOk = function() {
	// action ����Ϊ ս�������� ���붯��
    var action = BattleManager.inputtingAction();
    // action ����Ŀ�� (��ɫ��������)
    action.setTarget(this._actorWindow.index());
    //��ɫ���� ����
    this._actorWindow.hide();
    //���ܴ��� ����
    this._skillWindow.hide();
    //��Ʒ���� ����
    this._itemWindow.hide();
    //ѡ����һ������
    this.selectNextCommand();
};
//�� ��ɫ ȡ��
Scene_Battle.prototype.onActorCancel = function() {
	//��ɫ���� ����
    this._actorWindow.hide();
    //��ɫ����� ��ǰ�ķ���
    switch (this._actorCommandWindow.currentSymbol()) {
	//�� ����
    case 'skill':
        //���ܴ��� ��ʾ
        this._skillWindow.show();
        //���ܴ��� � 
        this._skillWindow.activate();
        break;
    //�� ��Ʒ
    case 'item':
        //��Ʒ���� ��ʾ
        this._itemWindow.show();
        //��Ʒ���� �
        this._itemWindow.activate();
        break;
    }
};
//ѡ�� ����ѡ��
Scene_Battle.prototype.selectEnemySelection = function() {
	//���˴��� ˢ��
    this._enemyWindow.refresh();
    //���˴��� ��ʾ
    this._enemyWindow.show();
    //���˴��� ѡ��(0)
    this._enemyWindow.select(0);
    //���˴��� �
    this._enemyWindow.activate();
};
//�� ���� ȷ��
Scene_Battle.prototype.onEnemyOk = function() {
	//action ����Ϊ ս�������� ���붯��
    var action = BattleManager.inputtingAction();
    //action ����Ŀ�� (���˴��� �� ��������)
    action.setTarget(this._enemyWindow.enemyIndex());
    //���˴��� ����
    this._enemyWindow.hide();
    //���ܴ��� ����
    this._skillWindow.hide();
    //��Ʒ���� ����
    this._itemWindow.hide();
    //ѡ����һ������
    this.selectNextCommand();
};
//�� ���� ȡ��
Scene_Battle.prototype.onEnemyCancel = function() {
	//���˴��� ����
    this._enemyWindow.hide();
    //��ɫ����� ��ǰ�ķ���
    switch (this._actorCommandWindow.currentSymbol()) {
	// ����
    case 'attack':
        //��ɫ����� �
        this._actorCommandWindow.activate();
        break;
    //����
    case 'skill':
        //���ܴ��� ��ʾ
        this._skillWindow.show();
        //���ܴ��� �
        this._skillWindow.activate();
        break;
    //��Ʒ
    case 'item':
        //��Ʒ���� ��ʾ
        this._itemWindow.show();
        //��Ʒ���� �
        this._itemWindow.activate();
        break;
    }
};
//�� ���� ȷ��
Scene_Battle.prototype.onSkillOk = function() {
	// skill ����Ϊ ���ܴ��� ��Ŀ
    var skill = this._skillWindow.item();
    // action ����Ϊ ս�������� ���붯��
    var action = BattleManager.inputtingAction();
    // action ���� ���� (skill��id)
    action.setSkill(skill.id);
    //ս�������� ��ɫ ��������ս������(skill)
    BattleManager.actor().setLastBattleSkill(skill);
    //�� ѡ�� ����
    this.onSelectAction();
};
//�� ���� ȡ��
Scene_Battle.prototype.onSkillCancel = function() {
	//���ܴ��� ����
    this._skillWindow.hide();
    //��ɫ����� �
    this._actorCommandWindow.activate();
};
//�� ��Ʒ ȷ��
Scene_Battle.prototype.onItemOk = function() {
	// item ����Ϊ ��Ʒ���ڵ� ��Ŀ
    var item = this._itemWindow.item();
    // action ����Ϊ ս�������� ���붯��
    var action = BattleManager.inputtingAction();
    // action ������Ʒ(item ��id)
    action.setItem(item.id);
    //��Ϸ���� ����������Ʒ(item)
    $gameParty.setLastItem(item);
    //�� ѡ�� ����
    this.onSelectAction();
};
//�� ��Ʒ ȡ��
Scene_Battle.prototype.onItemCancel = function() {
	//��Ʒ���� ����
    this._itemWindow.hide();
    //��ɫ����� �
    this._actorCommandWindow.activate();
};
//�� ѡ�� ����
Scene_Battle.prototype.onSelectAction = function() {
	// action ����Ϊ ս�������� ���붯��
    var action = BattleManager.inputtingAction();
    //���ܴ��� ����
    this._skillWindow.hide();
    //��Ʒ���� ����
    this._itemWindow.hide();
    //��� ���� action��Ҫѡ��
    if (!action.needsSelection()) {
	    //ѡ����һ������
        this.selectNextCommand();
        //��� action �� ���ڵ���
    } else if (action.isForOpponent()) {
	    //ѡ�� ����ѡ��
        this.selectEnemySelection();
    } else {
	    //ѡ�� ��ɫѡ��
        this.selectActorSelection();
    }
};
//��������ѡ��
Scene_Battle.prototype.endCommandSelection = function() {
	//��������� �ر�
    this._partyCommandWindow.close();
    //��ɫ����� �ر�
    this._actorCommandWindow.close();
    //״̬����� ȡ��ѡ��
    this._statusWindow.deselect();
};
