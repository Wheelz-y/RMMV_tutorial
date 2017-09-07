
//-----------------------------------------------------------------------------
// Window_MenuStatus
// ����״̬
// The window for displaying party member status on the menu screen.
// �˵���������ʾ�����Ա״̬�Ĵ���

function Window_MenuStatus() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_MenuStatus.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_MenuStatus.prototype.constructor = Window_MenuStatus;
//��ʼ��
Window_MenuStatus.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.loadImages();
    this.refresh();
};
//���ڿ�
Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - 240;
};
//���ڸ�
Window_MenuStatus.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};
//�����Ŀ
Window_MenuStatus.prototype.maxItems = function() {
    return $gameParty.size();
};
//��Ŀ��
Window_MenuStatus.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};
//�ɼ�����Ŀ
Window_MenuStatus.prototype.numVisibleRows = function() {
    return 4;
};
//��ȡͼ��
Window_MenuStatus.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.loadFace(actor.faceName());
    }, this);
};
//������Ŀ
Window_MenuStatus.prototype.drawItem = function(index) {
    this.drawItemBackground(index);
    this.drawItemImage(index);
    this.drawItemStatus(index);
};
//������Ŀ����
Window_MenuStatus.prototype.drawItemBackground = function(index) {
    if (index === this._pendingIndex) {
        var rect = this.itemRect(index);
        var color = this.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    }
};
//������Ŀͼ��
Window_MenuStatus.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, 144, rect.height - 2);
    this.changePaintOpacity(true);
};
//������Ŀ״̬
Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};
//����ȷ��
Window_MenuStatus.prototype.processOk = function() {
    Window_Selectable.prototype.processOk.call(this);
    $gameParty.setMenuActor($gameParty.members()[this.index()]);
};
//�ǵ�ǰ��Ŀ����
Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
    if (this._formationMode) {
        var actor = $gameParty.members()[this.index()];
        return actor && actor.isFormationChangeOk();
    } else {
        return true;
    }
};
//ѡ���б�
Window_MenuStatus.prototype.selectLast = function() {
    this.select($gameParty.menuActor().index() || 0);
};
//���ģʽ
Window_MenuStatus.prototype.formationMode = function() {
    return this._formationMode;
};
//���ñ��ģʽ
Window_MenuStatus.prototype.setFormationMode = function(formationMode) {
    this._formationMode = formationMode;
};
//δ��������
Window_MenuStatus.prototype.pendingIndex = function() {
    return this._pendingIndex;
};
//����δ��������
Window_MenuStatus.prototype.setPendingIndex = function(index) {
    var lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};
