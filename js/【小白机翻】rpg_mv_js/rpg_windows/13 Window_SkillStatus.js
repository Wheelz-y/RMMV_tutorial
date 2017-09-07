
//-----------------------------------------------------------------------------
// Window_SkillStatus
// ���ڼ���״̬
// The window for displaying the skill user's status on the skill screen.
// ���ܻ�����ʾ����ʹ��״̬�Ĵ���

function Window_SkillStatus() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_SkillStatus.prototype = Object.create(Window_Base.prototype);
//���ô�����
Window_SkillStatus.prototype.constructor = Window_SkillStatus;
//��ʼ��
Window_SkillStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};
//���ý�ɫ
Window_SkillStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};
//ˢ��
Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        var y = h / 2 - this.lineHeight() * 1.5;
        var width = w - 162 - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, 144, h);
        this.drawActorSimpleStatus(this._actor, 162, y, width);
    }
};
