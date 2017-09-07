
//-----------------------------------------------------------------------------
// Window_SkillType
// ���ڼ�������
// The window for selecting a skill type on the skill screen.
// ���ܻ���ѡ��������Ĵ���

function Window_SkillType() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_SkillType.prototype = Object.create(Window_Command.prototype);
//���ô�����
Window_SkillType.prototype.constructor = Window_SkillType;
//��ʼ��
Window_SkillType.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this._actor = null;
};
//���ڿ�
Window_SkillType.prototype.windowWidth = function() {
    return 240;
};
//���ý�ɫ
Window_SkillType.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.selectLast();
    }
};
//�ɼ�����Ŀ
Window_SkillType.prototype.numVisibleRows = function() {
    return 4;
};
//���������б�
Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b) {
            return a - b;
        });
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
        }, this);
    }
};
//����
Window_SkillType.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    if (this._skillWindow) {
        this._skillWindow.setStypeId(this.currentExt());
    }
};
//���ü��ܴ���
Window_SkillType.prototype.setSkillWindow = function(skillWindow) {
    this._skillWindow = skillWindow;
    this.update();
};
//ѡ���б�
Window_SkillType.prototype.selectLast = function() {
    var skill = this._actor.lastMenuSkill();
    if (skill) {
        this.selectExt(skill.stypeId);
    } else {
        this.select(0);
    }
};
