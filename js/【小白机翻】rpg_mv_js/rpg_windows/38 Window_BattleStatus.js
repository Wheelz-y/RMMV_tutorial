
//-----------------------------------------------------------------------------
// Window_BattleStatus
// ����ս��״̬
// The window for displaying the status of party members on the battle screen.
// ս��������ʾ�����Ա״̬�Ĵ���

function Window_BattleStatus() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_BattleStatus.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_BattleStatus.prototype.constructor = Window_BattleStatus;
//��ʼ��
Window_BattleStatus.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - width;
    var y = Graphics.boxHeight - height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.openness = 0;
};
//���ڿ�
Window_BattleStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - 192;
};
//���ڸ�
Window_BattleStatus.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
//�ɼ�����Ŀ
Window_BattleStatus.prototype.numVisibleRows = function() {
    return 4;
};
//�����Ŀ 
Window_BattleStatus.prototype.maxItems = function() {
    return $gameParty.battleMembers().length;
};
//ˢ��
Window_BattleStatus.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllItems();
};
//������Ŀ
Window_BattleStatus.prototype.drawItem = function(index) {
    var actor = $gameParty.battleMembers()[index];
    this.drawBasicArea(this.basicAreaRect(index), actor);
    this.drawGaugeArea(this.gaugeAreaRect(index), actor);
};
//�����������
Window_BattleStatus.prototype.basicAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.width -= this.gaugeAreaWidth() + 15;
    return rect;
};
//�����������
Window_BattleStatus.prototype.gaugeAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.x += rect.width - this.gaugeAreaWidth();
    rect.width = this.gaugeAreaWidth();
    return rect;
};
//���������
Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return 330;
};
//���ƻ�������
Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    this.drawActorName(actor, rect.x + 0, rect.y, 150);
    this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
};
//���Ƽ�������
Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
    if ($dataSystem.optDisplayTp) {
        this.drawGaugeAreaWithTp(rect, actor);
    } else {
        this.drawGaugeAreaWithoutTp(rect, actor);
    }
};
//����tp����
Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 108);
    this.drawActorMp(actor, rect.x + 123, rect.y, 96);
    this.drawActorTp(actor, rect.x + 234, rect.y, 96);
};
//������tp��������
Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 201);
    this.drawActorMp(actor, rect.x + 216,  rect.y, 114);
};
