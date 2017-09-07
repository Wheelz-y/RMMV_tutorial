
//-----------------------------------------------------------------------------
// Scene_Boot
// �������� 
// The scene class for initializing the entire game.
// ���������Ϊ�˳�ʼ��������Ϸ

function Scene_Boot() {
	//���� ��ʼ��
    this.initialize.apply(this, arguments);
}
//����ԭ�� 
Scene_Boot.prototype = Object.create(Scene_Base.prototype);
//���ô�����
Scene_Boot.prototype.constructor = Scene_Boot;
//��ʼ��
Scene_Boot.prototype.initialize = function() {
	//�̳� �������� ��ʼ��
    Scene_Base.prototype.initialize.call(this);
    //��¼��ʼʱ��
    this._startDate = Date.now();
};
//����
Scene_Boot.prototype.create = function() {
	//�̳� �������� ����
    Scene_Base.prototype.create.call(this);
    //���ݹ����� ��ȡ��������
    DataManager.loadDatabase();
    //���ù����� ��ȡ
    ConfigManager.load();
    //��ȡϵͳͼƬ
    this.loadSystemImages();
};
//��ȡϵͳͼƬ
Scene_Boot.prototype.loadSystemImages = function() {
    ImageManager.loadSystem('Window');
    ImageManager.loadSystem('IconSet');
    ImageManager.loadSystem('Balloon');
    ImageManager.loadSystem('Shadow1');
    ImageManager.loadSystem('Shadow2');
    ImageManager.loadSystem('Damage');
    ImageManager.loadSystem('States');
    ImageManager.loadSystem('Weapons1');
    ImageManager.loadSystem('Weapons2');
    ImageManager.loadSystem('Weapons3');
    ImageManager.loadSystem('ButtonSet');
};
//��׼����
Scene_Boot.prototype.isReady = function() {
	//��� (�̳� �������� ��׼����)
    if (Scene_Base.prototype.isReady.call(this)) {
	    //����  ���ݹ����� �������� ��ȡ���  ����  ��Ϸ����������
        return DataManager.isDatabaseLoaded() && this.isGameFontLoaded();
    } else {
        return false;
    }
};
//��Ϸ����������
Scene_Boot.prototype.isGameFontLoaded = function() {
	//��� (ͼ�� 'GameFont' ����������)
    if (Graphics.isFontLoaded('GameFont')) {
        return true;
    } else {
	    //��ȥ��ʱ�� =  ʱ�� - ��ʼʱ��
        var elapsed = Date.now() - this._startDate;
        //�����ȥ��ʱ�� ���� 20000
        if (elapsed >= 20000) {
	        //�׳��´��� ��ȡ'GameFont' ʧ��
            throw new Error('Failed to load GameFont');
        }
    }
};
//��ʼ
Scene_Boot.prototype.start = function() {
	//�̳� ����������ʼ
    Scene_Base.prototype.start.call(this);
    //���������� Ԥ������Ҫ������
    SoundManager.preloadImportantSounds();
    //������ݹ����� ��ս������
    if (DataManager.isBattleTest()) {
	    //���ݹ����� ����ս������
        DataManager.setupBattleTest();
        //���������� ת�� ս������
        SceneManager.goto(Scene_Battle);
        //��� ���ݹ����� ���¼����� 
    } else if (DataManager.isEventTest()) {
	    //���ݹ����� �����¼�����
        DataManager.setupEventTest();
        //���������� ת�� ��ͼ����
        SceneManager.goto(Scene_Map);
    } else {
	    //�����Ϸ��λ��
        this.checkPlayerLocation();
        //���ݹ����� �����µ���Ϸ
        DataManager.setupNewGame();
        //���������� ת�� ���ⳡ��
        SceneManager.goto(Scene_Title);
        //����ѡ�񴰿� ��ʼ����λ��
        Window_TitleCommand.initCommandPosition();
    } 
    //���� �ļ�����
    this.updateDocumentTitle();
};
//���� �ļ�����
Scene_Boot.prototype.updateDocumentTitle = function() {
	//�����ļ����� Ϊ  ����:ϵͳ����Ϸ����
    document.title = $dataSystem.gameTitle;
};
//�����Ϸ��λ��
Scene_Boot.prototype.checkPlayerLocation = function() {
	//��� ����:ϵͳ�Ŀ�ʼ��ͼid ȫ���� 0 
    if ($dataSystem.startMapId === 0) {
	    //�׳��µĴ��� ��Ϸ�ߵ� ��ʼλ��û������ 
        throw new Error('Player\'s starting position is not set');
    }
};
