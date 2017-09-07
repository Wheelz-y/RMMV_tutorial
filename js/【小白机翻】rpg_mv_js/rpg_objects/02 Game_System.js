
//-----------------------------------------------------------------------------
// Game_System
// ��Ϸϵͳ   $gameSystem 
// The game object class for the system data.
// ��Ϸϵͳ���ݵ���Ϸ������

function Game_System() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_System.prototype.initialize = function() {
	//�������� = true
    this._saveEnabled = true;
    //�˵����� = true
    this._menuEnabled = true;
    //�������� = true
    this._encounterEnabled = true;
    //������� = true
    this._formationEnabled = true;
    //ս������ = 0 
    this._battleCount = 0;
    //ʤ������ = 0
    this._winCount = 0;
    //���ܼ��� = 0
    this._escapeCount = 0;
    //������� = 0
    this._saveCount = 0;
    //�汾id = 0 
    this._versionId = 0;
    //֡�������� = 0
    this._framesOnSave = 0;
    //bgm������ = null
    this._bgmOnSave = null;
    //bgs������ = null
    this._bgsOnSave = null;
    //����ɫ�� = null
    this._windowTone = null;
    //ս��bgm = null
    this._battleBgm = null;
    //ʤ��me = null
    this._victoryMe = null;
    //ʧ��me = null
    this._defeatMe = null;
    //����bgm = null
    this._savedBgm = null;
    //����bgm = null
    this._walkingBgm = null;
};
//������
Game_System.prototype.isJapanese = function() {
	//���� ����ϵͳ ���� ���� ja
    return $dataSystem.locale.match(/^ja/);
};
//������
Game_System.prototype.isChinese = function() {
	//���� ����ϵͳ ���� ���� zh
    return $dataSystem.locale.match(/^zh/);
};
//�Ǻ���
Game_System.prototype.isKorean = function() {
	//���� ����ϵͳ ���� ���� ko
    return $dataSystem.locale.match(/^ko/);
};
//���������ĺ���
Game_System.prototype.isCJK = function() {
	//���� ����ϵͳ ���� ���� ja �� zh �� ko 
    return $dataSystem.locale.match(/^(ja|zh|ko)/);
};
//�Ƕ���
Game_System.prototype.isRussian = function() {
	//���� ����ϵͳ ���� ���� ru
    return $dataSystem.locale.match(/^ru/);
};
//�ǲ���
Game_System.prototype.isSideView = function() {
	//���� ����ϵͳ ����
    return $dataSystem.optSideView;
};
//�����ñ���
Game_System.prototype.isSaveEnabled = function() {
	//���� ��������
    return this._saveEnabled;
};
//��ֹ����
Game_System.prototype.disableSave = function() {
	//�������� = false
    this._saveEnabled = false;
};
//���ñ���
Game_System.prototype.enableSave = function() {
	//�������� = true
    this._saveEnabled = true;
};
//�����ò˵�
Game_System.prototype.isMenuEnabled = function() {
	//���� �˵�����
    return this._menuEnabled;
};
//��ֹ�˵�
Game_System.prototype.disableMenu = function() {
	//�˵����� = false
    this._menuEnabled = false;
};
//���ò˵�
Game_System.prototype.enableMenu = function() {
	//�˵����� = true
    this._menuEnabled = true;
};
//����������
Game_System.prototype.isEncounterEnabled = function() {
	//���� ��������
    return this._encounterEnabled;
};
//��ֹ����
Game_System.prototype.disableEncounter = function() {
	//�������� = false
    this._encounterEnabled = false;
};
//��������
Game_System.prototype.enableEncounter = function() {
	//�������� = true
    this._encounterEnabled = true;
};
//�����ñ��
Game_System.prototype.isFormationEnabled = function() {
	//���� �������
    return this._formationEnabled;
};
//��ֹ���
Game_System.prototype.disableFormation = function() {
	//������� = false
    this._formationEnabled = false;
};
//���ñ��
Game_System.prototype.enableFormation = function() {
	//������� = true
    this._formationEnabled = true;
};
//ս������
Game_System.prototype.battleCount = function() {
	//���� ս������
    return this._battleCount;
};
//ʤ������
Game_System.prototype.winCount = function() {
	//���� ʤ������
    return this._winCount;
};
//���ܼ���
Game_System.prototype.escapeCount = function() {
	//���� ���ܼ���
    return this._escapeCount;
};
//�������
Game_System.prototype.saveCount = function() {
	//���� �������
    return this._saveCount;
};
//�汾id
Game_System.prototype.versionId = function() {
	//���� �汾id
    return this._versionId;
};
//����ɫ��
Game_System.prototype.windowTone = function() {
	//���� ����ɫ�� ���� ����ϵͳ ����ɫ��
    return this._windowTone || $dataSystem.windowTone;
};
//���ô���ɫ��
Game_System.prototype.setWindowTone = function(value) {
	//����ɫ�� = value
    this._windowTone = value;
};
//ս��bgm
Game_System.prototype.battleBgm = function() {
	//���� ս��bgm ���� ����ϵͳ ս��bgm
    return this._battleBgm || $dataSystem.battleBgm;
};
//����ս��bgm
Game_System.prototype.setBattleBgm = function(value) {
	//ս��bgm = value
    this._battleBgm = value;
};
//ʤ��me
Game_System.prototype.victoryMe = function() {
	//���� ʤ��me ���� ����ϵͳ ʤ��me
    return this._victoryMe || $dataSystem.victoryMe;
};
//����ʤ��me
Game_System.prototype.setVictoryMe = function(value) {
	//ʤ��me = value
    this._victoryMe = value;
};
//ʧ��me
Game_System.prototype.defeatMe = function() {
	//���� ʧ��me ���� ����ϵͳ ʧ��me
    return this._defeatMe || $dataSystem.defeatMe;
};
//����ʧ��me
Game_System.prototype.setDefeatMe = function(value) {
	//ʧ��me = value
    this._defeatMe = value;
};
//��ս����ʼ
Game_System.prototype.onBattleStart = function() {
	//ս������++
    this._battleCount++;
};
//��ս��ʤ��
Game_System.prototype.onBattleWin = function() {
	//ʤ������++
    this._winCount++;
};
//��ս������
Game_System.prototype.onBattleEscape = function() {
	//���ܼ��� ++
    this._escapeCount++;
};
//������֮ǰ
Game_System.prototype.onBeforeSave = function() {
	//������� ++
    this._saveCount++;
    //�汾id = ����ϵͳ �汾id
    this._versionId = $dataSystem.versionId;
    //֡�������� =  ͼ�� ֡����
    this._framesOnSave = Graphics.frameCount;
    //bgm������ =  ��Ƶ������ ����bgm
    this._bgmOnSave = AudioManager.saveBgm();
    //bgs������ =  ��Ƶ������ ����bgs
    this._bgsOnSave = AudioManager.saveBgs();
};
//����ȡ�Ժ�
Game_System.prototype.onAfterLoad = function() {
    //ͼ�� ֡���� =  ֡��������
    Graphics.frameCount = this._framesOnSave;
    //��Ƶ������ ����bgm(bgm������) 
    AudioManager.playBgm(this._bgmOnSave);
    //��Ƶ������ ����bgs(bgs������) 
    AudioManager.playBgs(this._bgsOnSave);
};
//��Ϸʱ��
Game_System.prototype.playtime = function() {
	//���� ����ȡ��( ͼ�� ֡����  / 60 ) 
    return Math.floor(Graphics.frameCount / 60);
};
//����ʱ���ı�
Game_System.prototype.playtimeText = function() {
	// Math.floor  С�ڵ��� x������ x ��ӽ�������  (����ȡ��)
	//Сʱ = ����ȡ�� (��Ϸʱ�� �� 60 �� 60)
    var hour = Math.floor(this.playtime() / 60 / 60);
	//���� = ����ȡ�� ( (��Ϸʱ�� �� 60 ) �� 60 �� ���� )
    var min = Math.floor(this.playtime() / 60) % 60;
    //�� = ��Ϸʱ�� �� 60 ������
    var sec = this.playtime() % 60;
    //���� Сʱ( ���0(2λ) ) + ":" + ����( ���0(2λ) )  + ":" + ��( ���0(2λ) )  
    return hour.padZero(2) + ':' + min.padZero(2) + ':' + sec.padZero(2);
};
//����bgm
Game_System.prototype.saveBgm = function() {
	//����bgm = ��Ƶ������ ����bgm
    this._savedBgm = AudioManager.saveBgm();
};
//�ز�bgm
Game_System.prototype.replayBgm = function() {
	//��� ����bgm (����bgm����)
    if (this._savedBgm) {
	    //��Ƶ������ �ز�bgm (����bgm)
        AudioManager.replayBgm(this._savedBgm);
    }
};
//��������bgm
Game_System.prototype.saveWalkingBgm = function() {
	//����bgm = ��Ƶ������ ����bgm
    this._walkingBgm = AudioManager.saveBgm();
};
//�ز�����bgm
Game_System.prototype.replayWalkingBgm = function() {
	//��� ����bgm (����bgm����)
    if (this._walkingBgm) {
	    //��Ƶ������ ����bgm (����bgm)
        AudioManager.playBgm(this._walkingBgm);
    }
};
