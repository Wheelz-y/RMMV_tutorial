
//-----------------------------------------------------------------------------
// Window_BattleEnemy
// ����ս������
// The window for selecting a target enemy on the battle screen.
// ս������ѡ��һ��Ŀ����˵Ĵ���

function Window_BattleEnemy() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_BattleEnemy.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_BattleEnemy.prototype.constructor = Window_BattleEnemy;
//��ʼ��
Window_BattleEnemy.prototype.initialize = function(x, y) {
    this._enemies = [];
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.hide();
};
//���ڿ�
Window_BattleEnemy.prototype.windowWidth = function() {
    return Graphics.boxWidth - 192;
};
//���ڸ�
Window_BattleEnemy.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
//�ɼ�����Ŀ
Window_BattleEnemy.prototype.numVisibleRows = function() {
    return 4;
};
//�����
Window_BattleEnemy.prototype.maxCols = function() {
    return 2;
};
//�����Ŀ 
Window_BattleEnemy.prototype.maxItems = function() {
    return this._enemies.length;
};
//����
Window_BattleEnemy.prototype.enemy = function() {
    return this._enemies[this.index()];
};
//��������
Window_BattleEnemy.prototype.enemyIndex = function() {
    var enemy = this.enemy();
    return enemy ? enemy.index() : -1;
};
//������Ŀ
Window_BattleEnemy.prototype.drawItem = function(index) {
    this.resetTextColor();
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    this.drawText(name, rect.x, rect.y, rect.width);
};
//��ʾ
Window_BattleEnemy.prototype.show = function() {
    this.refresh();
    this.select(0);
    Window_Selectable.prototype.show.call(this);
};
//����
Window_BattleEnemy.prototype.hide = function() {
    Window_Selectable.prototype.hide.call(this);
    $gameTroop.select(null);
};
//ˢ��
Window_BattleEnemy.prototype.refresh = function() {
    this._enemies = $gameTroop.aliveMembers();
    Window_Selectable.prototype.refresh.call(this);
};
//ѡ��
Window_BattleEnemy.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    $gameTroop.select(this.enemy());
};
