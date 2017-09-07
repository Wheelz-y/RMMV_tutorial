
//-----------------------------------------------------------------------------
// Sprite_Balloon
// ������
// The sprite for displaying a balloon icon.
// ��ʾ����ͼ��ľ���

function Sprite_Balloon() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Sprite_Balloon.prototype = Object.create(Sprite_Base.prototype);
//���ô�����
Sprite_Balloon.prototype.constructor = Sprite_Balloon;
//��ʼ��
Sprite_Balloon.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
    this.loadBitmap();
};
//��ʼ����Ա
Sprite_Balloon.prototype.initMembers = function() {
    this._balloonId = 0;
    this._duration = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.z = 7;
};
//��ȡͼƬ
Sprite_Balloon.prototype.loadBitmap = function() {
    this.bitmap = ImageManager.loadSystem('Balloon');
    this.setFrame(0, 0, 0, 0);
};
//��װ
Sprite_Balloon.prototype.setup = function(balloonId) {
    this._balloonId = balloonId;
    this._duration = 8 * this.speed() + this.waitTime();
};
//����
Sprite_Balloon.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._duration > 0) {
        this._duration--;
        if (this._duration > 0) {
            this.updateFrame();
        }
    }
};
//����֡
Sprite_Balloon.prototype.updateFrame = function() {
    var w = 48;
    var h = 48;
    var sx = this.frameIndex() * w;
    var sy = (this._balloonId - 1) * h;
    this.setFrame(sx, sy, w, h);
};
//�ٶ�
Sprite_Balloon.prototype.speed = function() {
    return 8;
};
//�ȴ�ʱ��
Sprite_Balloon.prototype.waitTime = function() {
    return 12;
};
//֡����
Sprite_Balloon.prototype.frameIndex = function() {
    var index = (this._duration - this.waitTime()) / this.speed();
    return 7 - Math.max(Math.floor(index), 0);
};
//�ǲ�����
Sprite_Balloon.prototype.isPlaying = function() {
    return this._duration > 0;
};
