
//-----------------------------------------------------------------------------
// Window_SkillList
// ���ڼ����б�
// The window for selecting a skill on the skill screen.
// ���ܻ���ѡ���ܵĴ���

function Window_SkillList() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_SkillList.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_SkillList.prototype.constructor = Window_SkillList;
//��ʼ��
Window_SkillList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._stypeId = 0;
    this._data = [];
};
//���ý�ɫ
Window_SkillList.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    }
};
//��������id
Window_SkillList.prototype.setStypeId = function(stypeId) {
    if (this._stypeId !== stypeId) {
        this._stypeId = stypeId;
        this.refresh();
        this.resetScroll();
    }
};
//�����
Window_SkillList.prototype.maxCols = function() {
    return 2;
};
//�о�
Window_SkillList.prototype.spacing = function() {
    return 48;
};
//�����Ŀ
Window_SkillList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//��Ŀ
Window_SkillList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};
//�ǵ�ǰ��Ŀ����
Window_SkillList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};
//����
Window_SkillList.prototype.includes = function(item) {
    return item && item.stypeId === this._stypeId;
};
//������
Window_SkillList.prototype.isEnabled = function(item) {
    return this._actor && this._actor.canUse(item);
};
//������Ŀ�б�
Window_SkillList.prototype.makeItemList = function() {
    if (this._actor) {
        this._data = this._actor.skills().filter(function(item) {
            return this.includes(item);
        }, this);
    } else {
        this._data = [];
    }
};
//ѡ���б�
Window_SkillList.prototype.selectLast = function() {
    var skill;
    if ($gameParty.inBattle()) {
        skill = this._actor.lastBattleSkill();
    } else {
        skill = this._actor.lastMenuSkill();
    }
    var index = this._data.indexOf(skill);
    this.select(index >= 0 ? index : 0);
};
//������Ŀ
Window_SkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};
//���Ŀ�
Window_SkillList.prototype.costWidth = function() {
    return this.textWidth('000');
};
//���Ƽ�������
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
    }
};
//���°���
Window_SkillList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};
//ˢ��
Window_SkillList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
