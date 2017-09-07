
//-----------------------------------------------------------------------------
// Window_ActorCommand
// ���ڽ�ɫ����
// The window for selecting an actor's action on the battle screen.
// ս������ѡ��һ����ɫ�����Ĵ���

function Window_ActorCommand() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_ActorCommand.prototype = Object.create(Window_Command.prototype);
//���ô�����
Window_ActorCommand.prototype.constructor = Window_ActorCommand;
//��ʼ��
Window_ActorCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 0, y);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};
//���ڿ�
Window_ActorCommand.prototype.windowWidth = function() {
    return 192;
};
//�ɼ�����Ŀ
Window_ActorCommand.prototype.numVisibleRows = function() {
    return 4;
};
//���������б�
Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        this.addAttackCommand();
        this.addSkillCommands();
        this.addGuardCommand();
        this.addItemCommand();
    }
};
//���ӹ�������
Window_ActorCommand.prototype.addAttackCommand = function() {
    this.addCommand(TextManager.attack, 'attack', this._actor.canAttack());
};
//���Ӽ�������
Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, 'skill', true, stypeId);
    }, this);
};
//���ӷ�������
Window_ActorCommand.prototype.addGuardCommand = function() {
    this.addCommand(TextManager.guard, 'guard', this._actor.canGuard());
};
//������Ʒ����
Window_ActorCommand.prototype.addItemCommand = function() {
    this.addCommand(TextManager.item, 'item');
};
//��װ
Window_ActorCommand.prototype.setup = function(actor) {
    this._actor = actor;
    this.clearCommandList();
    this.makeCommandList();
    this.refresh();
    this.selectLast();
    this.activate();
    this.open();
};
//����ȷ��
Window_ActorCommand.prototype.processOk = function() {
    if (this._actor) {
        if (ConfigManager.commandRemember) {
            this._actor.setLastCommandSymbol(this.currentSymbol());
        } else {
            this._actor.setLastCommandSymbol('');
        }
    }
    Window_Command.prototype.processOk.call(this);
};
//ѡ���б�
Window_ActorCommand.prototype.selectLast = function() {
    this.select(0);
    if (this._actor && ConfigManager.commandRemember) {
        this.selectSymbol(this._actor.lastCommandSymbol());
    }
};
