
//-----------------------------------------------------------------------------
// Game_Followers
// ��Ϸ������
// The wrapper class for a follower array.
// ��װ��Ϊ�˴�������

function Game_Followers() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Followers.prototype.initialize = function() {
    this._visible = $dataSystem.optFollowers;
    this._gathering = false;
    this._data = [];
    for (var i = 1; i < $gameParty.maxBattleMembers(); i++) {
        this._data.push(new Game_Follower(i));
    }
};
//����ʾ
Game_Followers.prototype.isVisible = function() {
    return this._visible;
};
//��ʾ
Game_Followers.prototype.show = function() {
    this._visible = true;
};
//����
Game_Followers.prototype.hide = function() {
    this._visible = false;
};
//����
Game_Followers.prototype.follower = function(index) {
    return this._data[index];
};
//��ÿһ��
Game_Followers.prototype.forEach = function(callback, thisObject) {
    this._data.forEach(callback, thisObject);
};
//��תÿһ��
Game_Followers.prototype.reverseEach = function(callback, thisObject) {
    this._data.reverse();
    this._data.forEach(callback, thisObject);
    this._data.reverse();
};
//ˢ��
Game_Followers.prototype.refresh = function() {
    this.forEach(function(follower) {
        return follower.refresh();
    }, this);
};
///����
Game_Followers.prototype.update = function() {
    if (this.areGathering()) {
        if (!this.areMoving()) {
            this.updateMove();
        }
        if (this.areGathered()) {
            this._gathering = false;
        }
    }
    this.forEach(function(follower) {
        follower.update();
    }, this);
};
//�����ƶ�
Game_Followers.prototype.updateMove = function() {
    for (var i = this._data.length - 1; i >= 0; i--) {
        var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
        this._data[i].chaseCharacter(precedingCharacter);
    }
};
//��Ծȫ��
Game_Followers.prototype.jumpAll = function() {
    if ($gamePlayer.isJumping()) {
        for (var i = 0; i < this._data.length; i++) {
            var follower = this._data[i];
            var sx = $gamePlayer.deltaXFrom(follower.x);
            var sy = $gamePlayer.deltaYFrom(follower.y);
            follower.jump(sx, sy);
        }
    }
};
//ͬ��
Game_Followers.prototype.synchronize = function(x, y, d) {
    this.forEach(function(follower) {
        follower.locate(x, y);
        follower.setDirection(d);
    }, this);
};
//����
Game_Followers.prototype.gather = function() {
    this._gathering = true;
};
//�Ǽ���
Game_Followers.prototype.areGathering = function() {
    return this._gathering;
};
//��ʾ����
Game_Followers.prototype.visibleFollowers = function() {
    return this._data.filter(function(follower) {
        return follower.isVisible();
    }, this);
};
//���ƶ���
Game_Followers.prototype.areMoving = function() {
    return this.visibleFollowers().some(function(follower) {
        return follower.isMoving();
    }, this);
};
//�Ǽ��Ϻ�
Game_Followers.prototype.areGathered = function() {
    return this.visibleFollowers().every(function(follower) {
        return !follower.isMoving() && follower.pos($gamePlayer.x, $gamePlayer.y);
    }, this);
};
//��������ײ
Game_Followers.prototype.isSomeoneCollided = function(x, y) {
    return this.visibleFollowers().some(function(follower) {
        return follower.pos(x, y);
    }, this);
};
