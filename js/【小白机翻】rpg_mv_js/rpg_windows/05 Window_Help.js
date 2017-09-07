
//-----------------------------------------------------------------------------
// Window_Help
// ���ڰ���
// The window for displaying the description of the selected item.
// ��ʾѡ����Ŀ˵���Ĵ���

function Window_Help() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_Help.prototype = Object.create(Window_Base.prototype);
//���ô�����
Window_Help.prototype.constructor = Window_Help;
//��ʼ��
Window_Help.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(numLines || 2);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};
//�����ı�
Window_Help.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text;
        this.refresh();
    }
};
//���
Window_Help.prototype.clear = function() {
    this.setText('');
};
//������Ŀ
Window_Help.prototype.setItem = function(item) {
    this.setText(item ? item.description : '');
};
//ˢ��
Window_Help.prototype.refresh = function() {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};
