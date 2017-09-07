
//-----------------------------------------------------------------------------
// Spriteset_Map
// ��ͼ������
// The set of sprites on the map screen.
// �ڵ�ͼ���� �� ���� ��

function Spriteset_Map() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Spriteset_Map.prototype = Object.create(Spriteset_Base.prototype);
//���ô�����
Spriteset_Map.prototype.constructor = Spriteset_Map;
//��ʼ��
Spriteset_Map.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
//�������µĲ�
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createParallax();
    this.createTilemap();
    this.createCharacters();
    this.createShadow();
    this.createDestination();
    this.createWeather();
};
//-----------------------------------------------------------------------------
//����
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateTileset();
    this.updateParallax();
    this.updateTilemap();
    this.updateShadow();
    this.updateWeather();
};
//-----------------------------------------------------------------------------
//��������
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.hideCharacters = function() {
    for (var i = 0; i < this._characterSprites.length; i++) {
        var sprite = this._characterSprites[i];
        if (!sprite.isTile()) {
            sprite.hide();
        }
    }
};
//-----------------------------------------------------------------------------
//����Զ��ͼ
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createParallax = function() {
    this._parallax = new TilingSprite();
    this._parallax.move(0, 0, Graphics.width, Graphics.height);
    this._baseSprite.addChild(this._parallax);
};
//-----------------------------------------------------------------------------
//����ͼ���ͼ
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createTilemap = function() {
    this._tilemap = new Tilemap();
    this._tilemap.tileWidth = $gameMap.tileWidth();
    this._tilemap.tileHeight = $gameMap.tileHeight();
    this._tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
    this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
    this._tilemap.verticalWrap = $gameMap.isLoopVertical();
    this.loadTileset();
    this._baseSprite.addChild(this._tilemap);
};
//-----------------------------------------------------------------------------
//��ȡͼ����
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.loadTileset = function() {
    this._tileset = $gameMap.tileset();
    if (this._tileset) {
	    //��ȡͼ��������
        var tilesetNames = this._tileset.tilesetNames;
        for (var i = 0; i < tilesetNames.length; i++) {
	        //ͼ���ͼ λͼ[i]��ȡ��Ӧͼ��
            this._tilemap.bitmaps[i] = ImageManager.loadTileset(tilesetNames[i]);
        }
        //��ȡͼ���ͼ��־��
        this._tilemap.flags = $gameMap.tilesetFlags();
        this._tilemap.refresh();
    }
};
//-----------------------------------------------------------------------------
//��������
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createCharacters = function() {
	//���ﾫ������
    this._characterSprites = [];

    //����¼� �� ���ﾫ��
    $gameMap.events().forEach(function(event) {
        this._characterSprites.push(new Sprite_Character(event));
    }, this);
    //��ӽ�ͨ���� �� ���ﾫ��
    $gameMap.vehicles().forEach(function(vehicle) {
        this._characterSprites.push(new Sprite_Character(vehicle));
    }, this);
    //��Ӵ��� �� ���ﾫ��
    $gamePlayer.followers().reverseEach(function(follower) {
        this._characterSprites.push(new Sprite_Character(follower));
    }, this);
    //�����Ϸ�� �� ���ﾫ��
    this._characterSprites.push(new Sprite_Character($gamePlayer));

    //ѭ�����ﾫ��
    for (var i = 0; i < this._characterSprites.length; i++) {
        this._tilemap.addChild(this._characterSprites[i]);
    }
};
//-----------------------------------------------------------------------------
//������Ӱ
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createShadow = function() {
    this._shadowSprite = new Sprite();
    this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow1');
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 1;
    this._shadowSprite.z = 6;
    this._tilemap.addChild(this._shadowSprite);
};
//-----------------------------------------------------------------------------
//����Ŀ�ĵ�
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createDestination = function() {
    this._destinationSprite = new Sprite_Destination();
    this._destinationSprite.z = 9;
    this._tilemap.addChild(this._destinationSprite);
};
//-----------------------------------------------------------------------------
//��������
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.createWeather = function() {
    this._weather = new Weather();
    this.addChild(this._weather);
};
//-----------------------------------------------------------------------------
//����ͼ����
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateTileset = function() {
    if (this._tileset !== $gameMap.tileset()) {
        this.loadTileset();
    }
};
//-----------------------------------------------------------------------------
//����Զ��ͼ
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateParallax = function() {
    if (this._parallaxName !== $gameMap.parallaxName()) {
        this._parallaxName = $gameMap.parallaxName();
        this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
    }
    if (this._parallax.bitmap) {
        this._parallax.origin.x = $gameMap.parallaxOx();
        this._parallax.origin.y = $gameMap.parallaxOy();
    }
};
//-----------------------------------------------------------------------------
//����ͼ���ͼ
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateTilemap = function() {
    this._tilemap.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    this._tilemap.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
};
//-----------------------------------------------------------------------------
//������Ӱ
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateShadow = function() {
    var airship = $gameMap.airship();
    this._shadowSprite.x = airship.shadowX();
    this._shadowSprite.y = airship.shadowY();
    this._shadowSprite.opacity = airship.shadowOpacity();
};
//-----------------------------------------------------------------------------
//��������
//-----------------------------------------------------------------------------
Spriteset_Map.prototype.updateWeather = function() {
    this._weather.type = $gameScreen.weatherType();
    this._weather.power = $gameScreen.weatherPower();
    this._weather.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    this._weather.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
};
