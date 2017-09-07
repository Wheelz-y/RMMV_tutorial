
//-----------------------------------------------------------------------------
// Scene_Options
// ѡ���
// The scene class of the options screen.
// ���� ѡ��� ����

function Scene_Options() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Scene_Options.prototype = Object.create(Scene_MenuBase.prototype);
//���ô�����
Scene_Options.prototype.constructor = Scene_Options;
//��ʼ��
Scene_Options.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//����
Scene_Options.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createOptionsWindow();
};
//��ֹ
Scene_Options.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    ConfigManager.save();
};
//����ѡ���
Scene_Options.prototype.createOptionsWindow = function() {
    this._optionsWindow = new Window_Options();
    this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._optionsWindow);
};
