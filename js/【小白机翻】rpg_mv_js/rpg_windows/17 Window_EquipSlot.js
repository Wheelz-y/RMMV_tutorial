
//-----------------------------------------------------------------------------
// Window_EquipSlot
// ����װ����
// The window for selecting an equipment slot on the equipment screen.
// װ������ѡ��һ��װ���۵Ĵ���

function Window_EquipSlot() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_EquipSlot.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_EquipSlot.prototype.constructor = Window_EquipSlot;
//��ʼ��
Window_EquipSlot.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};
//���ý�ɫ
Window_EquipSlot.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};
//����
Window_EquipSlot.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setSlotId(this.index());
    }
};
//�����Ŀ
Window_EquipSlot.prototype.maxItems = function() {
    return this._actor ? this._actor.equipSlots().length : 0;
};
//��Ŀ
Window_EquipSlot.prototype.item = function() {
    return this._actor ? this._actor.equips()[this.index()] : null;
};
//������Ŀ
Window_EquipSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
        this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
        this.changePaintOpacity(true);
    }
};
//������
Window_EquipSlot.prototype.slotName = function(index) {
    var slots = this._actor.equipSlots();
    return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
};
//������
Window_EquipSlot.prototype.isEnabled = function(index) {
    return this._actor ? this._actor.isEquipChangeOk(index) : false;
};
//�ǵ�ǰ��Ŀ����
Window_EquipSlot.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.index());
};
//����״̬����
Window_EquipSlot.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};
//������Ŀ����
Window_EquipSlot.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};
//���°���
Window_EquipSlot.prototype.updateHelp = function() {
    Window_Selectable.prototype.updateHelp.call(this);
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setTempActor(null);
    }
};
