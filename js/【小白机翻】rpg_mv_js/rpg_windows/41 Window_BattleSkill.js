
//-----------------------------------------------------------------------------
// Window_BattleSkill
// ����ս������
// The window for selecting a skill to use on the battle screen.
// ս������ѡ��һ������ʹ�õĴ���

function Window_BattleSkill() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_BattleSkill.prototype = Object.create(Window_SkillList.prototype);
//���ô�����
Window_BattleSkill.prototype.constructor = Window_BattleSkill;
//��ʼ��
Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    this.hide();
};
//��ʾ
Window_BattleSkill.prototype.show = function() {
    this.selectLast();
    this.showHelpWindow();
    Window_SkillList.prototype.show.call(this);
};
//����
Window_BattleSkill.prototype.hide = function() {
    this.hideHelpWindow();
    Window_SkillList.prototype.hide.call(this);
};
