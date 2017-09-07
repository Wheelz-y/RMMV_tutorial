
//-----------------------------------------------------------------------------
// Game_Player
// ��Ϸ��Ϸ��     $gamePlayer
// The game object class for the player. It contains event starting
// determinants and map scrolling functions.
// ��Ϸ�ߵ���Ϸ������.�����¼���ʼ�ж��͵�ͼ��������

function Game_Player() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Game_Player.prototype = Object.create(Game_Character.prototype);
//���ô�����
Game_Player.prototype.constructor = Game_Player;
//��ʼ��
Game_Player.prototype.initialize = function() {
	//�̳� ��Ϸ��ɫ ��ʼ��
    Game_Character.prototype.initialize.call(this);
    //����͸��(����ϵͳ ��ʼ͸��)
    this.setTransparent($dataSystem.optTransparent);
};
//��ʼ����Ա
Game_Player.prototype.initMembers = function() {
	//�̳� ��Ϸ��ɫ ��ʼ����Ա
    Game_Character.prototype.initMembers.call(this);
    //��ͨ�������� = "walk" //����
    this._vehicleType = 'walk';
    //��ͨ��������
    this._vehicleGettingOn = false;
    //��ͨ��������
    this._vehicleGettingOff = false;
    //�ͳ��� = false
    this._dashing = false;
    //��Ҫ��ͼ�������� = false
    this._needsMapReload = false;
    //������ = false
    this._transferring = false;
    //�µ�ͼid = 0
    this._newMapId = 0;
    //��x = 0
    this._newX = 0;
    //��y = 0
    this._newY = 0;
    //�·��� = 0
    this._newDirection = 0;
    //�������� = 0
    this._fadeType = 0;
    //������  = �� ��Ϸ������
    this._followers = new Game_Followers();
    //�������� = 0
    this._encounterCount = 0;
};
//���������Ϣ
Game_Player.prototype.clearTransferInfo = function() {
    //������ = false
    this._transferring = false;
    //�µ�ͼid = 0
    this._newMapId = 0;
    //��x = 0
    this._newX = 0;
    //��y = 0
    this._newY = 0;
    //�·��� = 0
    this._newDirection = 0;
};
//������
Game_Player.prototype.followers = function() {
    //���� ������
    return this._followers;
};
//ˢ��
Game_Player.prototype.refresh = function() {
	//��ɫ = ��Ϸ���� �쵼��
    var actor = $gameParty.leader();
    //����ͼ���� = ��ɫ ��� ���� ���� ��ɫ ����ͼ���� ���� ����  ""
    var characterName = actor ? actor.characterName() : '';
    //����ͼ���� = ��ɫ ��� ���� ���� ��ɫ ����ͼ���� ���� ����  ""
    var characterIndex = actor ? actor.characterIndex() : 0;
    //����ͼ��(����ͼ����,����ͼ����)
    this.setImage(characterName, characterIndex);
    //����� ˢ��
    this._followers.refresh();
};
//��ֹͣ
Game_Player.prototype.isStopping = function() {
	//��� ��ͨ�������� ���� ��ͨ��������
    if (this._vehicleGettingOn || this._vehicleGettingOff) {
	    //���� false 
        return false;
    }
    //���� �̳� ��Ϸ��ɫ ��ֹͣ
    return Game_Character.prototype.isStopping.call(this);
};
//���洫��
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
	//������ = true
    this._transferring = true;
    //�µ�ͼid = mapId
    this._newMapId = mapId;
    //��x = x
    this._newX = x;
    //��y = y
    this._newY = y;
    //�·��� = d
    this._newDirection = d;
    //�������� = fadeType
    this._fadeType = fadeType;
};
//�����ͼ��װ
Game_Player.prototype.requestMapReload = function() {
	//��Ҫ��ͼ��װ = true
    this._needsMapReload = true;
};
//�Ǵ�����
Game_Player.prototype.isTransferring = function() {
	//���� ������
    return this._transferring;
};
//�µ�ͼid
Game_Player.prototype.newMapId = function() {
	//���� �µ�ͼid
    return this._newMapId;
};
//��������
Game_Player.prototype.fadeType = function() {
	//���� ��������
    return this._fadeType;
};
//���ִ���
Game_Player.prototype.performTransfer = function() {
	//��� �Ǵ�����
    if (this.isTransferring()) {
	    //���÷���(�·���)
        this.setDirection(this._newDirection);
        //���( �µ�ͼid !== ��Ϸ��ͼ ��ͼid) ����  (��Ҫ��ͼ��װ )
        if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
	        //��Ϸ��ͼ ��װ (�µ�ͼid)
            $gameMap.setup(this._newMapId);
            //��Ҫ��ͼ��װ = false
            this._needsMapReload = false;
        }
        //λ�� (��x,��y)
        this.locate(this._newX, this._newY);
        //ˢ��
        this.refresh();
        //���������Ϣ
        this.clearTransferInfo();
    }
};
//�ǵ�ͼ��ͨ��
Game_Player.prototype.isMapPassable = function(x, y, d) {
	//��ͨ���� 
    var vehicle = this.vehicle();
    //��� ��ͨ����
    if (vehicle) {
	    //���� ��ͨ���� �ǵ�ͼ��ͨ��(x,y,d)
        return vehicle.isMapPassable(x, y, d);
    } else {
	    //���� �̳� ��Ϸ��ɫ �ǵ�ͼ��ͨ��
        return Game_Character.prototype.isMapPassable.call(this, x, y, d);
    }
};
//��ͨ����
Game_Player.prototype.vehicle = function() {
	//���� ��Ϸ��ͼ ��ͨ����[��ͨ��������]
    return $gameMap.vehicle(this._vehicleType);
};
//����С��
Game_Player.prototype.isInBoat = function() {
	//���� ��ͨ�������� === 'boat'  //С��
    return this._vehicleType === 'boat';
};
//���ڷ���
Game_Player.prototype.isInShip = function() {
	//���� ��ͨ�������� === 'ship'  //����
    return this._vehicleType === 'ship';
};
//������մ�
Game_Player.prototype.isInAirship = function() {
	//���� ��ͨ�������� === 'airship' //��մ�
    return this._vehicleType === 'airship';
};
//���ڽ�ͨ����
Game_Player.prototype.isInVehicle = function() {
	//���� ���ڷ��� ���� ���ڷ��� ���� ������մ�
    return this.isInBoat() || this.isInShip() || this.isInAirship();
};
//����ͨ
Game_Player.prototype.isNormal = function() {
	//���� ��ͨ�������� === 'walk'  ����  ���� ��ǿ���ƶ�·��
    return this._vehicleType === 'walk' && !this.isMoveRouteForcing();
};
//���ͳ���
Game_Player.prototype.isDashing = function() {
	//���� �ͳ���
    return this._dashing;
};
//�ǳ���ͨ��
Game_Player.prototype.isDebugThrough = function() {
	//���� ���� 
    return Input.isPressed('control') && $gameTemp.isPlaytest();
};
//����ײ
Game_Player.prototype.isCollided = function(x, y) {
    if (this.isThrough()) {
        return false;
    } else {
        return this.pos(x, y) || this._followers.isSomeoneCollided(x, y);
    }
};
//����x
Game_Player.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
};
//����y
Game_Player.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
};
//����
Game_Player.prototype.center = function(x, y) {
    return $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
};
//����
Game_Player.prototype.locate = function(x, y) {
    Game_Character.prototype.locate.call(this, x, y);
    this.center(x, y);
    this.makeEncounterCount();
    if (this.isInVehicle()) {
        this.vehicle().refresh();
    }
    this._followers.synchronize(x, y, this.direction());
};
//���Ӳ���
Game_Player.prototype.increaseSteps = function() {
    Game_Character.prototype.increaseSteps.call(this);
    if (this.isNormal()) {
        $gameParty.increaseSteps();
    }
};
//������������
Game_Player.prototype.makeEncounterCount = function() {
    var n = $gameMap.encounterStep();
    this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
};
//����������Ⱥid
Game_Player.prototype.makeEncounterTroopId = function() {
    var encounterList = [];
    var weightSum = 0;
    $gameMap.encounterList().forEach(function(encounter) {
        if (this.meetsEncounterConditions(encounter)) {
            encounterList.push(encounter);
            weightSum += encounter.weight;
        }
    }, this);
    if (weightSum > 0) {
        var value = Math.randomInt(weightSum);
        for (var i = 0; i < encounterList.length; i++) {
            value -= encounterList[i].weight;
            if (value < 0) {
                return encounterList[i].troopId;
            }
        }
    }
    return 0;
};
//��������
Game_Player.prototype.meetsEncounterConditions = function(encounter) {
    return (encounter.regionSet.length === 0 ||
            encounter.regionSet.contains(this.regionId()));
};
//ִ������
Game_Player.prototype.executeEncounter = function() {
    if (!$gameMap.isEventRunning() && this._encounterCount <= 0) {
        this.makeEncounterCount();
        var troopId = this.makeEncounterTroopId();
        if ($dataTroops[troopId]) {
            BattleManager.setup(troopId, true, false);
            BattleManager.onEncounter();
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
//��ʼ��ͼ�¼�
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
    if (!$gameMap.isEventRunning()) {
        $gameMap.eventsXy(x, y).forEach(function(event) {
            if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                event.start();
            }
        });
    }
};
//�ƶ�ͨ������ 
Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        var direction = this.getInputDirection();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if ($gameTemp.isDestinationValid()){
            var x = $gameTemp.destinationX();
            var y = $gameTemp.destinationY();
            direction = this.findDirectionTo(x, y);
        }
        if (direction > 0) {
            this.executeMove(direction);
        }
    }
};
//���ƶ�
Game_Player.prototype.canMove = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
        return false;
    }
    if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
        return false;
    }
    if (this._vehicleGettingOn || this._vehicleGettingOff) {
        return false;
    }
    if (this.isInVehicle() && !this.vehicle().canMove()) {
        return false;
    }
    return true;
};
//������뷽��
Game_Player.prototype.getInputDirection = function() {
    return Input.dir4;
};
//ִ���ƶ�
Game_Player.prototype.executeMove = function(direction) {
    this.moveStraight(direction);
};
//����
Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var wasMoving = this.isMoving();
    this.updateDashing();
    if (sceneActive) {
        this.moveByInput();
    }
    Game_Character.prototype.update.call(this);
    this.updateScroll(lastScrolledX, lastScrolledY);
    this.updateVehicle();
    if (!this.isMoving()) {
        this.updateNonmoving(wasMoving);
    }
    this._followers.update();
};
//�����ͳ���
Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
        return;
    }
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
        this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
    } else {
        this._dashing = false;
    }
};
//���ͳ尴������
Game_Player.prototype.isDashButtonPressed = function() {
    var shift = Input.isPressed('shift');
    if (ConfigManager.alwaysDash) {
        return !shift;
    } else {
        return shift;
    }
};
//���¹���
Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    var x1 = lastScrolledX;
    var y1 = lastScrolledY;
    var x2 = this.scrolledX();
    var y2 = this.scrolledY();
    if (y2 > y1 && y2 > this.centerY()) {
        $gameMap.scrollDown(y2 - y1);
    }
    if (x2 < x1 && x2 < this.centerX()) {
        $gameMap.scrollLeft(x1 - x2);
    }
    if (x2 > x1 && x2 > this.centerX()) {
        $gameMap.scrollRight(x2 - x1);
    }
    if (y2 < y1 && y2 < this.centerY()) {
        $gameMap.scrollUp(y1 - y2);
    }
};
//���½�ͨ����
Game_Player.prototype.updateVehicle = function() {
    if (this.isInVehicle() && !this.areFollowersGathering()) {
        if (this._vehicleGettingOn) {
            this.updateVehicleGetOn();
        } else if (this._vehicleGettingOff) {
            this.updateVehicleGetOff();
        } else {
            this.vehicle().syncWithPlayer();
        }
    }
};
//���½�ͨ������
Game_Player.prototype.updateVehicleGetOn = function() {
    if (!this.areFollowersGathering() && !this.isMoving()) {
        this.setDirection(this.vehicle().direction());
        this.setMoveSpeed(this.vehicle().moveSpeed());
        this._vehicleGettingOn = false;
        this.setTransparent(true);
        if (this.isInAirship()) {
            this.setThrough(true);
        }
        this.vehicle().getOn();
    }
};
//���½�ͨ������
Game_Player.prototype.updateVehicleGetOff = function() {
    if (!this.areFollowersGathering() && this.vehicle().isLowest()) {
        this._vehicleGettingOff = false;
        this._vehicleType = 'walk';
        this.setTransparent(false);
    }
};
//���²��ƶ�
Game_Player.prototype.updateNonmoving = function(wasMoving) {
    if (!$gameMap.isEventRunning()) {
        if (wasMoving) {
            $gameParty.onPlayerWalk();
            this.checkEventTriggerHere([1,2]);
            if ($gameMap.setupStartingEvent()) {
                return;
            }
        }
        if (this.triggerAction()) {
            return;
        }
        if (wasMoving) {
            this.updateEncounterCount();
        } else {
            $gameTemp.clearDestination();
        }
    }
};
//��������
Game_Player.prototype.triggerAction = function() {
    if (this.canMove()) {
        if (this.triggerButtonAction()) {
            return true;
        }
        if (this.triggerTouchAction()) {
            return true;
        }
    }
    return false;
};
//������������
Game_Player.prototype.triggerButtonAction = function() {
    if (Input.isTriggered('ok')) {
        if (this.getOnOffVehicle()) {
            return true;
        }
        this.checkEventTriggerHere([0]);
        if ($gameMap.setupStartingEvent()) {
            return true;
        }
        this.checkEventTriggerThere([0,1,2]);
        if ($gameMap.setupStartingEvent()) {
            return true;
        }
    }
    return false;
};
//������������
Game_Player.prototype.triggerTouchAction = function() {
    if ($gameTemp.isDestinationValid()){
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, direction);
        var y2 = $gameMap.roundYWithDirection(y1, direction);
        var x3 = $gameMap.roundXWithDirection(x2, direction);
        var y3 = $gameMap.roundYWithDirection(y2, direction);
        var destX = $gameTemp.destinationX();
        var destY = $gameTemp.destinationY();
        if (destX === x1 && destY === y1) {
            return this.triggerTouchActionD1(x1, y1);
        } else if (destX === x2 && destY === y2) {
            return this.triggerTouchActionD2(x2, y2);
        } else if (destX === x3 && destY === y3) {
            return this.triggerTouchActionD3(x2, y2);
        }
    }
    return false;
};
//������������1
Game_Player.prototype.triggerTouchActionD1 = function(x1, y1) {
    if ($gameMap.airship().pos(x1, y1)) {
        if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
            return true;
        }
    }
    this.checkEventTriggerHere([0]);
    return $gameMap.setupStartingEvent();
};
//������������d2
Game_Player.prototype.triggerTouchActionD2 = function(x2, y2) {
    if ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2)) {
        if (TouchInput.isTriggered() && this.getOnVehicle()) {
            return true;
        }
    }
    if (this.isInBoat() || this.isInShip()) {
        if (TouchInput.isTriggered() && this.getOffVehicle()) {
            return true;
        }
    }
    this.checkEventTriggerThere([0,1,2]);
    return $gameMap.setupStartingEvent();
};
//������������d3
Game_Player.prototype.triggerTouchActionD3 = function(x2, y2) {
    if ($gameMap.isCounter(x2, y2)) {
        this.checkEventTriggerThere([0,1,2]);
    }
    return $gameMap.setupStartingEvent();
};
//������������ 
Game_Player.prototype.updateEncounterCount = function() {
    if (this.canEncounter()) {
        this._encounterCount -= this.encounterProgressValue();
    }
};
//������
Game_Player.prototype.canEncounter = function() {
    return (!$gameParty.hasEncounterNone() && $gameSystem.isEncounterEnabled() &&
            !this.isInAirship() && !this.isMoveRouteForcing() && !this.isDebugThrough());
};
//��������ֵ
Game_Player.prototype.encounterProgressValue = function() {
    var value = $gameMap.isBush(this.x, this.y) ? 2 : 1;
    if ($gameParty.hasEncounterHalf()) {
        value *= 0.5;
    }
    if (this.isInShip()) {
        value *= 0.5;
    }
    return value;
};
//����¼����� ����
Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (this.canStartLocalEvents()) {
        this.startMapEvent(this.x, this.y, triggers, false);
    }
};
//����¼����� ����
Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    if (this.canStartLocalEvents()) {
        var direction = this.direction();
        var x1 = this.x;
        var y1 = this.y;
        var x2 = $gameMap.roundXWithDirection(x1, direction);
        var y2 = $gameMap.roundYWithDirection(y1, direction);
        this.startMapEvent(x2, y2, triggers, true);
        if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
            var x3 = $gameMap.roundXWithDirection(x2, direction);
            var y3 = $gameMap.roundYWithDirection(y2, direction);
            this.startMapEvent(x3, y3, triggers, true);
        }
    }
};
//����¼���������
Game_Player.prototype.checkEventTriggerTouch = function(x, y) {
    if (this.canStartLocalEvents()) {
        this.startMapEvent(x, y, [1,2], true);
    }
};
//�ܿ�ʼ�ֲ��¼�
Game_Player.prototype.canStartLocalEvents = function() {
    return !this.isInAirship();
};
//���½�ͨ����
Game_Player.prototype.getOnOffVehicle = function() {
    if (this.isInVehicle()) {
        return this.getOffVehicle();
    } else {
        return this.getOnVehicle();
    }
};
//�Ͻ�ͨ����
Game_Player.prototype.getOnVehicle = function() {
    var direction = this.direction();
    var x1 = this.x;
    var y1 = this.y;
    var x2 = $gameMap.roundXWithDirection(x1, direction);
    var y2 = $gameMap.roundYWithDirection(y1, direction);
    if ($gameMap.airship().pos(x1, y1)) {
        this._vehicleType = 'airship';
    } else if ($gameMap.ship().pos(x2, y2)) {
        this._vehicleType = 'ship';
    } else if ($gameMap.boat().pos(x2, y2)) {
        this._vehicleType = 'boat';
    }
    if (this.isInVehicle()) {
        this._vehicleGettingOn = true;
        if (!this.isInAirship()) {
            this.forceMoveForward();
        }
        this.gatherFollowers();
    }
    return this._vehicleGettingOn;
};
//�½�ͨ����
Game_Player.prototype.getOffVehicle = function() {
    if (this.vehicle().isLandOk(this.x, this.y, this.direction())) {
        if (this.isInAirship()) {
            this.setDirection(2);
        }
        this._followers.synchronize(this.x, this.y, this.direction());
        this.vehicle().getOff();
        if (!this.isInAirship()) {
            this.forceMoveForward();
            this.setTransparent(false);
        }
        this._vehicleGettingOff = true;
        this.setMoveSpeed(4);
        this.setThrough(false);
        this.makeEncounterCount();
        this.gatherFollowers();
    }
    return this._vehicleGettingOff;
};
//ǿ���ƶ�
Game_Player.prototype.forceMoveForward = function() {
    this.setThrough(true);
    this.moveForward();
    this.setThrough(false);
};
//�����˺�����
Game_Player.prototype.isOnDamageFloor = function() {
    return $gameMap.isDamageFloor(this.x, this.y) && !this.isInAirship();
};
//�ƶ�����
Game_Player.prototype.moveStraight = function(d) {
    if (this.canPass(this.x, this.y, d)) {
        this._followers.updateMove();
    }
    Game_Character.prototype.moveStraight.call(this, d);
};
//�ƶ��Խ�
Game_Player.prototype.moveDiagonally = function(horz, vert) {
    if (this.canPassDiagonally(this.x, this.y, horz, vert)) {
        this._followers.updateMove();
    }
    Game_Character.prototype.moveDiagonally.call(this, horz, vert);
};
//��Ծ
Game_Player.prototype.jump = function(xPlus, yPlus) {
    Game_Character.prototype.jump.call(this, xPlus, yPlus);
    this._followers.jumpAll();
};
//��ʾ����
Game_Player.prototype.showFollowers = function() {
    this._followers.show();
};
//���ش���
Game_Player.prototype.hideFollowers = function() {
    this._followers.hide();
};
//���ϴ���
Game_Player.prototype.gatherFollowers = function() {
    this._followers.gather();
};
//�Ǵ��߼�����
Game_Player.prototype.areFollowersGathering = function() {
    return this._followers.areGathering();
};
//�Ǵ��߼��Ϻ�
Game_Player.prototype.areFollowersGathered = function() {
    return this._followers.areGathered();
};
