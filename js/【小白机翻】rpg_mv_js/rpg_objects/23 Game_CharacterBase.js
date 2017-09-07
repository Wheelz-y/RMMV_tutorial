
//-----------------------------------------------------------------------------
// Game_CharacterBase
// ��Ϸ�������
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.
// ��Ϸ����ĳ�����.����������������ͼ��֮��Ļ�����Ϣ

function Game_CharacterBase() {
    this.initialize.apply(this, arguments);
}

Object.defineProperties(Game_CharacterBase.prototype, {
    x: { 
	//��� x
    get: function() { return this._x; }, configurable: true },
    y: { 
	//��� y
    get: function() { return this._y; }, configurable: true }
});
//��ʼ��
Game_CharacterBase.prototype.initialize = function() {
    this.initMembers();
};
//��ʼ����Ա
Game_CharacterBase.prototype.initMembers = function() {
    this._x = 0;
    this._y = 0;
    this._realX = 0;
    this._realY = 0;
    this._moveSpeed = 4;
    this._moveFrequency = 6;
    this._opacity = 255;
    this._blendMode = 0;
    this._direction = 2;
    this._pattern = 1;
    this._priorityType = 1;
    this._tileId = 0;
    this._characterName = '';
    this._characterIndex = 0;
    this._isObjectCharacter = false;
    this._walkAnime = true;
    this._stepAnime = false;
    this._directionFix = false;
    this._through = false;
    this._transparent = false;
    this._bushDepth = 0;
    this._animationId = 0;
    this._balloonId = 0;
    this._animationPlaying = false;
    this._balloonPlaying = false;
    this._animationCount = 0;
    this._stopCount = 0;
    this._jumpCount = 0;
    this._jumpPeak = 0;
    this._movementSuccess = true;
};
//λ��
Game_CharacterBase.prototype.pos = function(x, y) {
    return this._x === x && this._y === y;
};
//λ�� �޴�Խ
Game_CharacterBase.prototype.posNt = function(x, y) {
    // No through
    return this.pos(x, y) && !this.isThrough();
};
//�ƶ��ٶ�
Game_CharacterBase.prototype.moveSpeed = function() {
    return this._moveSpeed;
};
//�����ƶ��ٶ�
Game_CharacterBase.prototype.setMoveSpeed = function(moveSpeed) {
    this._moveSpeed = moveSpeed;
};
//�ƶ�Ƶ��
Game_CharacterBase.prototype.moveFrequency = function() {
    return this._moveFrequency;
};
//�����ƶ�Ƶ��
Game_CharacterBase.prototype.setMoveFrequency = function(moveFrequency) {
    this._moveFrequency = moveFrequency;
};
//��͸��
Game_CharacterBase.prototype.opacity = function() {
    return this._opacity;
};
//���ò�͸��
Game_CharacterBase.prototype.setOpacity = function(opacity) {
    this._opacity = opacity;
};
//���ģʽ
Game_CharacterBase.prototype.blendMode = function() {
    return this._blendMode;
};
//���û��ģʽ
Game_CharacterBase.prototype.setBlendMode = function(blendMode) {
    this._blendMode = blendMode;
};
//���������ȼ�
Game_CharacterBase.prototype.isNormalPriority = function() {
    return this._priorityType === 1;
};
//�������ȼ�
Game_CharacterBase.prototype.setPriorityType = function(priorityType) {
    this._priorityType = priorityType;
};
//���ƶ�
Game_CharacterBase.prototype.isMoving = function() {
    return this._realX !== this._x || this._realY !== this._y;
};
//����Ծ
Game_CharacterBase.prototype.isJumping = function() {
    return this._jumpCount > 0;
};
//��Ծ��
Game_CharacterBase.prototype.jumpHeight = function() {
    return (this._jumpPeak * this._jumpPeak -
            Math.pow(Math.abs(this._jumpCount - this._jumpPeak), 2)) / 2;
};
//��ֹͣ
Game_CharacterBase.prototype.isStopping = function() {
    return !this.isMoving() && !this.isJumping();
};
//���ֹͣ
Game_CharacterBase.prototype.checkStop = function(threshold) {
    return this._stopCount > threshold;
};
//����ֹͣ����
Game_CharacterBase.prototype.resetStopCount = function() {
    this._stopCount = 0;
};
//��ʵ�ƶ��ٶ�
Game_CharacterBase.prototype.realMoveSpeed = function() {
    return this._moveSpeed + (this.isDashing() ? 1 : 0);
};
//���� ���� ֡
Game_CharacterBase.prototype.distancePerFrame = function() {
    return Math.pow(2, this.realMoveSpeed()) / 256;
};
//���ͳ���
Game_CharacterBase.prototype.isDashing = function() {
    return false;
};
//�ǳ���Խ
Game_CharacterBase.prototype.isDebugThrough = function() {
    return false;
};
//����
Game_CharacterBase.prototype.straighten = function() {
    if (this.hasWalkAnime() || this.hasStepAnime()) {
        this._pattern = 1;
    }
    this._animationCount = 0;
};
//�෴����
Game_CharacterBase.prototype.reverseDir = function(d) {
    return 10 - d;
};
///��ͨ��
Game_CharacterBase.prototype.canPass = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (!$gameMap.isValid(x2, y2)) {
        return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (!this.isMapPassable(x, y, d)) {
        return false;
    }
    if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
    }
    return true;
};
//��ͨ���Խ�
Game_CharacterBase.prototype.canPassDiagonally = function(x, y, horz, vert) {
    var x2 = $gameMap.roundXWithDirection(x, horz);
    var y2 = $gameMap.roundYWithDirection(y, vert);
    if (this.canPass(x, y, vert) && this.canPass(x, y2, horz)) {
        return true;
    }
    if (this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
        return true;
    }
    return false;
};
//�ǵ�ͼ��ͨ��
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    var d2 = this.reverseDir(d);
    return $gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2);
};
//�Ǻ�������ײ
Game_CharacterBase.prototype.isCollidedWithCharacters = function(x, y) {
    return this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y);
};
//�Ǻ��¼���ײ
Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
    var events = $gameMap.eventsXyNt(x, y);
    return events.some(function(event) {
        return event.isNormalPriority();
    });
};
//�Ǻͽ�ͨ������ײ
Game_CharacterBase.prototype.isCollidedWithVehicles = function(x, y) {
    return $gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y);
};
//����λ��
Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.round(x);
    this._y = Math.round(y);
    this._realX = x;
    this._realY = y;
};
//����λ��
Game_CharacterBase.prototype.copyPosition = function(character) {
    this._x = character._x;
    this._y = character._y;
    this._realX = character._realX;
    this._realY = character._realY;
    this._direction = character._direction;
};
//����
Game_CharacterBase.prototype.locate = function(x, y) {
    this.setPosition(x, y);
    this.straighten();
    this.refreshBushDepth();
};
//����
Game_CharacterBase.prototype.direction = function() {
    return this._direction;
};
//���÷���
Game_CharacterBase.prototype.setDirection = function(d) {
    if (!this.isDirectionFixed() && d) {
        this._direction = d;
    }
    this.resetStopCount();
};
//��ͼ��
Game_CharacterBase.prototype.isTile = function() {
    return this._tileId > 0 && this._priorityType === 0;
};
//�Ƕ�������
Game_CharacterBase.prototype.isObjectCharacter = function() {
    return this._isObjectCharacter;
};
//ת��y
Game_CharacterBase.prototype.shiftY = function() {
    return this.isObjectCharacter() ? 0 : 6;
};
//����x
Game_CharacterBase.prototype.scrolledX = function() {
    return $gameMap.adjustX(this._realX);
};
//����y
Game_CharacterBase.prototype.scrolledY = function() {
    return $gameMap.adjustY(this._realY);
};
//����x
Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw + tw / 2);
};
//����y
Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th + th -
                      this.shiftY() - this.jumpHeight());
};
//����z
Game_CharacterBase.prototype.screenZ = function() {
    return this._priorityType * 2 + 1;
};
//�ǻ��渽��
Game_CharacterBase.prototype.isNearTheScreen = function() {
    var gw = Graphics.width;
    var gh = Graphics.height;
    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();
    var px = this.scrolledX() * tw + tw / 2 - gw / 2;
    var py = this.scrolledY() * th + th / 2 - gh / 2;
    return px >= -gw && px <= gw && py >= -gh && py <= gh;
};
//����
Game_CharacterBase.prototype.update = function() {
    if (this.isStopping()) {
        this.updateStop();
    }
    if (this.isJumping()) {
        this.updateJump();
    } else if (this.isMoving()) {
        this.updateMove();
    }
    this.updateAnimation();
};
//����ֹͣ
Game_CharacterBase.prototype.updateStop = function() {
    this._stopCount++;
};
//������Ծ
Game_CharacterBase.prototype.updateJump = function() {
    this._jumpCount--;
    this._realX = (this._realX * this._jumpCount + this._x) / (this._jumpCount + 1.0);
    this._realY = (this._realY * this._jumpCount + this._y) / (this._jumpCount + 1.0);
    this.refreshBushDepth();
    if (this._jumpCount === 0) {
        this._realX = this._x = $gameMap.roundX(this._x);
        this._realY = this._y = $gameMap.roundY(this._y);
    }
};
//�����ƶ�
Game_CharacterBase.prototype.updateMove = function() {
    if (this._x < this._realX) {
        this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
    }
    if (this._x > this._realX) {
        this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
    }
    if (this._y < this._realY) {
        this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
    }
    if (this._y > this._realY) {
        this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
    }
    if (!this.isMoving()) {
        this.refreshBushDepth();
    }
};
//���¶���
Game_CharacterBase.prototype.updateAnimation = function() {
    this.updateAnimationCount();
    if (this._animationCount >= this.animationWait()) {
        this.updatePattern();
        this._animationCount = 0;
    }
};
//�����ȴ�
Game_CharacterBase.prototype.animationWait = function() {
    return (9 - this.realMoveSpeed()) * 3;
};
//���¶�������
Game_CharacterBase.prototype.updateAnimationCount = function() {
    if (this.isMoving() && this.hasWalkAnime()) {
        this._animationCount += 1.5;
    } else if (this.hasStepAnime() || !this.isOriginalPattern()) {
        this._animationCount++;
    }
};
//����ͼ��
Game_CharacterBase.prototype.updatePattern = function() {
    if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else {
        this._pattern = (this._pattern + 1) % this.maxPattern();
    }
};
//���ͼ��
Game_CharacterBase.prototype.maxPattern = function() {
    return 4;
};
//ͼ��
Game_CharacterBase.prototype.pattern = function() {
    return this._pattern < 3 ? this._pattern : 1;
};
//����ͼ��
Game_CharacterBase.prototype.setPattern = function(pattern) {
    this._pattern = pattern;
};
//�����ͼ��
Game_CharacterBase.prototype.isOriginalPattern = function() {
    return this.pattern() === 1;
};
//����ͼ��
Game_CharacterBase.prototype.resetPattern = function() {
    this.setPattern(1);
};
//ˢ�¹�ľ�����
Game_CharacterBase.prototype.refreshBushDepth = function() {
    if (this.isNormalPriority() && !this.isObjectCharacter() &&
            this.isOnBush() && !this.isJumping()) {
        if (!this.isMoving()) {
            this._bushDepth = 12;
        }
    } else {
        this._bushDepth = 0;
    }
};
//��������
Game_CharacterBase.prototype.isOnLadder = function() {
    return $gameMap.isLadder(this._x, this._y);
};
//���ڹ�ľ��
Game_CharacterBase.prototype.isOnBush = function() {
    return $gameMap.isBush(this._x, this._y);
};
//�����ǩ
Game_CharacterBase.prototype.terrainTag = function() {
    return $gameMap.terrainTag(this._x, this._y);
};
//����id
Game_CharacterBase.prototype.regionId = function() {
    return $gameMap.regionId(this._x, this._y);
};
//���Ӳ���
Game_CharacterBase.prototype.increaseSteps = function() {
    if (this.isOnLadder()) {
        this.setDirection(8);
    }
    this.resetStopCount();
    this.refreshBushDepth();
};
//ͼ��id
Game_CharacterBase.prototype.tileId = function() {
    return this._tileId;
};
//��������
Game_CharacterBase.prototype.characterName = function() {
    return this._characterName;
};
//��������
Game_CharacterBase.prototype.characterIndex = function() {
    return this._characterIndex;
};
//����ͼ��
Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
    this._tileId = 0;
    this._characterName = characterName;
    this._characterIndex = characterIndex;
    this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);
};
//����ͼ��ͼ��
Game_CharacterBase.prototype.setTileImage = function(tileId) {
    this._tileId = tileId;
    this._characterName = '';
    this._characterIndex = 0;
    this._isObjectCharacter = true;
};
//��������¼���������
Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
    var x2 = $gameMap.roundXWithDirection(this._x, d);
    var y2 = $gameMap.roundYWithDirection(this._y, d);
    this.checkEventTriggerTouch(x2, y2);
};
//����¼���������
Game_CharacterBase.prototype.checkEventTriggerTouch = function(x, y) {
    return false;
};
//���ƶ��ɹ�?
Game_CharacterBase.prototype.isMovementSucceeded = function(x, y) {
    return this._movementSuccess;
};
//�����ƶ� �ɹ�?
Game_CharacterBase.prototype.setMovementSuccess = function(success) {
    this._movementSuccess = success;
};
//�ƶ�ֱ��
Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
        this.setDirection(d);
        this._x = $gameMap.roundXWithDirection(this._x, d);
        this._y = $gameMap.roundYWithDirection(this._y, d);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
        this.increaseSteps();
    } else {
        this.setDirection(d);
        this.checkEventTriggerTouchFront(d);
    }
};
//�ƶ��Խ�
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));
    if (this.isMovementSucceeded()) {
        this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
    }
    if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
    }
};
//��Ծ
Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    if (Math.abs(xPlus) > Math.abs(yPlus)) {
        if (xPlus !== 0) {
            this.setDirection(xPlus < 0 ? 4 : 6);
        }
    } else {
        if (yPlus !== 0) {
            this.setDirection(yPlus < 0 ? 8 : 2);
        }
    }
    this._x += xPlus;
    this._y += yPlus;
    var distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
    this._jumpPeak = 10 + distance - this._moveSpeed;
    this._jumpCount = this._jumpPeak * 2;
    this.resetStopCount();
    this.straighten();
};
//�����߶���
Game_CharacterBase.prototype.hasWalkAnime = function() {
    return this._walkAnime;
};
//�������߶���
Game_CharacterBase.prototype.setWalkAnime = function(walkAnime) {
    this._walkAnime = walkAnime;
};
//��̤������
Game_CharacterBase.prototype.hasStepAnime = function() {
    return this._stepAnime;
};
//����̤������
Game_CharacterBase.prototype.setStepAnime = function(stepAnime) {
    this._stepAnime = stepAnime;
};
//�Ƿ���̶�
Game_CharacterBase.prototype.isDirectionFixed = function() {
    return this._directionFix;
};
//���÷���̶�
Game_CharacterBase.prototype.setDirectionFix = function(directionFix) {
    this._directionFix = directionFix;
};
//�Ǵ�Խ
Game_CharacterBase.prototype.isThrough = function() {
    return this._through;
};
//���ô�Խ
Game_CharacterBase.prototype.setThrough = function(through) {
    this._through = through;
};
//��͸��
Game_CharacterBase.prototype.isTransparent = function() {
    return this._transparent;
};
//��ľ�����
Game_CharacterBase.prototype.bushDepth = function() {
    return this._bushDepth;
};
//����͸��
Game_CharacterBase.prototype.setTransparent = function(transparent) {
    this._transparent = transparent;
};
//���󶯻�
Game_CharacterBase.prototype.requestAnimation = function(animationId) {
    this._animationId = animationId;
};
//��������
Game_CharacterBase.prototype.requestBalloon = function(balloonId) {
    this._balloonId = balloonId;
};
//����id
Game_CharacterBase.prototype.animationId = function() {
    return this._animationId;
};
//����id
Game_CharacterBase.prototype.balloonId = function() {
    return this._balloonId;
};
//��ʼ����
Game_CharacterBase.prototype.startAnimation = function() {
    this._animationId = 0;
    this._animationPlaying = true;
};
//��ʼ����
Game_CharacterBase.prototype.startBalloon = function() {
    this._balloonId = 0;
    this._balloonPlaying = true;
};
//�Ƕ�������
Game_CharacterBase.prototype.isAnimationPlaying = function() {
    return this._animationId > 0 || this._animationPlaying;
};
//�����򲥷�
Game_CharacterBase.prototype.isBalloonPlaying = function() {
    return this._balloonId > 0 || this._balloonPlaying;
};
//��������
Game_CharacterBase.prototype.endAnimation = function() {
    this._animationPlaying = false;
};
//��������
Game_CharacterBase.prototype.endBalloon = function() {
    this._balloonPlaying = false;
};
