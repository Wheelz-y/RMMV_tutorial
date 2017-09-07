
//-----------------------------------------------------------------------------
// Scene_Name
// ���Ƴ���
// The scene class of the name input screen.
// ���� �������뻭�� �� ������

function Scene_Name() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Scene_Name.prototype = Object.create(Scene_MenuBase.prototype);
//���ô�����
Scene_Name.prototype.constructor = Scene_Name;
//��ʼ��
Scene_Name.prototype.initialize = function() {
	//�̳� �˵��������� ��ʼ��
    Scene_MenuBase.prototype.initialize.call(this);
};
//׼��
Scene_Name.prototype.prepare = function(actorId, maxLength) {
	//��ɫid  = actorId
    this._actorId = actorId;
    //��󳤶� = maxLength
    this._maxLength = maxLength;
};
//����
Scene_Name.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createInputWindow();
};
//��ʼ
Scene_Name.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editWindow.refresh();
};
//�����༭����
Scene_Name.prototype.createEditWindow = function() {
    this._editWindow = new Window_NameEdit(this._actor, this._maxLength);
    this.addWindow(this._editWindow);
};
//�������봰��
Scene_Name.prototype.createInputWindow = function() {
    this._inputWindow = new Window_NameInput(this._editWindow);
    this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
    this.addWindow(this._inputWindow);
};
//������ȷ��
Scene_Name.prototype.onInputOk = function() {
    this._actor.setName(this._editWindow.name());
    this.popScene();
};
