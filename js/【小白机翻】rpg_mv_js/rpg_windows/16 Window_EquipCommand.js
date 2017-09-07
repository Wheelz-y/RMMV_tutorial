
//-----------------------------------------------------------------------------
// Window_EquipCommand
// ����װ������
// The window for selecting a command on the equipment screen.
// װ������ѡ������Ĵ���

function Window_EquipCommand() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_EquipCommand.prototype = Object.create(Window_HorzCommand.prototype);
//���ô�����
Window_EquipCommand.prototype.constructor = Window_EquipCommand;
//��ʼ��
Window_EquipCommand.prototype.initialize = function(x, y, width) {
    this._windowWidth = width;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
};
//���ڿ�
Window_EquipCommand.prototype.windowWidth = function() {
    return this._windowWidth;
};
//�����
Window_EquipCommand.prototype.maxCols = function() {
    return 3;
};
//���������б�
Window_EquipCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.equip2,   'equip');
    this.addCommand(TextManager.optimize, 'optimize');
    this.addCommand(TextManager.clear,    'clear');
};
