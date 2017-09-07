
//-----------------------------------------------------------------------------
// Sprite_Battler
// ս���߾���
// The superclass of Sprite_Actor and Sprite_Enemy.

function Sprite_Battler() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Sprite_Battler.prototype = Object.create(Sprite_Base.prototype);
//���ô�����
Sprite_Battler.prototype.constructor = Sprite_Battler;
//��ʼ��
Sprite_Battler.prototype.initialize = function(battler) {
	//�̳� �������� ��ʼ��
    Sprite_Base.prototype.initialize.call(this);
	//��ʼ����Ա
    this.initMembers();
	//����ս����
    this.setBattler(battler);
};
//��ʼ����Ա
Sprite_Battler.prototype.initMembers = function() {
	//ê x = 0.5
    this.anchor.x = 0.5;
    //ê y = 1
    this.anchor.y = 1;
    //ս���� = null
    this._battler = null;
    //�˺���
    this._damages = [];
    //ʼλx = 0
    this._homeX = 0;
    //ʼλy = 0
    this._homeY = 0;
    //ƫ����x = 0
    this._offsetX = 0;
    //ƫ����y = 0
    this._offsetY = 0;
    //Ŀ��ƫ��x = nan
    this._targetOffsetX = NaN;
    //Ŀ��ƫ��y = nan
    this._targetOffsetY = NaN;
    //�˶�����ʱ��
    this._movementDuration = 0;
    //ѡ��Ч������
    this._selectionEffectCount = 0;
};
//����ս����
Sprite_Battler.prototype.setBattler = function(battler) {
	//ս���� = battler
    this._battler = battler;
};
//����ʼλ
Sprite_Battler.prototype.setHome = function(x, y) {
	//ʼλx = x
    this._homeX = x;
    //ʼλy = y
    this._homeY = y;
    //����λ��
    this.updatePosition();
};
//����
Sprite_Battler.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._battler) {
        this.updateMain();
        this.updateAnimation();
        this.updateDamagePopup();
        this.updateSelectionEffect();
    } else {
        this.bitmap = null;
    }
};
//���¿ɼ���
Sprite_Battler.prototype.updateVisibility = function() {
    Sprite_Base.prototype.updateVisibility.call(this);
    if (!this._battler || !this._battler.isSpriteVisible()) {
        this.visible = false;
    }
};
//������Ҫ
Sprite_Battler.prototype.updateMain = function() {
    if (this._battler.isSpriteVisible()) {
        this.updateBitmap();
        this.updateFrame();
    }
    this.updateMove();
    this.updatePosition();
};
//����λͼ
Sprite_Battler.prototype.updateBitmap = function() {
};
//����֡
Sprite_Battler.prototype.updateFrame = function() {
};
//�����ƶ�
Sprite_Battler.prototype.updateMove = function() {
    if (this._movementDuration > 0) {
        var d = this._movementDuration;
        this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
        this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
        this._movementDuration--;
        if (this._movementDuration === 0) {
            this.onMoveEnd();
        }
    }
};
//����λ��
Sprite_Battler.prototype.updatePosition = function() {
    this.x = this._homeX + this._offsetX;
    this.y = this._homeY + this._offsetY;
};
//���¶���
Sprite_Battler.prototype.updateAnimation = function() {
    this.setupAnimation();
};
//�����˺�Ծ��
Sprite_Battler.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
        for (var i = 0; i < this._damages.length; i++) {
            this._damages[i].update();
        }
        if (!this._damages[0].isPlaying()) {
            this.parent.removeChild(this._damages[0]);
            this._damages.shift();
        }
    }
};
//����ѡ����
Sprite_Battler.prototype.updateSelectionEffect = function() {
    var target = this._effectTarget;
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
            target.setBlendColor([255, 255, 255, 64]);
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
    }
};
//��װ����
Sprite_Battler.prototype.setupAnimation = function() {
    while (this._battler.isAnimationRequested()) {
        var data = this._battler.shiftAnimation();
        var animation = $dataAnimations[data.animationId];
        var mirror = data.mirror;
        var delay = animation.position === 3 ? 0 : data.delay;
        this.startAnimation(animation, mirror, delay);
        for (var i = 0; i < this._animationSprites.length; i++) {
            var sprite = this._animationSprites[i];
            sprite.visible = this._battler.isSpriteVisible();
        }
    }
};
//��װ�˺�Ծ��
Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._battler);
            this._damages.push(sprite);
            this.parent.addChild(sprite);
        }
        this._battler.clearDamagePopup();
        this._battler.clearResult();
    }
};
//�˺�ƫ��x
Sprite_Battler.prototype.damageOffsetX = function() {
    return 0;
};
//�˺�ƫ��y
Sprite_Battler.prototype.damageOffsetY = function() {
    return 0;
};
//��ʼ�ƶ�
Sprite_Battler.prototype.startMove = function(x, y, duration) {
    if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
        this._targetOffsetX = x;
        this._targetOffsetY = y;
        this._movementDuration = duration;
        if (duration === 0) {
            this._offsetX = x;
            this._offsetY = y;
        }
    }
};
//���ƶ�����
Sprite_Battler.prototype.onMoveEnd = function() {
};
//��Ч����
Sprite_Battler.prototype.isEffecting = function() {
    return false;
};
//���ƶ���
Sprite_Battler.prototype.isMoving = function() {
    return this._movementDuration > 0;
};
//�ڳ�ʼλ��
Sprite_Battler.prototype.inHomePosition = function() {
    return this._offsetX === 0 && this._offsetY === 0;
};
