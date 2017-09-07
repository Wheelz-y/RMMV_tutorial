
//-----------------------------------------------------------------------------
// Window_BattleActor
// ����ս����ɫ
// The window for selecting a target actor on the battle screen.
// ս������ѡ��һ��Ŀ���ɫ�Ĵ���

function Window_BattleActor() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_BattleActor.prototype = Object.create(Window_BattleStatus.prototype);
//���ô�����
Window_BattleActor.prototype.constructor = Window_BattleActor;
//��ʼ��
Window_BattleActor.prototype.initialize = function(x, y) {
    Window_BattleStatus.prototype.initialize.call(this);
    this.x = x;
    this.y = y;
    this.openness = 255;
    this.hide();
};
//��ʾ
Window_BattleActor.prototype.show = function() {
    this.select(0);
    Window_BattleStatus.prototype.show.call(this);
};
//����
Window_BattleActor.prototype.hide = function() {
    Window_BattleStatus.prototype.hide.call(this);
    $gameParty.select(null);
};
//ѡ��
Window_BattleActor.prototype.select = function(index) {
    Window_BattleStatus.prototype.select.call(this, index);
    $gameParty.select(this.actor());
};
//��ɫ
Window_BattleActor.prototype.actor = function() {
    return $gameParty.members()[this.index()];
};
