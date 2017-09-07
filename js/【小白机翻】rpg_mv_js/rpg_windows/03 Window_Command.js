
//-----------------------------------------------------------------------------
// Window_Command
// ��������
// The superclass of windows for selecting a command.
// ����ѡ������ĳ�����

function Window_Command() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_Command.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_Command.prototype.constructor = Window_Command;
//��ʼ��
Window_Command.prototype.initialize = function(x, y) {
    this.clearCommandList();
    this.makeCommandList();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this.activate();
};
//���ڿ�
Window_Command.prototype.windowWidth = function() {
    return 240;
};
//���ڸ�
Window_Command.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
//�ɼ�����
Window_Command.prototype.numVisibleRows = function() {
    return Math.ceil(this.maxItems() / this.maxCols());
};
//�����Ŀ��
Window_Command.prototype.maxItems = function() {
    return this._list.length;
};
//��������б�
Window_Command.prototype.clearCommandList = function() {
    this._list = [];
};
//���������б�
Window_Command.prototype.makeCommandList = function() {
};
//�������
Window_Command.prototype.addCommand = function(name, symbol, enabled, ext) {
    if (enabled === undefined) {
        enabled = true;
    }
    if (ext === undefined) {
        ext = null;
    }
    this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext});
};
//������
Window_Command.prototype.commandName = function(index) {
    return this._list[index].name;
};
//������
Window_Command.prototype.commandSymbol = function(index) {
    return this._list[index].symbol;
};
//����������
Window_Command.prototype.isCommandEnabled = function(index) {
    return this._list[index].enabled;
};
//��ǰ����
Window_Command.prototype.currentData = function() {
    return this.index() >= 0 ? this._list[this.index()] : null;
};
//�ǵ�ǰ��Ŀ����
Window_Command.prototype.isCurrentItemEnabled = function() {
    return this.currentData() ? this.currentData().enabled : false;
};
//��ǰ���
Window_Command.prototype.currentSymbol = function() {
    return this.currentData() ? this.currentData().symbol : null;
};
//��ǰ��ȡ
Window_Command.prototype.currentExt = function() {
    return this.currentData() ? this.currentData().ext : null;
};
//Ѱ�ұ��
Window_Command.prototype.findSymbol = function(symbol) {
    for (var i = 0; i < this._list.length; i++) {
        if (this._list[i].symbol === symbol) {
            return i;
        }
    }
    return -1;
};
//ѡ����
Window_Command.prototype.selectSymbol = function(symbol) {
    var index = this.findSymbol(symbol);
    if (index >= 0) {
        this.select(index);
    } else {
        this.select(0);
    }
};
//Ѱ����ȡ
Window_Command.prototype.findExt = function(ext) {
    for (var i = 0; i < this._list.length; i++) {
        if (this._list[i].ext === ext) {
            return i;
        }
    }
    return -1;
};
//ѡ����ȡ
Window_Command.prototype.selectExt = function(ext) {
    var index = this.findExt(ext);
    if (index >= 0) {
        this.select(index);
    } else {
        this.select(0);
    }
};
//������Ŀ
Window_Command.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};
//��Ŀ�ı�����
Window_Command.prototype.itemTextAlign = function() {
    return 'left';
};
//��ȷ������
Window_Command.prototype.isOkEnabled = function() {
    return true;
};
//���� ȷ������
Window_Command.prototype.callOkHandler = function() {
    var symbol = this.currentSymbol();
    if (this.isHandled(symbol)) {
        this.callHandler(symbol);
    } else if (this.isHandled('ok')) {
        Window_Selectable.prototype.callOkHandler.call(this);
    } else {
        this.activate();
    }
};
//ˢ��
Window_Command.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
};
