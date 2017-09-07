
//-----------------------------------------------------------------------------
// Scene_Load
// ��ȡ����
// The scene class of the load screen.
// ���� ��ȡ���� �� ������

function Scene_Load() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Scene_Load.prototype = Object.create(Scene_File.prototype);
//���ô�����
Scene_Load.prototype.constructor = Scene_Load;
//��ʼ��
Scene_Load.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
    this._loadSuccess = false;
};
//��ֹ
Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};
//ģʽ
Scene_Load.prototype.mode = function() {
    return 'load';
};
//���������ı�
Scene_Load.prototype.helpWindowText = function() {
    return TextManager.loadMessage;
};
//��һ�������ļ�����
Scene_Load.prototype.firstSavefileIndex = function() {
    return DataManager.latestSavefileId() - 1;
};
//�������ļ�ȷ��
Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
};
//����ȡ�ɹ�
Scene_Load.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
}
//����ȡʧ��
Scene_Load.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
    this.activateListWindow();
};
//���¶�ȡ��ͼ�������
Scene_Load.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};
