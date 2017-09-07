
//-----------------------------------------------------------------------------
// Sprite_Timer
// ��ʱ������
// The sprite for displaying the timer.
// ��ʾ��ʱ�� �ľ���

function Sprite_Timer() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Sprite_Timer.prototype = Object.create(Sprite.prototype);
//���ô�����
Sprite_Timer.prototype.constructor = Sprite_Timer;
//��ʼ��
Sprite_Timer.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._seconds = 0;
    this.createBitmap();
    this.update();
};
//����λͼ
Sprite_Timer.prototype.createBitmap = function() {
    this.bitmap = new Bitmap(96, 48);
    this.bitmap.fontSize = 32;
};
//����
Sprite_Timer.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
    this.updatePosition();
    this.updateVisibility();
};
//����λͼ
Sprite_Timer.prototype.updateBitmap = function() {
    if (this._seconds !== $gameTimer.seconds()) {
        this._seconds = $gameTimer.seconds();
        this.redraw();
    }
};
//�ػ�
Sprite_Timer.prototype.redraw = function() {
    var text = this.timerText();
    var width = this.bitmap.width;
    var height = this.bitmap.height;
    this.bitmap.clear();
    this.bitmap.drawText(text, 0, 0, width, height, 'center');
};
//��ʱ���ı�
Sprite_Timer.prototype.timerText = function() {
    var min = Math.floor(this._seconds / 60) % 60;
    var sec = this._seconds % 60;
    return min.padZero(2) + ':' + sec.padZero(2);
};
//����λ��
Sprite_Timer.prototype.updatePosition = function() {
    this.x = Graphics.width - this.bitmap.width;
    this.y = 0;
};
//���¿ɼ���
Sprite_Timer.prototype.updateVisibility = function() {
    this.visible = $gameTimer.isWorking();
};
