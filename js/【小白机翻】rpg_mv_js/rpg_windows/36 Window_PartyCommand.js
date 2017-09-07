
//-----------------------------------------------------------------------------
// Window_PartyCommand
// ���ڶ�������
// The window for selecting whether to fight or escape on the battle screen.
// ս������ѡ���ܻ����ܵĴ���

function Window_PartyCommand() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_PartyCommand.prototype = Object.create(Window_Command.prototype);
//���ô�����
Window_PartyCommand.prototype.constructor = Window_PartyCommand;
//��ʼ��
Window_PartyCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 0, y);
    this.openness = 0;
    this.deactivate();
};
//���ڿ�
Window_PartyCommand.prototype.windowWidth = function() {
    return 192;
};
//�ɼ�����Ŀ
Window_PartyCommand.prototype.numVisibleRows = function() {
    return 4;
};
//���������б�
Window_PartyCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.fight,  'fight');
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
};
//��װ
Window_PartyCommand.prototype.setup = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.refresh();
    this.select(0);
    this.activate();
    this.open();
};
