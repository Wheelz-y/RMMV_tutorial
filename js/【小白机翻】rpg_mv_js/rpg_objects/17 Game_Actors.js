
//-----------------------------------------------------------------------------
// Game_Actors
// ��Ϸ��ɫ��         $gameActors
// The wrapper class for an actor array.
// ��ɫ����İ�װ��

function Game_Actors() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Actors.prototype.initialize = function() {
    this._data = [];
};
//��ɫ
Game_Actors.prototype.actor = function(actorId) {
    if ($dataActors[actorId]) {
        if (!this._data[actorId]) {
            this._data[actorId] = new Game_Actor(actorId);
        }
        return this._data[actorId];
    }
    return null;
};
