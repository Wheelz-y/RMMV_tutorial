
//-----------------------------------------------------------------------------
// Window_MenuCommand
// ���ڲ˵�����
// The window for selecting a command on the menu screen.
// ѡ��˵���������Ĵ���

function Window_MenuCommand() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_MenuCommand.prototype = Object.create(Window_Command.prototype);
//���ô�����
Window_MenuCommand.prototype.constructor = Window_MenuCommand;
//��ʼ��
Window_MenuCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

Window_MenuCommand._lastCommandSymbol = null;
//��ʼ������λ��
Window_MenuCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};
//���ڿ�
Window_MenuCommand.prototype.windowWidth = function() {
    return 240;
};
//��ʾ����Ŀ
Window_MenuCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};
//���������б�
Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
};
//������Ҫ����
Window_MenuCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
    if (this.needsCommand('item')) {
        this.addCommand(TextManager.item, 'item', enabled);
    }
    if (this.needsCommand('skill')) {
        this.addCommand(TextManager.skill, 'skill', enabled);
    }
    if (this.needsCommand('equip')) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        this.addCommand(TextManager.status, 'status', enabled);
    }
};
//���ӱ������
Window_MenuCommand.prototype.addFormationCommand = function() {
    if (this.needsCommand('formation')) {
        var enabled = this.isFormationEnabled();
        this.addCommand(TextManager.formation, 'formation', enabled);
    }
};
//�����������
Window_MenuCommand.prototype.addOriginalCommands = function() {
};
//����ѡ������
Window_MenuCommand.prototype.addOptionsCommand = function() {
    if (this.needsCommand('options')) {
        var enabled = this.isOptionsEnabled();
        this.addCommand(TextManager.options, 'options', enabled);
    }
};
//���Ӵ洢����
Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand('save')) {
        var enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, 'save', enabled);
    }
};
//������Ϸ��������
Window_MenuCommand.prototype.addGameEndCommand = function() {
    var enabled = this.isGameEndEnabled();
    this.addCommand(TextManager.gameEnd, 'gameEnd', enabled);
};
//��Ҫ����
Window_MenuCommand.prototype.needsCommand = function(name) {
    var flags = $dataSystem.menuCommands;
    if (flags) {
        switch (name) {
        case 'item':
            return flags[0];
        case 'skill':
            return flags[1];
        case 'equip':
            return flags[2];
        case 'status':
            return flags[3];
        case 'formation':
            return flags[4];
        case 'save':
            return flags[5];
        }
    }
    return true;
};
//����Ҫ��������
Window_MenuCommand.prototype.areMainCommandsEnabled = function() {
    return $gameParty.exists();
};
//�Ǳ������
Window_MenuCommand.prototype.isFormationEnabled = function() {
    return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
};
//��ѡ������
Window_MenuCommand.prototype.isOptionsEnabled = function() {
    return true;
};
//�Ǵ洢����
Window_MenuCommand.prototype.isSaveEnabled = function() {
    return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
};
//����Ϸ��������
Window_MenuCommand.prototype.isGameEndEnabled = function() {
    return true;
};
//����ȷ��
Window_MenuCommand.prototype.processOk = function() {
    Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};
//ѡ���
Window_MenuCommand.prototype.selectLast = function() {
    this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
};
