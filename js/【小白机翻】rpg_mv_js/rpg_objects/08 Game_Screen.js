
//-----------------------------------------------------------------------------
// Game_Screen
// ��Ϸ����   $gameScreen
// The game object class for screen effect data, such as changes in color tone
// and flashes.
// ��ɫ�ʺ���˸ �ȸı�Ļ���Ч�����ݵ���Ϸ������

function Game_Screen() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Screen.prototype.initialize = function() {
	//���
    this.clear();
};
//���
Game_Screen.prototype.clear = function() {
	//������뵭��
    this.clearFade();
	//���ɫ��
    this.clearTone();
	//�����˸
    this.clearFlash();
	//�����
    this.clearShake();
	//�������
    this.clearZoom();
	//�������
    this.clearWeather();
	//���ͼƬ
    this.clearPictures();
};
//��ս����ʼ
Game_Screen.prototype.onBattleStart = function() {
	//������뵭��
    this.clearFade();
	//�����˸
    this.clearFlash();
	//�����
    this.clearShake();
	//�������
    this.clearZoom();
	//Ĩȥս��ͼƬ
    this.eraseBattlePictures();
};
//����
Game_Screen.prototype.brightness = function() {
	//���� ����
    return this._brightness;
};
//ɫ��
Game_Screen.prototype.tone = function() {
	//���� ɫ��
    return this._tone;
};
//��˸��ɫ
Game_Screen.prototype.flashColor = function() {
	//���� ��˸��ɫ
    return this._flashColor;
};
//��
Game_Screen.prototype.shake = function() {
	//���� ��
    return this._shake;
};
//����x
Game_Screen.prototype.zoomX = function() {
	//���� ����x
    return this._zoomX;
};
//����y
Game_Screen.prototype.zoomY = function() {
	//���� ����y
    return this._zoomY;
};
//���ű���
Game_Screen.prototype.zoomScale = function() {
	//���� ���ű���
    return this._zoomScale;
};
//��������
Game_Screen.prototype.weatherType = function() {
	//���� ��������
    return this._weatherType;
};
//����ǿ��
Game_Screen.prototype.weatherPower = function() {
	//���� ����ǿ��
    return this._weatherPower;
};
//ͼƬ
Game_Screen.prototype.picture = function(pictureId) {
    //��ʵͼƬid = ��ʵͼƬid(pictureIdͼƬid)
    var realPictureId = this.realPictureId(pictureId);
    //���� ͼƬ��[��ʵͼƬid]
    return this._pictures[realPictureId];
};
//��ʵͼƬid
Game_Screen.prototype.realPictureId = function(pictureId) {
	//��� ��Ϸ���� ��ս��
    if ($gameParty.inBattle()) {
	    //���� ͼƬid + ���ͼƬ��
        return pictureId + this.maxPictures();
    //���� 
    } else {
	    //���� ͼƬid 
        return pictureId;
    }
};
//������뵭��
Game_Screen.prototype.clearFade = function() {
	//���� = 255
    this._brightness = 255;
    //��������ʱ�� = 0
    this._fadeOutDuration = 0;
    //�������ʱ�� = 0
    this._fadeInDuration = 0;
};
//���ɫ��
Game_Screen.prototype.clearTone = function() {
	//ɫ�� = [0,0,0,0]
    this._tone = [0, 0, 0, 0];
    //ɫ��Ŀ�� = [0,0,0,0]
    this._toneTarget = [0, 0, 0, 0];
    //ɫ������ʱ�� = 0
    this._toneDuration = 0;
};
//�����˸
Game_Screen.prototype.clearFlash = function() {
	//��˸��ɫ = [0,0,0,0]
    this._flashColor = [0, 0, 0, 0];
    //��˸����ʱ�� = 0
    this._flashDuration = 0;
};
//�����
Game_Screen.prototype.clearShake = function() {
	//��ǿ�� = 0
    this._shakePower = 0;
    //���ٶ� = 0
    this._shakeSpeed = 0;
    //�𶯳���ʱ�� = 0
    this._shakeDuration = 0;
    //�𶯷��� = 1
    this._shakeDirection = 1;
    //�� = 0
    this._shake = 0;
};
//�������
Game_Screen.prototype.clearZoom = function() {
	//����x = 0
    this._zoomX = 0;
	//����y = 0
    this._zoomY = 0;
	//���ű��� = 1
    this._zoomScale = 1;
	//���ű���Ŀ�� = 1
    this._zoomScaleTarget = 1;
	//���ų���ʱ�� = 0
    this._zoomDuration = 0;
};
//�������
Game_Screen.prototype.clearWeather = function() {
	//�������� = "none"
    this._weatherType = 'none';
    //����ǿ�� = 0
    this._weatherPower = 0;
    //����ǿ��Ŀ�� = 0
    this._weatherPowerTarget = 0;
    //��������ʱ�� = 0
    this._weatherDuration = 0;
};
//���ͼƬ��
Game_Screen.prototype.clearPictures = function() {
	//ͼƬ�� = []
    this._pictures = [];
};
//Ĩȥս��ͼƬ
Game_Screen.prototype.eraseBattlePictures = function() {
	//ͼƬ�� = ͼƬ�� �и� (0,���ͼƬ�� + 1)
    this._pictures = this._pictures.slice(0, this.maxPictures() + 1);
};
//���ͼƬ��
Game_Screen.prototype.maxPictures = function() {
	//���� 100
    return 100;
};
//��ʼ����
Game_Screen.prototype.startFadeOut = function(duration) {
	//��������ʱ�� = ����ʱ��
    this._fadeOutDuration = duration;
    //�������ʱ�� = 0
    this._fadeInDuration = 0;
};
//��ʼ����
Game_Screen.prototype.startFadeIn = function(duration) {
    //�������ʱ�� = ����ʱ��
    this._fadeInDuration = duration;
	//��������ʱ�� = 0
    this._fadeOutDuration = 0;
};
//��ʼ��ɫ
Game_Screen.prototype.startTint = function(tone, duration) {
	//ɫ��Ŀ�� = ɫ�� ��¡
    this._toneTarget = tone.clone();
    //ɫ������ʱ�� = ����ʱ��
    this._toneDuration = duration;
    //��� ɫ������ʱ�� === 0 
    if (this._toneDuration === 0) {
	    //ɫ�� = ɫ��Ŀ�� ��¡
        this._tone = this._toneTarget.clone();
    }
};
//��ʼ��˸
Game_Screen.prototype.startFlash = function(color, duration) {
	//��˸��ɫ = ��ɫ ��¡
    this._flashColor = color.clone();
    //��˸����ʱ�� = ����ʱ��
    this._flashDuration = duration;
};
//��ʼ��
Game_Screen.prototype.startShake = function(power, speed, duration) {
	//��ǿ�� = ǿ��
    this._shakePower = power;
    //���ٶ� = �ٶ�
    this._shakeSpeed = speed;
    //�𶯳���ʱ�� = ����ʱ��
    this._shakeDuration = duration;
};
//��ʼ����
Game_Screen.prototype.startZoom = function(x, y, scale, duration) {
	//����x = x
    this._zoomX = x;
    //����y = y
    this._zoomY = y;
    //���ű���Ŀ�� = ����
    this._zoomScaleTarget = scale;
    //���ų���ʱ�� = ����ʱ��
    this._zoomDuration = duration;
};
//��������
Game_Screen.prototype.setZoom = function(x, y, scale) {
	//����x = x
    this._zoomX = x;
    //����y = y
    this._zoomY = y;
    //���ű��� = ����
    this._zoomScale = scale;
};
//�ı�����
Game_Screen.prototype.changeWeather = function(type, power, duration) {
	//��� (���� !== 'none' ���� ����ʱ�� === 0 )
    if (type !== 'none' || duration === 0) {
	    //�������� = ����
        this._weatherType = type;
    }
    //����ǿ��Ŀ�� =  ��� ���� === 'none' ���� 0 ���� ���� ǿ��
    this._weatherPowerTarget = type === 'none' ? 0 : power;
    //��������ʱ�� = ����ʱ��
    this._weatherDuration = duration;
    //��� ����ʱ�� === 0 
    if (duration === 0) {
	    //����ǿ�� = ����ǿ��Ŀ��
        this._weatherPower = this._weatherPowerTarget;
    }
};
//����
Game_Screen.prototype.update = function() {
    //���µ���
    this.updateFadeOut();
    //���µ���
    this.updateFadeIn();
    //����ɫ��
    this.updateTone();
    //������˸
    this.updateFlash();
    //������
    this.updateShake();
    //��������
    this.updateZoom();
    //��������
    this.updateWeather();
    //����ͼƬ
    this.updatePictures();
};
//���µ���
Game_Screen.prototype.updateFadeOut = function() {
	//��� ��������ʱ�� > 0
    if (this._fadeOutDuration > 0) {
	    //d = ��������ʱ��
        var d = this._fadeOutDuration;
        //���� = ����  * (d-1) / d    
        this._brightness = (this._brightness * (d - 1)) / d;
        //��������ʱ��--
        this._fadeOutDuration--;
    }
};
//���µ���
Game_Screen.prototype.updateFadeIn = function() {
	//��� ��������ʱ�� > 0
    if (this._fadeInDuration > 0) {
	    //d = ��������ʱ��
        var d = this._fadeInDuration;
        //���� =( ����  * (d-1) + 255) / d  
        this._brightness = (this._brightness * (d - 1) + 255) / d;
        //��������ʱ��--
        this._fadeInDuration--;
    }
};
//����ɫ��
Game_Screen.prototype.updateTone = function() {
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
//������˸
Game_Screen.prototype.updateFlash = function() {
	//��� ��˸����ʱ�� > 0 
    if (this._flashDuration > 0) {
	    //d = ��˸����ʱ��
        var d = this._flashDuration;
        //��˸��ɫ[3] *= (d-1) / d 
        this._flashColor[3] *= (d - 1) / d;
        //��˸����ʱ��--
        this._flashDuration--;
    }
};
//������
Game_Screen.prototype.updateShake = function() {
	//��� �𶯳���ʱ�� > 0 ���� ��!== 0
    if (this._shakeDuration > 0 || this._shake !== 0) {
	    //delta = (��ǿ�� * ���ٶ� * �𶯳���ʱ�� ) / 10
        var delta = (this._shakePower * this._shakeSpeed * this._shakeDirection) / 10;
        //��� �𶯳���ʱ�� <= 1 ���� �� * (�� + delta) < 0 
        if (this._shakeDuration <= 1 && this._shake * (this._shake + delta) < 0) {
	        //�� = 0
            this._shake = 0;
        //����
        } else {
	        //�� += delta
            this._shake += delta;
        }
        //��� �� > ��ǿ�� * 2 
        if (this._shake > this._shakePower * 2) {
	        //�𶯷��� = - 1 
            this._shakeDirection = -1;
        }
        //��� �� < - ��ǿ�� * 2 
        if (this._shake < - this._shakePower * 2) {
	        //�𶯷��� =  1 
            this._shakeDirection = 1;
        }
        //�𶯳���ʱ��--
        this._shakeDuration--;
    }
};
//��������
Game_Screen.prototype.updateZoom = function() {
	//���ų���ʱ�� > 0 
    if (this._zoomDuration > 0) {
	    //d = ���ų���ʱ��
        var d = this._zoomDuration;
        //t = ���ű���Ŀ��
        var t = this._zoomScaleTarget;
        //���ű��� = (���ű��� * (d-1) + t ) / d
        this._zoomScale = (this._zoomScale * (d - 1) + t) / d;
        //���ų���ʱ��--
        this._zoomDuration--;
    }
};
//��������
Game_Screen.prototype.updateWeather = function() {
	//��� ��������ʱ�� > 0
    if (this._weatherDuration > 0) {
	    //d = ��������ʱ�� 
        var d = this._weatherDuration;
        //t = ����ǿ��Ŀ��
        var t = this._weatherPowerTarget;
        //����ǿ�� = (����ǿ�� * (d-1) + t ) / d
        this._weatherPower = (this._weatherPower * (d - 1) + t) / d;
        //��������ʱ��--
        this._weatherDuration--;
        //��� ��������ʱ�� ==0 ���� ����ǿ��Ŀ�� ==0 
        if (this._weatherDuration === 0 && this._weatherPowerTarget === 0) {
	        //�������� = 'none'
            this._weatherType = 'none';
        }
    }
};
//����ͼƬ
Game_Screen.prototype.updatePictures = function() {
	//ͼƬ�� ��ÿһ�� (���� ͼƬ)
    this._pictures.forEach(function(picture) {
	    //��� ͼƬ 
        if (picture) {
	        //ͼƬ ����
            picture.update();
        }
    });
};
//������˸Ϊ���˺�
Game_Screen.prototype.startFlashForDamage = function() {
	//��ʼ��˸([255,0,0,128],8)
    this.startFlash([255, 0, 0, 128], 8);
};
//��ʾͼƬ
Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y,
                                             scaleX, scaleY, opacity, blendMode) {
	//��ʵͼƬid = ��ʵͼƬid(ͼƬid)
    var realPictureId = this.realPictureId(pictureId);
    //ͼƬ = �� ��ϷͼƬ
    var picture = new Game_Picture();
    //ͼƬ ��ʾ(����,ԭ��,x,y,����x,����y,��͸����,��Ϸ�ʽ)
    picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    //ͼƬ��[��ʵͼƬid] = ͼƬ
    this._pictures[realPictureId] = picture;
};
//�ƶ�ͼƬ
Game_Screen.prototype.movePicture = function(pictureId, origin, x, y, scaleX,
                                             scaleY, opacity, blendMode, duration) {
	//ͼƬ = ͼƬ(ͼƬid)
    var picture = this.picture(pictureId);
    //��� ͼƬ 
    if (picture) {
	    //ͼƬ �ƶ�  (ԭ��,x,y,����x,����y,��͸����,��Ϸ�ʽ,����ʱ��)
        picture.move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
    }
};
//��תͼƬ
Game_Screen.prototype.rotatePicture = function(pictureId, speed) {
	//ͼƬ = ͼƬ(ͼƬid)
    var picture = this.picture(pictureId);
    //��� ͼƬ 
    if (picture) {
	    //ͼƬ ��ת(�ٶ�)
        picture.rotate(speed);
    }
};
//��ɫͼƬ
Game_Screen.prototype.tintPicture = function(pictureId, tone, duration) {
	//ͼƬ = ͼƬ(ͼƬid)
    var picture = this.picture(pictureId);
    //��� ͼƬ 
    if (picture) {
	    //ͼƬ ��ɫ (ɫ�� ,����ʱ��)
        picture.tint(tone, duration);
    }
};
//ĨȥͼƬ
Game_Screen.prototype.erasePicture = function(pictureId) {
	//��ʵͼƬid = ��ʵͼƬid(ͼƬid)
    var realPictureId = this.realPictureId(pictureId);
    //ͼƬ��[��ʵͼƬid] = null
    this._pictures[realPictureId] = null;
};
