
//-----------------------------------------------------------------------------
// Window_HorzCommand
// ����ˮƽ����
// The command window for the horizontal selection format.
// Ϊ�˺���ѡ��������

function Window_HorzCommand() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_HorzCommand.prototype = Object.create(Window_Command.prototype);
//���ô�����
Window_HorzCommand.prototype.constructor = Window_HorzCommand;
//��ʼ��
Window_HorzCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
};
//��ʾ�ɼ���
Window_HorzCommand.prototype.numVisibleRows = function() {
    return 1;
};
//�����
Window_HorzCommand.prototype.maxCols = function() {
    return 4;
};
//��Ŀ�ı�����
Window_HorzCommand.prototype.itemTextAlign = function() {
    return 'center';
};
