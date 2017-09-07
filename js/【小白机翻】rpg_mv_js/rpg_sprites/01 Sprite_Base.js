
//-----------------------------------------------------------------------------
// Sprite_Base
// ��������
// The sprite class with a feature which displays animations.
// ��ʾһ�����������ľ�����

function Sprite_Base() {
    this.initialize.apply(this, arguments);
}
//����ԭ�� 
Sprite_Base.prototype = Object.create(Sprite.prototype);
//���ô�����
Sprite_Base.prototype.constructor = Sprite_Base;
//��ʼ��
Sprite_Base.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._animationSprites = [];
    this._effectTarget = this;
    this._hiding = false;
};
//����
Sprite_Base.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.updateAnimationSprites();
};
//����
Sprite_Base.prototype.hide = function() {
    this._hiding = true;
    this.updateVisibility();
};
//��ʾ
Sprite_Base.prototype.show = function() {
    this._hiding = false;
    this.updateVisibility();
};
//���¿ɼ���
Sprite_Base.prototype.updateVisibility = function() {
    this.visible = !this._hiding;
};
//���¶�������
Sprite_Base.prototype.updateAnimationSprites = function() {
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                sprite.remove();
            }
        }
    }
};
//��ʼ����
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};
//�Ƕ���������
Sprite_Base.prototype.isAnimationPlaying = function() {
    return this._animationSprites.length > 0;
};
