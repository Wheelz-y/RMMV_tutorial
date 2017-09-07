
//-----------------------------------------------------------------------------
// Window_BattleItem
// ����ս����Ʒ
// The window for selecting an item to use on the battle screen.
// ս������ѡ��һ����Ʒʹ�õĴ���

function Window_BattleItem() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_BattleItem.prototype = Object.create(Window_ItemList.prototype);
//���ô�����
Window_BattleItem.prototype.constructor = Window_BattleItem;
//��ʼ��
Window_BattleItem.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this.hide();
};
//����
Window_BattleItem.prototype.includes = function(item) {
    return $gameParty.canUse(item);
};
//��ʾ
Window_BattleItem.prototype.show = function() {
    this.selectLast();
    this.showHelpWindow();
    Window_ItemList.prototype.show.call(this);
};
//����
Window_BattleItem.prototype.hide = function() {
    this.hideHelpWindow();
    Window_ItemList.prototype.hide.call(this);
};
