
//-----------------------------------------------------------------------------
// Scene_Map
// ��ͼ����
// The scene class of the map screen.
// ���� ��ͼ���� �� ������

function Scene_Map() {
    this.initialize.apply(this, arguments);
}
//����ԭ�� 
Scene_Map.prototype = Object.create(Scene_Base.prototype);
//���ô�����
Scene_Map.prototype.constructor = Scene_Map;
//��ʼ��
Scene_Map.prototype.initialize = function() {
	//�̳� �������� ��ʼ��
    Scene_Base.prototype.initialize.call(this);
    //�ȴ����� = 0
    this._waitCount = 0;
    //����Ч������ʱ�� = 0 
    this._encounterEffectDuration = 0;
    //��ͼ��ȡ�� = false
    this._mapLoaded = false;
    //�������� = 0
    this._touchCount = 0;
};
//����
Scene_Map.prototype.create = function() {
	//�̳� �������� ����
    Scene_Base.prototype.create.call(this);
    //���� = ��Ϸ��Ϸ�� �Ǵ�����
    this._transfer = $gamePlayer.isTransferring();
    //��ͼid = ��� ���� Ϊ ��Ϸ��Ϸ�� �µ�ͼid ����Ϊ ��Ϸ��ͼ ��ͼid
    var mapId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();
    //���ݹ����� ��ȡ��ͼ����(��ͼid)
    DataManager.loadMapData(mapId);
};
//��׼����
Scene_Map.prototype.isReady = function() {
	//��� (���� ��ͼ��ȡ��) ���� (���ݹ����� �ǵ�ͼ��ȡ��) //��ͼ���ݶ�ȡ�� ����ͼδ��ȡ�� ʱ��
    if (!this._mapLoaded && DataManager.isMapLoaded()) {
	    //����ͼ��ȡ���
        this.onMapLoaded();
        //��ͼ��ȡ�� = true
        this._mapLoaded = true;
    }
    //���� (��ͼ��ȡ��) ���� (�̳� �������� ��׼����)
    return this._mapLoaded && Scene_Base.prototype.isReady.call(this);
};
//����ͼ��ȡ���
Scene_Map.prototype.onMapLoaded = function() {
	//��� ����
    if (this._transfer) {
	    //��Ϸ��Ϸ�� ���ִ���
        $gamePlayer.performTransfer();
    }
    //������ʾ���� 
    this.createDisplayObjects();
};
//��ʼ
Scene_Map.prototype.start = function() {
	//�̳� �������� ��ʼ
    Scene_Base.prototype.start.call(this);
    //���������� �����
    SceneManager.clearStack();
    //��� ����
    if (this._transfer) {
	    //����Ϊ����
        this.fadeInForTransfer();
        //��ͼ���ƴ��� ��
        this._mapNameWindow.open();
        //��Ϸ��ͼ �Զ�����
        $gameMap.autoplay();
    //��Ȼ ��� ��Ҫ����
    } else if (this.needsFadeIn()) {
	    //��ʼ����(��������,false)
        this.startFadeIn(this.fadeSpeed(), false);
    }
    //���ں����� = false
    this.menuCalling = false;
};
//����
Scene_Map.prototype.update = function() {
	//����Ŀ�ĵ�
    this.updateDestination();
    //������Ҫ ����
    this.updateMainMultiply();
    //��� �ǳ����ı�ȷ��
    if (this.isSceneChangeOk()) {
	    //���³���
        this.updateScene();
    //��Ȼ ��� ���������� ����һ������(ս������)
    } else if (SceneManager.isNextScene(Scene_Battle)) {
	    //��������Ч��
        this.updateEncounterEffect();
    }
    //���µȴ�����
    this.updateWaitCount();
    //�̳� �������� ����
    Scene_Base.prototype.update.call(this);
};
//������Ҫ ����
Scene_Map.prototype.updateMainMultiply = function() {
	//������Ҫ
    this.updateMain();
    //��� �ǿ��ٽ���
    if (this.isFastForward()) {
	    //������Ҫ
        this.updateMain();
    }
};
//������Ҫ
Scene_Map.prototype.updateMain = function() {
	//� = �ǻ
    var active = this.isActive();
    //��Ϸ��ͼ ����(�)
    $gameMap.update(active);
    //��Ϸ��Ϸ�� ����(�)
    $gamePlayer.update(active);
    //��Ϸ��ʱ ����(�)
    $gameTimer.update(active);
    //��Ϸ���� ����
    $gameScreen.update();
};
//�ǿ��ٽ���
Scene_Map.prototype.isFastForward = function() {
	//���� (��Ϸ��ͼ ���¼�������) ���� (���� ���������� �ǳ����ı���) ���� (���� �ǳ���"ok" ���� ���� �ǳ���)
    return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() &&
            (Input.isLongPressed('ok') || TouchInput.isLongPressed()));
};
//ֹͣ
Scene_Map.prototype.stop = function() {
	//�̳� �������� ֹͣ
    Scene_Base.prototype.stop.call(this);
    //��Ϸ��Ϸ�� ����
    $gamePlayer.straighten();
    //��ͼ���ƴ��� �ر�
    this._mapNameWindow.close();
    //��� ��Ҫ��������
    if (this.needsSlowFadeOut()) {
	    //��ʼ���� (������������ ,false)
        this.startFadeOut(this.slowFadeSpeed(), false);
    //��Ȼ ��� ���������� ����һ������(��ͼ����)
    } else if (SceneManager.isNextScene(Scene_Map)) {
	    //����Ϊ�˴���
        this.fadeOutForTransfer();
    //��Ȼ ��� ���������� ����һ������(ս������)
    } else if (SceneManager.isNextScene(Scene_Battle)) {
	    //��ʼս��
        this.launchBattle();
    }
};
//��æµ
Scene_Map.prototype.isBusy = function() {
	//���� ((��Ϣ���� ���� ��Ϣ�����ǹر���) ���� �ȴ�����>0 ���� ����Ч������ʱ�� >0 ���� �̳м̳г��� ��æµ)
    return ((this._messageWindow && this._messageWindow.isClosing()) ||
            this._waitCount > 0 || this._encounterEffectDuration > 0 ||
            Scene_Base.prototype.isBusy.call(this));
};
//��ֹ
Scene_Map.prototype.terminate = function() {
	//�̳� �������� ��ֹ
    Scene_Base.prototype.terminate.call(this);
    //��� ���� ���������� ����һ������(ս������)
    if (!SceneManager.isNextScene(Scene_Battle)) {
	    //������ ����
        this._spriteset.update();
        //��ͼ���ƴ��� ����
        this._mapNameWindow.hide();
        //���������� ����Ϊ�˱���
        SceneManager.snapForBackground();
    }
    //��Ϸ���� �������
    $gameScreen.clearZoom();
};
//��Ҫ����
Scene_Map.prototype.needsFadeIn = function() {
	//���� (���������� ��֮ǰ�ĳ���(ս������)����(��ȡ����) )
    return (SceneManager.isPreviousScene(Scene_Battle) ||
            SceneManager.isPreviousScene(Scene_Load));
};
//��Ҫ����
Scene_Map.prototype.needsSlowFadeOut = function() {
	//����  (���������� ����һ������(���ⳡ��)����(��Ϸ��������) )
    return (SceneManager.isNextScene(Scene_Title) ||
            SceneManager.isNextScene(Scene_Gameover));
};
//���µȴ�����
Scene_Map.prototype.updateWaitCount = function() {
	//��� �ȴ����� >0
    if (this._waitCount > 0) {
	    //�ȴ����� --
        this._waitCount--;
        //���� true
        return true;
    }
    //���� false
    return false;
};
//����Ŀ�ĵ�
Scene_Map.prototype.updateDestination = function() {
	//��� �ǵ�ͼ����ȷ��
    if (this.isMapTouchOk()) {
	    //���̵�ͼ����
        this.processMapTouch();
    } else {
	    //��Ϸ��ʱ ���Ŀ�ĵ�
        $gameTemp.clearDestination();
        //�������� = 0
        this._touchCount = 0;
    }
};
//�ǵ�ͼ����ȷ��
Scene_Map.prototype.isMapTouchOk = function() {
	//���� �ǻ ���� ��Ϸ��Ϸ�� ���ƶ�
    return this.isActive() && $gamePlayer.canMove();
};
//���̵�ͼ����
Scene_Map.prototype.processMapTouch = function() {
	//���( �������� �Ǹհ��� ���� �������� >0) 
    if (TouchInput.isTriggered() || this._touchCount > 0) {
	    //��� �������� �ǰ���
        if (TouchInput.isPressed()) {
	        //��� (��������== 0 ���� �������� >= 15)
            if (this._touchCount === 0 || this._touchCount >= 15) {
	            //x = ��Ϸ��ͼ ���浽��ͼx (��������x)
                var x = $gameMap.canvasToMapX(TouchInput.x);
	            //y = ��Ϸ��ͼ ���浽��ͼy (��������y)
                var y = $gameMap.canvasToMapY(TouchInput.y);
                //��Ϸ��ʱ ����Ŀ�ĵ� (x,y)
                $gameTemp.setDestination(x, y);
            }
            //�������� ++
            this._touchCount++;
        } else {
	        //�������� = 0
            this._touchCount = 0;
        }
    }
};
//�ǳ����ı�ȷ��
Scene_Map.prototype.isSceneChangeOk = function() {
	//���� �ǻ ���� ���� ��Ϸ��Ϣ ��æµ
    return this.isActive() && !$gameMessage.isBusy();
};
//���³���
Scene_Map.prototype.updateScene = function() {
	//�����Ϸ����
    this.checkGameover();
    //��� ���� ���������� �ǳ����ı���
    if (!SceneManager.isSceneChanging()) {
	    //����ת�ƽ�ɫ
        this.updateTransferPlayer();
    }
    //��� ���� ���������� �ǳ����ı���
    if (!SceneManager.isSceneChanging()) {
	    //��������
        this.updateEncounter();
    }
    //��� ���� ���������� �ǳ����ı���
    if (!SceneManager.isSceneChanging()) {
	    //���º��в˵�
        this.updateCallMenu();
    }
    //��� ���� ���������� �ǳ����ı���
    if (!SceneManager.isSceneChanging()) {
	    //���º��е���
        this.updateCallDebug();
    }
};
//������ʾ����
Scene_Map.prototype.createDisplayObjects = function() {
	//����������
    this.createSpriteset();
	//������ͼ���ƴ���
    this.createMapNameWindow();
    //�������ڲ�
    this.createWindowLayer();
	//�������д���
    this.createAllWindows();
};
//����������
Scene_Map.prototype.createSpriteset = function() {
	//��ͼ������
    this._spriteset = new Spriteset_Map();
    //����Ӵ�(��ͼ������)
    this.addChild(this._spriteset);
};
//�������д���
Scene_Map.prototype.createAllWindows = function() {
	//������Ϣ����
    this.createMessageWindow();
    //���������ı�����
    this.createScrollTextWindow();
};
//������ͼ���ƴ���
Scene_Map.prototype.createMapNameWindow = function() {
	//��ͼ���ƴ���
    this._mapNameWindow = new Window_MapName();
    //����Ӵ�(��ͼ���ƴ���)
    this.addChild(this._mapNameWindow);
};
//������Ϣ����
Scene_Map.prototype.createMessageWindow = function() {
	//��Ϣ����
    this._messageWindow = new Window_Message();
    //��Ӵ���(��Ϣ����)
    this.addWindow(this._messageWindow);
    ///��Ϣ���� ������� ��ÿһ�� ����
    this._messageWindow.subWindows().forEach(function(window) {
	    //��Ӵ���(����)
        this.addWindow(window);
    }, this);
};
//���������ı�����
Scene_Map.prototype.createScrollTextWindow = function() {
	//���ù������ִ���
    this._scrollTextWindow = new Window_ScrollText();
    //��Ӵ���(�������ִ���)
    this.addWindow(this._scrollTextWindow);
};
//����ת�ƽ�ɫ
Scene_Map.prototype.updateTransferPlayer = function() {
	//��� ��Ϸ��Ϸ�� �Ǵ�����
    if ($gamePlayer.isTransferring()) {
	    //���������� ת��(��ͼ����)
        SceneManager.goto(Scene_Map);
    }
};
//��������
Scene_Map.prototype.updateEncounter = function() {
	//��� ��Ϸ��Ϸ�� ִ������
    if ($gamePlayer.executeEncounter()) {
	    //���������� ���(ս������)
        SceneManager.push(Scene_Battle);
    }
};
//���º��в˵�
Scene_Map.prototype.updateCallMenu = function() {
	//��� ���ܹ��˵�
    if (this.isMenuEnabled()) {
	    //��� �ǲ˵����к�
        if (this.isMenuCalled()) {
	        //�˵������� = true
            this.menuCalling = true;
        }
        //��� (�˵�������) ���� (���� ��Ϸ��Ϸ�� ���ƶ���)
        if (this.menuCalling && !$gamePlayer.isMoving()) {
	        //���в˵�
            this.callMenu();
        }
    } else {
	    //�˵������� = false
        this.menuCalling = false;
    }
};
//���ܹ��˵�
Scene_Map.prototype.isMenuEnabled = function() {
	//���� (��Ϸϵͳ ���ܹ��˵�) ���� (���� ��Ϸ��ͼ ���¼�������)
    return $gameSystem.isMenuEnabled() && !$gameMap.isEventRunning();
};
//�ǲ˵����к�
Scene_Map.prototype.isMenuCalled = function() {
	//���� ���� �հ��� �˵� ���� �������� ��ȡ��
    return Input.isTriggered('menu') || TouchInput.isCancelled();
};
//���в˵�
Scene_Map.prototype.callMenu = function() {
	//���������� ����ok
    SoundManager.playOk();
    //���������� ��� (�˵�����)
    SceneManager.push(Scene_Menu);
    //�˵������ ��ʼ������λ��
    Window_MenuCommand.initCommandPosition();
    //��Ϸ��ʱ ���Ŀ�ĵ�
    $gameTemp.clearDestination();
    //��ͼ���ƴ��� ����
    this._mapNameWindow.hide();
    //�ȴ����� = 2
    this._waitCount = 2;
};
//���º��е���
Scene_Map.prototype.updateCallDebug = function() {
	//��� �ǵ��Ժ��к�
    if (this.isDebugCalled()) {
	    //���������� ��� (���Գ���)
        SceneManager.push(Scene_Debug);
    }
};
//�ǵ��Ժ��к�
Scene_Map.prototype.isDebugCalled = function() {
	//���� ���� �հ��� ���� ���� ��Ϸ��ʱ ����Ϸ����
    return Input.isTriggered('debug') && $gameTemp.isPlaytest();
};
//����Ϊ�˴���
Scene_Map.prototype.fadeInForTransfer = function() {
	//�������� = ��Ϸ��Ϸ�� ��������
    var fadeType = $gamePlayer.fadeType();
    //��� ��������
    switch (fadeType) {
	//�� 0 �� 1
    case 0: case 1:
    	//��ʼ���� ( �������� ,�������� ===1 )
        this.startFadeIn(this.fadeSpeed(), fadeType === 1);
        break;
    }
};
//����Ϊ�˴���
Scene_Map.prototype.fadeOutForTransfer = function() {
	//�������� = ��Ϸ��Ϸ�� ��������
    var fadeType = $gamePlayer.fadeType();
    //��� ��������
    switch (fadeType) {
	//�� 0 �� 1
    case 0: case 1:
    	//��ʼ���� ( �������� ,�������� ===1 )
        this.startFadeOut(this.fadeSpeed(), fadeType === 1);
        break;
    }
};
//��ʼս��
Scene_Map.prototype.launchBattle = function() {
	//ս�������� ����bgm��bgs
    BattleManager.saveBgmAndBgs();
    //ֹͣ��Ƶ��ս����ʼ
    this.stopAudioOnBattleStart();
    //���������� ����ս����ʼ
    SoundManager.playBattleStart();
    //��ʼ����Ч��
    this.startEncounterEffect();
    //��ͼ���ƴ��� ����
    this._mapNameWindow.hide();
};
//ֹͣ��Ƶ��ս����ʼ
Scene_Map.prototype.stopAudioOnBattleStart = function() {
	//��� ���� ��Ƶ������ �ǵ�ǰbgm(��Ϸϵͳ ս��bgm)
    if (!AudioManager.isCurrentBgm($gameSystem.battleBgm())) {
	    //��Ƶ������ ֹͣbgm
        AudioManager.stopBgm();
    }
    //��Ƶ������ ֹͣbgs
    AudioManager.stopBgs();
    //��Ƶ������ ֹͣme
    AudioManager.stopMe();
    //��Ƶ������ ֹͣse
    AudioManager.stopSe();
};
//��ʼ����Ч��
Scene_Map.prototype.startEncounterEffect = function() {
	//������ ��������
    this._spriteset.hideCharacters();
    //����Ч������ʱ�� = ����Ч������
    this._encounterEffectDuration = this.encounterEffectSpeed();
};
//��������Ч��
Scene_Map.prototype.updateEncounterEffect = function() {
	//��� ����Ч������ʱ�� > 0
    if (this._encounterEffectDuration > 0) {
	    //����Ч������ʱ��--
        this._encounterEffectDuration--;
        //���� = ����Ч������
        var speed = this.encounterEffectSpeed();
        // n = ���� - ����Ч������ʱ��
        var n = speed - this._encounterEffectDuration;
        // p = n  / ���� 
        var p = n / speed;
        //q =  ((p - 1) * 20 * p + 5) * p + 1;
        var q = ((p - 1) * 20 * p + 5) * p + 1;
        //zoomx = ��Ϸ��Ϸ�� ����x
        var zoomX = $gamePlayer.screenX();
        //zoomx = ��Ϸ��Ϸ�� ����y - 24
        var zoomY = $gamePlayer.screenY() - 24;
        //��� n === 2 
        if (n === 2) {
	        //��Ϸ���� ��������(zoomX, zoomY, 1)
            $gameScreen.setZoom(zoomX, zoomY, 1);
            //����Ϊ�˱���
            this.snapForBattleBackground();
            //��ʼ��˸Ϊ������(����/2)
            this.startFlashForEncounter(speed / 2);
        }
        //��Ϸ���� ��������(zoomX, zoomY, q)
        $gameScreen.setZoom(zoomX, zoomY, q);
        //��� n == ���� /6
        if (n === Math.floor(speed / 6)) {
            //��ʼ��˸Ϊ������(����/2)
            this.startFlashForEncounter(speed / 2);
        }
        //��� n == ���� /2
        if (n === Math.floor(speed / 2)) {
	        //ս�������� ����ս��bgm
            BattleManager.playBattleBgm();
            //��ʼ����(��������) 
            this.startFadeOut(this.fadeSpeed());
        }
    }
};
//����Ϊ�˱���
Scene_Map.prototype.snapForBattleBackground = function() {
	//���ڲ� �ɼ��� = false
    this._windowLayer.visible = false;
    //����������  ����Ϊ�˱���
    SceneManager.snapForBackground();
    //���ڲ� �ɼ��� = true
    this._windowLayer.visible = true;
};
//��ʼ��˸Ϊ������(����ʱ��)
Scene_Map.prototype.startFlashForEncounter = function(duration) {
	//��ɫ = 255,255,255,255
    var color = [255, 255, 255, 255];
    //��Ϸ���� ��ʼ��˸(��ɫ,����ʱ�� ) 
    $gameScreen.startFlash(color, duration);
};
//����Ч������
Scene_Map.prototype.encounterEffectSpeed = function() {
    return 60;
};
