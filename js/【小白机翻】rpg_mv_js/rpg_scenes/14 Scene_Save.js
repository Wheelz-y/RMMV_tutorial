
//-----------------------------------------------------------------------------
// Scene_Save
// ���泡��
// The scene class of the save screen.
// ���� ���滭�� �� ������

function Scene_Save() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Scene_Save.prototype = Object.create(Scene_File.prototype);
//���ô�����
Scene_Save.prototype.constructor = Scene_Save;
//��ʼ��
Scene_Save.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
};
//ģʽ
Scene_Save.prototype.mode = function() {
    return 'save';
};
//���������ı�
Scene_Save.prototype.helpWindowText = function() {
    return TextManager.saveMessage;
};
//��һ�������ļ�����
Scene_Save.prototype.firstSavefileIndex = function() {
    return DataManager.lastAccessedSavefileId() - 1;
};
//�������ļ�ȷ��
Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
        this.onSaveSuccess();
    } else {
        this.onSaveFailure();
    }
};
//������ɹ�
Scene_Save.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
    this.popScene();
};
//������ʧ��
Scene_Save.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
    this.activateListWindow();
};
