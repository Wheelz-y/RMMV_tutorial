
//-----------------------------------------------------------------------------
// Window_EquipStatus
// ����װ��״̬
// The window for displaying parameter changes on the equipment screen.
// װ��������ʾ�����ı�Ĵ���

function Window_EquipStatus() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_EquipStatus.prototype = Object.create(Window_Base.prototype);
//���ô�����
Window_EquipStatus.prototype.constructor = Window_EquipStatus;
//��ʼ��
Window_EquipStatus.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};
//���ڿ�
Window_EquipStatus.prototype.windowWidth = function() {
    return 312;
};
//���ڸ�
Window_EquipStatus.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
//�ɼ�����Ŀ
Window_EquipStatus.prototype.numVisibleRows = function() {
    return 7;
};
//���ý�ɫ
Window_EquipStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};
//ˢ��
Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        this.drawActorName(this._actor, this.textPadding(), 0);
        for (var i = 0; i < 6; i++) {
            this.drawItem(0, this.lineHeight() * (1 + i), 2 + i);
        }
    }
};
//������ʱ��ɫ
Window_EquipStatus.prototype.setTempActor = function(tempActor) {
    if (this._tempActor !== tempActor) {
        this._tempActor = tempActor;
        this.refresh();
    }
};
//������Ŀ
Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
    this.drawParamName(x + this.textPadding(), y, paramId);
    if (this._actor) {
        this.drawCurrentParam(x + 140, y, paramId);
    }
    this.drawRightArrow(x + 188, y);
    if (this._tempActor) {
        this.drawNewParam(x + 222, y, paramId);
    }
};
//���Ʋ�������
Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, 120);
};
//���Ƶ�ǰ����
Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    this.drawText(this._actor.param(paramId), x, y, 48, 'right');
};
//�����Ҽ�ͷ
Window_EquipStatus.prototype.drawRightArrow = function(x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, 32, 'center');
};
//�����²���
Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(newValue, x, y, 48, 'right');
};
