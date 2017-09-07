
//-----------------------------------------------------------------------------
// Scene_Base
// ��������
// The superclass of all scenes within the game.
// ��Ϸ�����г����� ������
 
function Scene_Base() {
	//���� ��ʼ��
    this.initialize.apply(this, arguments);
}
//����ԭ�� 
Scene_Base.prototype = Object.create(Stage.prototype);
//���ô�����
Scene_Base.prototype.constructor = Scene_Base;
//��ʼ��
Scene_Base.prototype.initialize = function() {
	//�̳� ��̨ ��ʼ��
    Stage.prototype.initialize.call(this);
    //���־ �ر�
    this._active = false;
    //���� ����Ǻ�
    this._fadeSign = 0;
    //���� �������ʱ��
    this._fadeDuration = 0;
    //���� ���뾫��
    this._fadeSprite = null;
};
//����
Scene_Base.prototype.create = function() {
};
//�ǻ
Scene_Base.prototype.isActive = function() {
	//���� ���־
    return this._active;
};
//��׼����
Scene_Base.prototype.isReady = function() {
	//���� ͼ������� ��׼����
    return ImageManager.isReady();
};
//��ʼ
Scene_Base.prototype.start = function() {
	//���־ ��Ϊ true
    this._active = true;
};
//����
Scene_Base.prototype.update = function() {
	//���µ��뵭��
    this.updateFade();
    //���� �Ӵ���
    this.updateChildren();
    //���������� ������
    AudioManager.checkErrors();
};
//ֹͣ
Scene_Base.prototype.stop = function() {
	//���־ ��Ϊ false
    this._active = false;
};
//��æµ��
Scene_Base.prototype.isBusy = function() {
	//���ص��뵭������ʱ�� ���� 0
    return this._fadeDuration > 0;
};
//����
Scene_Base.prototype.terminate = function() {
};
//���촰�ڲ�
Scene_Base.prototype.createWindowLayer = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    //���� ���ڲ�
    this._windowLayer = new WindowLayer();
    //���ڲ� �ƶ���
    this._windowLayer.move(x, y, width, height);
    //���ڲ� ��� ���Ӵ�
    this.addChild(this._windowLayer);
};
//��Ӵ���(window)
Scene_Base.prototype.addWindow = function(window) {
	//������ӵ� ���ڲ�
    this._windowLayer.addChild(window);
};
//��ʼ����(����ʱ��,��ɫ)
Scene_Base.prototype.startFadeIn = function(duration, white) {
	//���쵭�뾫��(��ɫ)
    this.createFadeSprite(white);
    //�����־ = 1
    this._fadeSign = 1;
    //�������ʱ�� = ����ʱ�� �� 30
    this._fadeDuration = duration || 30;
    //���뾫�� ��͸���� = 255
    this._fadeSprite.opacity = 255;
};
//��ʼ����(����ʱ��,��ɫ)
Scene_Base.prototype.startFadeOut = function(duration, white) {
	//���쵭�뾫��(��ɫ)
    this.createFadeSprite(white);
    //�����־ = -1
    this._fadeSign = -1;
    //�������ʱ�� = ����ʱ�� �� 30
    this._fadeDuration = duration || 30;
    //���뾫�� ��͸���� = 0
    this._fadeSprite.opacity = 0;
};
//���쵭�뾫��(��ɫ)
Scene_Base.prototype.createFadeSprite = function(white) {
	//��� ���� ���뾫��
    if (!this._fadeSprite) {
	    //���� ���뾫�� Ϊһ�����澫�� 
        this._fadeSprite = new ScreenSprite();
        //���뾫�� ���
        this.addChild(this._fadeSprite);
    }
    //��� ��ɫ ����
    if (white) {
	    //���뾫�� ���ð�ɫ
        this._fadeSprite.setWhite();
    } else {
	    //���뾫�� ���ú�ɫ
        this._fadeSprite.setBlack();
    }
};
//���µ���
Scene_Base.prototype.updateFade = function() {
	//��� �������ʱ�� > 0
    if (this._fadeDuration > 0) {
        var d = this._fadeDuration;
        //��� �����־ > 0
        if (this._fadeSign > 0) {
	        //���뾫�� ��͸���� - ��͸���� / ����ʱ��
            this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
        } else {
	        //���뾫�� ��͸���� + ͸���� / ����ʱ��
            this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
        }
        // �������ʱ�� - 1 
        this._fadeDuration--;
    }
};
//���� �Ӵ���
Scene_Base.prototype.updateChildren = function() {
    this.children.forEach(function(child) {
	    //��� �Ӵ� ���� 
        if (child.update) {
	        //�Ӵ� ����
            child.update();
        }
    });
};
//���� (ɾ��)ĩβ ����
Scene_Base.prototype.popScene = function() {
	//���������� ����(ɾ��)ĩβ
    SceneManager.pop();
};
//�����Ϸ����
Scene_Base.prototype.checkGameover = function() {
	//��Ϸ���� ��ȫ��
    if ($gameParty.isAllDead()) {
	    //���������� ת�� ��Ϸ��������
        SceneManager.goto(Scene_Gameover);
    }
};
//���� ����
Scene_Base.prototype.fadeOutAll = function() {
	//ʱ�� = ������������ / 60
    var time = this.slowFadeSpeed() / 60;
    //��Ƶ������ ���� bgm 
    AudioManager.fadeOutBgm(time);
    //��Ƶ������ ���� bgs 
    AudioManager.fadeOutBgs(time);
    //��Ƶ������ ���� me
    AudioManager.fadeOutMe(time);
    //��ʼ���� (������������)
    this.startFadeOut(this.slowFadeSpeed());
};
//�������� 
Scene_Base.prototype.fadeSpeed = function() {
    return 24;
};
//������������
Scene_Base.prototype.slowFadeSpeed = function() {
	//���� �������� * 2
    return this.fadeSpeed() * 2;
};
