
//-----------------------------------------------------------------------------
// Scene_Gameover
// ��Ϸ��������
// The scene class of the game over screen.
// ���� ��Ϸ�������� �� ������

function Scene_Gameover() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Scene_Gameover.prototype = Object.create(Scene_Base.prototype);
//���ô�����
Scene_Gameover.prototype.constructor = Scene_Gameover;
//��ʼ��
Scene_Gameover.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};
//����
Scene_Gameover.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.playGameoverMusic();
    this.createBackground();
};
//��ʼ
Scene_Gameover.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.slowFadeSpeed(), false);
};
//����
Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        this.gotoTitle();
    }
    Scene_Base.prototype.update.call(this);
};
//ֹͣ
Scene_Gameover.prototype.stop = function() {
    Scene_Base.prototype.stop.call(this);
    this.fadeOutAll();
};
//��ֹ
Scene_Gameover.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    AudioManager.stopAll();
};
//������Ϸ��������
Scene_Gameover.prototype.playGameoverMusic = function() {
    AudioManager.stopBgm();
    AudioManager.stopBgs();
    AudioManager.playMe($dataSystem.gameoverMe);
};
//��������
Scene_Gameover.prototype.createBackground = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadSystem('GameOver');
    this.addChild(this._backSprite);
};
//�Ǵ�����
Scene_Gameover.prototype.isTriggered = function() {
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};
//ת�����ⳡ��
Scene_Gameover.prototype.gotoTitle = function() {
    SceneManager.goto(Scene_Title);
};
