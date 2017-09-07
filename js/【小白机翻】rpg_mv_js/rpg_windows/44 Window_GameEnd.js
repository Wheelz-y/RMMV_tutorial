
//-----------------------------------------------------------------------------
// Window_GameEnd
// ������Ϸ��ֹ
// The window for selecting "Go to Title" on the game end screen.
// ��Ϸ��ֹ���� ѡ��ص�����Ĵ���

function Window_GameEnd() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_GameEnd.prototype = Object.create(Window_Command.prototype);
//���ô�����
Window_GameEnd.prototype.constructor = Window_GameEnd;
//��ʼ��
Window_GameEnd.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
};
//���ڿ�
Window_GameEnd.prototype.windowWidth = function() {
    return 240;
};
//����λ��
Window_GameEnd.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
//���������б�
Window_GameEnd.prototype.makeCommandList = function() {
    this.addCommand(TextManager.toTitle, 'toTitle');
    this.addCommand(TextManager.cancel,  'cancel');
};
