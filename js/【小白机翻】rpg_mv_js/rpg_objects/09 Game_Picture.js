
//-----------------------------------------------------------------------------
// Game_Picture
// ��ϷͼƬ
// The game object class for a picture.
// ͼƬ����Ϸ������

function Game_Picture() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Picture.prototype.initialize = function() {
	//��ʼ������
    this.initBasic();
    //��ʼ��Ŀ��
    this.initTarget();
    //��ʼ��ɫ��
    this.initTone();
    //��ʼ����ת
    this.initRotation();
};
//����
Game_Picture.prototype.name = function() {
	//���� ����
    return this._name;
};
//ԭ��
Game_Picture.prototype.origin = function() {
	//���� ԭ��
    return this._origin;
};
//x
Game_Picture.prototype.x = function() {
	//���� x
    return this._x;
};
//y
Game_Picture.prototype.y = function() {
	//���� y
    return this._y;
};
//����x
Game_Picture.prototype.scaleX = function() {
	//���� ����x
    return this._scaleX;
};
//����y
Game_Picture.prototype.scaleY = function() {
	//���� ����y
    return this._scaleY;
};
//��͸����
Game_Picture.prototype.opacity = function() {
	//���� ��͸����
    return this._opacity;
};
//��Ϸ�ʽ
Game_Picture.prototype.blendMode = function() {
	//���� ��Ϸ�ʽ
    return this._blendMode;
};
//ɫ��
Game_Picture.prototype.tone = function() {
	//���� ɫ��
    return this._tone;
};
//��
Game_Picture.prototype.angle = function() {
	//���� ��
    return this._angle;
};
//��ʼ������
Game_Picture.prototype.initBasic = function() {
	//���� = ''
    this._name = '';
	//ԭ�� = 0
    this._origin = 0;
	//x = 0 
    this._x = 0;
	//y = 0 
    this._y = 0;
	//����x = 100
    this._scaleX = 100;
	//����y = 100
    this._scaleY = 100;
	//��͸���� = 255
    this._opacity = 255;
	//��Ϸ�ʽ = 0
    this._blendMode = 0;
};
//��ʼ��Ŀ��
Game_Picture.prototype.initTarget = function() {
	//Ŀ��x = x 
    this._targetX = this._x;
    //Ŀ��y = y
    this._targetY = this._y;
    //Ŀ�����x = ����x
    this._targetScaleX = this._scaleX;
    //Ŀ�����y = ����y
    this._targetScaleY = this._scaleY;
    //Ŀ�겻͸���� = ��͸����
    this._targetOpacity = this._opacity;
    //����ʱ�� = 0
    this._duration = 0;
};
//��ʼ��ɫ��
Game_Picture.prototype.initTone = function() {
	//ɫ�� = null
    this._tone = null;
    //ɫ��Ŀ�� = null
    this._toneTarget = null;
    //ɫ������ʱ�� = 
    this._toneDuration = 0;
};
//��ʼ����ת
Game_Picture.prototype.initRotation = function() {
	//�Ƕ� = 0 
    this._angle = 0;
    //��ת�ٶ� = 0
    this._rotationSpeed = 0;
};
//��ʾ
Game_Picture.prototype.show = function(name, origin, x, y, scaleX,
                                       scaleY, opacity, blendMode) {
	//���� = ����
    this._name = name;
    //ԭ�� = ԭ��
    this._origin = origin;
    //x = x 
    this._x = x;
    //y = y 
    this._y = y;
    //����x = ����x 
    this._scaleX = scaleX;
    //����y = ����y
    this._scaleY = scaleY;
    //��͸���� = ��͸����
    this._opacity = opacity;
    //���ģʽ = ���ģʽ
    this._blendMode = blendMode;
    //��ʼ��Ŀ��
    this.initTarget();
    //��ʼ��ɫ��
    this.initTone();
    //��ʼ����ת
    this.initRotation();
};
//�ƶ�
Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY,
                                       opacity, blendMode, duration) {
    //ԭ�� = ԭ��
    this._origin = origin;
    //Ŀ��x = x 
    this._targetX = x;
    //Ŀ��y = y 
    this._targetY = y;
    //Ŀ�����x = ����x 
    this._targetScaleX = scaleX;
    //Ŀ�����y = ����y
    this._targetScaleY = scaleY;
    //Ŀ�겻͸���� = ��͸����
    this._targetOpacity = opacity;
    //���ģʽ = ���ģʽ
    this._blendMode = blendMode;
    //����ʱ�� = ����ʱ��
    this._duration = duration;
};
//��ת
Game_Picture.prototype.rotate = function(speed) {
	//��ת�ٶ� = �ٶ�
    this._rotationSpeed = speed;
};
//��ɫ
Game_Picture.prototype.tint = function(tone, duration) {
	//��� ���� ɫ��
    if (!this._tone) {
	    //ɫ�� = [0,0,0,0]
        this._tone = [0, 0, 0, 0];
    }
    //ɫ��Ŀ�� = ɫ�� ��¡
    this._toneTarget = tone.clone();
    //ɫ������ʱ�� = ����ʱ��
    this._toneDuration = duration;
    //��� ɫ������ʱ�� == 0 
    if (this._toneDuration === 0) {
	    //ɫ�� = ɫ��Ŀ�� ��¡
        this._tone = this._toneTarget.clone();
    }
};
//Ĩȥ
Game_Picture.prototype.erase = function() {
	//���� = ''
    this._name = '';
    //ԭ�� = 0
    this._origin = 0;
    //��ʼ��Ŀ��
    this.initTarget();
    //��ʼ��ɫ��
    this.initTone();
    //��ʼ����ת
    this.initRotation();
};
//����
Game_Picture.prototype.update = function() {
	//�����ƶ�
    this.updateMove();
	//����ɫ��
    this.updateTone();
	//������ת
    this.updateRotation();
};
//�����ƶ�
Game_Picture.prototype.updateMove = function() {
	//��� ����ʱ�� > 0 
    if (this._duration > 0) {
	    //d =����ʱ��
        var d = this._duration;
        //x = (x * (d-1) + Ŀ��x ) / d 
        this._x = (this._x * (d - 1) + this._targetX) / d;
        //y = (y * (d-1) + Ŀ��y ) / d 
        this._y = (this._y * (d - 1) + this._targetY) / d;
        //����x = (����x  * (d-1) + Ŀ�����x ) / d 
        this._scaleX  = (this._scaleX  * (d - 1) + this._targetScaleX)  / d;
        //����y = (����y * (d-1) + Ŀ�����y ) / d 
        this._scaleY  = (this._scaleY  * (d - 1) + this._targetScaleY)  / d;
        //��͸���� = (��͸���� * (d-1) + Ŀ�겻͸���� ) / d 
        this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;
        //����ʱ��--
        this._duration--;
    }
};
//����ɫ��
Game_Picture.prototype.updateTone = function() {
	//��� ɫ������ʱ�� > 0 
    if (this._toneDuration > 0) {
	    //d = ɫ������ʱ��
        var d = this._toneDuration;
        //ѭ�� ��ʼʱ i = 0 ;�� i < 4 ʱ;ÿһ�� i++
        for (var i = 0; i < 4; i++) {
	        //ɫ��[i] = (  ɫ��[i] * (d - 1) + ɫ��Ŀ��[i]) / d  
            this._tone[i] = (this._tone[i] * (d - 1) + this._toneTarget[i]) / d;
        }
	    //ɫ������ʱ��--
        this._toneDuration--;
    }
};
//������ת
Game_Picture.prototype.updateRotation = function() {
	//��� ��ת�ٶ� > 0
    if (this._rotationSpeed > 0) {
	    //�Ƕ� +=  ��ת�ٶ� / 2 
        this._angle += this._rotationSpeed / 2;
    }
};
