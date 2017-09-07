
//-----------------------------------------------------------------------------
// DataManager
// ���ݹ�����
// The static class that manages the database and game objects.
// �����̬���� ���� ���ݿ� �� ��Ϸ����

function DataManager() {
    throw new Error('This is a static class');
}
//���ݽ�ɫ�� = null
var $dataActors       = null;
//����ְҵ�� = null
var $dataClasses      = null;
//���ݼ����� = null
var $dataSkills       = null;
//������Ʒ�� = null
var $dataItems        = null;
//���������� = null
var $dataWeapons      = null;
//���ݷ����� = null
var $dataArmors       = null;
//���ݵ����� = null
var $dataEnemies      = null;
//���ݵ�Ⱥ�� = null
var $dataTroops       = null;
//����״̬�� = null
var $dataStates       = null;
//���ݶ����� = null
var $dataAnimations   = null;
//����ͼ�������� = null
var $dataTilesets     = null;
//���ݹ����¼��� = null
var $dataCommonEvents = null;
//����ϵͳ = null
var $dataSystem       = null;
//���ݵ�ͼ��Ϣ�� = null
var $dataMapInfos     = null;
//���ݵ�ͼ = null
var $dataMap          = null;
//��Ϸ��ʱ = null
var $gameTemp         = null;
//��Ϸϵͳ = null
var $gameSystem       = null;
//��Ϸ���� = null
var $gameScreen       = null;
//��Ϸ��ʱ = null
var $gameTimer        = null;
//��Ϸ��Ϣ = null
var $gameMessage      = null;
//��Ϸ������ = null
var $gameSwitches     = null;
//��Ϸ������ = null
var $gameVariables    = null;
//��Ϸ���������� = null
var $gameSelfSwitches = null;
//��Ϸ��ɫ�� = null
var $gameActors       = null;
//��Ϸ���� = null
var $gameParty        = null;
//��Ϸ��Ⱥ = null
var $gameTroop        = null;
//��Ϸ��ͼ = null
var $gameMap          = null;
//��Ϸ��Ϸ�� = null
var $gamePlayer       = null;
//�����¼� = null
var $testEvent        = null;
//ȫ��id
DataManager._globalId       = 'RPGMV';
//�ϴη���ID = 1
DataManager._lastAccessedId = 1;
//����url = null 
DataManager._errorUrl       = null;
//���ݿ��ļ��б�
DataManager._databaseFiles = [
    { name: '$dataActors',       src: 'Actors.json'       },
    { name: '$dataClasses',      src: 'Classes.json'      },
    { name: '$dataSkills',       src: 'Skills.json'       },
    { name: '$dataItems',        src: 'Items.json'        },
    { name: '$dataWeapons',      src: 'Weapons.json'      },
    { name: '$dataArmors',       src: 'Armors.json'       },
    { name: '$dataEnemies',      src: 'Enemies.json'      },
    { name: '$dataTroops',       src: 'Troops.json'       },
    { name: '$dataStates',       src: 'States.json'       },
    { name: '$dataAnimations',   src: 'Animations.json'   },
    { name: '$dataTilesets',     src: 'Tilesets.json'     },
    { name: '$dataCommonEvents', src: 'CommonEvents.json' },
    { name: '$dataSystem',       src: 'System.json'       },
    { name: '$dataMapInfos',     src: 'MapInfos.json'     }
];
//�������ݿ�
DataManager.loadDatabase = function() {
	//�Ƿ���Ա�־
    var test = this.isBattleTest() || this.isEventTest();
    var prefix = test ? 'Test_' : '';
    //ѭ��,��ȡ���� _databaseFiles �����Ŀ
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var name = this._databaseFiles[i].name;
        var src = this._databaseFiles[i].src;
        this.loadDataFile(name, prefix + src);
    }
    //���¼�����ʱ
    if (this.isEventTest()) {
        this.loadDataFile('$testEvent', prefix + 'Event.json');
    }
};
//���������ļ�
DataManager.loadDataFile = function(name, src) {
	//��ַ����
    var xhr = new XMLHttpRequest();
    //urlλ��
    var url = 'data/' + src;
    //��ַ���� �� λ��
    xhr.open('GET', url);
    //��ַ���� �ļ�����
    xhr.overrideMimeType('application/json');
    //��ַ���� ����ȡ
    xhr.onload = function() {
	    //��� ��ַ���� ״̬ < 400
        if (xhr.status < 400) {
	        //����[name] = json����(��ַ���� ����text)
            window[name] = JSON.parse(xhr.responseText);
            //���ݹ����� ����ȡ(����[name] )
            DataManager.onLoad(window[name]);
        }
    };
    //��ַ���� ������
    xhr.onerror = function() {
	    //���ݹ����� ����url = ���ݹ����� ����url \| url
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    //����[name] = null
    window[name] = null;
    //��ַ���� ����
    xhr.send();
};
//�����ݿ��м���֮��
DataManager.isDatabaseLoaded = function() {
	//������ 
    this.checkError();
    //ѭ�� ��ʼʱ i = 0 ; �� i < ���ݿ��ļ��б� ���� ʱ ;ÿһ�� i++
    for (var i = 0; i < this._databaseFiles.length; i++) {
	    //��� ���� ����[���ݿ��ļ��б�[i] ����]
        if (!window[this._databaseFiles[i].name]) {
	        //���� false
            return false;
        }
    }
    //���� true
    return true;
};
//���ص�ͼ����
DataManager.loadMapData = function(mapId) {
	//��� ��ͼid > 0
    if (mapId > 0) {
	    // �ļ��� = 'Map%1.json' �滻 (mapId ���0(3λ)  )
        var filename = 'Map%1.json'.format(mapId.padZero(3));
        //��ȡ�����ļ�(���ݵ�ͼ ,�ļ���)
        this.loadDataFile('$dataMap', filename);
    } else {
	    //�����յ�ͼ
        this.makeEmptyMap();
    }
};
//���յ�ͼ
DataManager.makeEmptyMap = function() {
	//���ݵ�ͼ = {}
    $dataMap = {};
    //���ݵ�ͼ ���� = []
    $dataMap.data = [];
    //���ݵ�ͼ �¼� = []
    $dataMap.events = [];
    //���ݵ�ͼ �� = 100
    $dataMap.width = 100;
    //���ݵ�ͼ �� = 100
    $dataMap.height = 100;
    //���ݵ�ͼ �������� = 3
    $dataMap.scrollType = 3;
};
//�ڵ�ͼ�Ѽ���
DataManager.isMapLoaded = function() {
	//������
    this.checkError();
    //���� !!���ݵ�ͼ
    return !!$dataMap;
};
//װ��
DataManager.onLoad = function(object) {
	//����
    var array;
    //��� ���� �� $dataMap
    if (object === $dataMap) {
	    //��ȡԪ����(����)
        this.extractMetadata(object);
        //���� = ���� �¼���
        array = object.events;
    } else {
	    //���� = ����
        array = object;
    }
    //��� ���� ��һ������
    if (Array.isArray(array)) {
	    //ѭ�� ��ʼʱi=0 ;�� i<���� ���� ʱ; ÿһ��i++ 
        for (var i = 0; i < array.length; i++) {
	        //���� = ����[i]
            var data = array[i];
            //��� ���� ���� ���� ע�� ������ undefined
            if (data && data.note !== undefined) {
	            //��ȡԪ����(����)
                this.extractMetadata(data);
            }
        }
    }
};
//��ȡԪ����
DataManager.extractMetadata = function(data) {
    var re = /<([^<>:]+)(:?)([^>]*)>/g;
    data.meta = {};
    for (;;) {
        var match = re.exec(data.note);
        if (match) {
            if (match[2] === ':') {
                data.meta[match[1]] = match[3];
            } else {
                data.meta[match[1]] = true;
            }
        } else {
            break;
        }
    }
};
//������
DataManager.checkError = function() {
	//��� ���ݹ����� ����url (���ݹ����� ����url ���� )
    if (DataManager._errorUrl) {
	    //�׳� �� ����( ���ݹ����� ����url ��ȡʧ��  )
        throw new Error('Failed to load: ' + DataManager._errorUrl);
    }
};
//��ս������
DataManager.isBattleTest = function() {
	//���� ���ó��� ��ѡ����Ч("btest")
    return Utils.isOptionValid('btest');
};
//���¼�����
DataManager.isEventTest = function() {
	//���� ���ó��� ��ѡ����Ч("etest")
    return Utils.isOptionValid('etest');
};
//�Ǽ���
DataManager.isSkill = function(item) {
	//���� ��Ŀ ���� ���ݼ��� ���� ��Ŀ
    return item && $dataSkills.contains(item);
};
//����Ʒ
DataManager.isItem = function(item) {
	//���� ��Ŀ ���� ������Ʒ ���� ��Ŀ
    return item && $dataItems.contains(item);
};
//������
DataManager.isWeapon = function(item) {
	//���� ��Ŀ ���� �������� ���� ��Ŀ
    return item && $dataWeapons.contains(item);
};
//�Ƿ���
DataManager.isArmor = function(item) {
	//���� ��Ŀ ���� ���ݷ��� ���� ��Ŀ
    return item && $dataArmors.contains(item);
};
//������Ϸ����
DataManager.createGameObjects = function() {
    //$gameTemp         = �� ��Ϸ��ʱ
    $gameTemp          = new Game_Temp();
    //$gameSystem       = �� ��Ϸϵͳ
    $gameSystem        = new Game_System();
    //$gameScreen       = �� ��Ϸ����
    $gameScreen         = new Game_Screen();
    //$gameTimer        = �� ��Ϸ��ʱ
    $gameTimer         = new Game_Timer();
    //$gameMessage      = �� ��Ϸ��Ϣ
    $gameMessage       = new Game_Message();
    //$gameSwitches     = �� ��Ϸ������ 
    $gameSwitches      = new Game_Switches();
    //$gameVariables    = �� ��Ϸ������
    $gameVariables     = new Game_Variables();
    //$gameSelfSwitches = �� ��Ϸ����������
    $gameSelfSwitches  = new Game_SelfSwitches();
    //$gameActors       = �� ��Ϸ��ɫ��
    $gameActors        = new Game_Actors();
    //$gameParty        = �� ��Ϸ����
    $gameParty         = new Game_Party();
    //$gameTroop        = �� ��Ϸ��Ⱥ
    $gameTroop         = new Game_Troop();
    //$gameMap          = �� ��Ϸ��ͼ
    $gameMap           = new Game_Map();
    //$gamePlayer       = �� ��Ϸ��ɫ
    $gamePlayer        = new Game_Player();
};
//��װ����Ϸ
DataManager.setupNewGame = function() {
	//������Ϸ����
    this.createGameObjects();
    //ѡ�񱣴��ļ���������Ϸ
    this.selectSavefileForNewGame();
    //��Ϸ���� ��װ��ʼ��Ա
    $gameParty.setupStartingMembers();
    //��Ϸ��Ϸ�� ���洫��(����ϵͳ ��ʼ��ͼid ,����ϵͳ ��ʼx ,����ϵͳ ��ʼy)
    $gamePlayer.reserveTransfer($dataSystem.startMapId,
        $dataSystem.startX, $dataSystem.startY);
    //ͼ�� ֡���� = 0
    Graphics.frameCount = 0;
};
//����ս������
DataManager.setupBattleTest = function() {
	//������Ϸ����
    this.createGameObjects();
    //��Ϸ���� ��װս������
    $gameParty.setupBattleTest();
    //ս�������� ��װ ����ϵͳ ���Ե�Ⱥid ������ true  ��ʧ�� false
    BattleManager.setup($dataSystem.testTroopId, true, false);
    //ս�������� ����ս������(true)
    BattleManager.setBattleTest(true);
    //ս�������� ����ս��bgm
    BattleManager.playBattleBgm();
};
//�����¼�����
DataManager.setupEventTest = function() {
	//������Ϸ����
    this.createGameObjects();
    //ѡ�񱣴��ļ���������Ϸ
    this.selectSavefileForNewGame();
    //��Ϸ���� ��װ��ʼ��Ա
    $gameParty.setupStartingMembers();
    //��Ϸ��Ϸ�� ���洫��(-1,8,6)
    $gamePlayer.reserveTransfer(-1, 8, 6);
    //����͸��(false)
    $gamePlayer.setTransparent(false);
};
//����ȫ����Ϣ
DataManager.loadGlobalInfo = function() {
	//jsom
    var json;
    //����
    try {
	    //json = �洢������ ��ȡ0
        json = StorageManager.load(0);
    //�������
    } catch (e) {
	    //����̨ ����(e)
        console.error(e);
        //���� []
        return [];
    }
    //��� json
    if (json) {
	    //ȫ����Ϣ = json����(json)
        var globalInfo = JSON.parse(json);
        //ѭ�� ��ʼʱ i = 1 ; �� i < ��󴢴��ļ��� ʱ ; ÿһ�� i++
        for (var i = 1; i <= this.maxSavefiles(); i++) {
	        //��� ���� �洢������ ����(i)
            if (!StorageManager.exists(i)) {
	            //ɾ�� ȫ����Ϣ[i]
                delete globalInfo[i];
            }
        }
        //���� ȫ����Ϣ
        return globalInfo;
    } else {
	    //���� []
        return [];
    }
};
//����ȫ����Ϣ
DataManager.saveGlobalInfo = function(info) {
	//�洢������ ���� ( 0 ,jsonת��(info��Ϣ))
    StorageManager.save(0, JSON.stringify(info));
};
//�������Ϸ����
DataManager.isThisGameFile = function(savefileId) {
	//ȫ����Ϣ = ����ȫ����Ϣ
    var globalInfo = this.loadGlobalInfo();
    //��� ȫ����Ϣ ���� ȫ����Ϣ[�浵�ļ�id]
    if (globalInfo && globalInfo[savefileId]) {
	    //��� �洢������ �Ǳ���ģʽ
        if (StorageManager.isLocalMode()) {
	        //���� true
            return true;
        } else {
	        //�浵�ļ� = ȫ����Ϣ[�浵�ļ�id]
            var savefile = globalInfo[savefileId];
            //���� �浵�ļ� ȫ��id  === ȫ��id ���� �浵�ļ� ���� === ����ϵͳ ��Ϸ����
            return (savefile.globalId === this._globalId &&
                    savefile.title === $dataSystem.gameTitle);
        }
    } else {
	    //���� false
        return false;
    }
};
//���κα����ļ�����
DataManager.isAnySavefileExists = function() {
	//ȫ����Ϣ = ����ȫ����Ϣ
    var globalInfo = this.loadGlobalInfo();
    //��� ȫ����Ϣ
    if (globalInfo) {
	    //ѭ�� ��ʼʱ i = 1 ; �� i < ȫ����Ϣ ���� ʱ ; ÿһ�� i++
        for (var i = 1; i < globalInfo.length; i++) {
	        //��� �������Ϸ����
            if (this.isThisGameFile(i)) {
	            //���� true
                return true;
            }
        }
    }
    return false;
};
//���µı����ļ�
DataManager.latestSavefileId = function() {
	//ȫ����Ϣ = ����ȫ����Ϣ
    var globalInfo = this.loadGlobalInfo();
    //�浵�ļ�id = 1
    var savefileId = 1;
    //ʱ����ʱ = 0
    var timestamp = 0;
    //��� ȫ����Ϣ 
    if (globalInfo) {
	    //ѭ�� ��ʼʱ i = 1 ; �� i < ȫ����Ϣ ���� ʱ ; ÿһ�� i++
        for (var i = 1; i < globalInfo.length; i++) {
	        //��� �������Ϸ�ļ�(i) ���� ȫ����Ϣ[i].ʱ����ʱ > ʱ����ʱ
            if (this.isThisGameFile(i) && globalInfo[i].timestamp > timestamp) {
	            //ʱ����ʱ = ȫ����Ϣ[i].ʱ����ʱ
                timestamp = globalInfo[i].timestamp;
                //�浵�ļ�id = 1
                savefileId = i;
            }
        }
    }
    //���� �浵�ļ�id
    return savefileId;
};
//�������б����ļ��е�ͼ��
DataManager.loadAllSavefileImages = function() {
	//ȫ����Ϣ = ����ȫ����Ϣ
    var globalInfo = this.loadGlobalInfo();
    //��� ȫ����Ϣ
    if (globalInfo) {
	    //ѭ�� ��ʼʱ i = 1 ; �� i < ȫ����Ϣ ���� ʱ ; ÿһ�� i++
        for (var i = 1; i < globalInfo.length; i++) {
	        //��� �������Ϸ�ļ�(i)
            if (this.isThisGameFile(i)) {
	            //��Ϣ = ȫ����Ϣ[i]
                var info = globalInfo[i];
                //��ȡ�浵�ļ�ͼ��(��Ϣ)
                this.loadSavefileImages(info);
            }
        }
    }
};
//��ȡ�����ļ��е�ͼ��
DataManager.loadSavefileImages = function(info) {
	//��� ��Ϣ ����ͼ��
    if (info.characters) {
	    //ѭ�� ��ʼʱ i = 0 ; �� i < ��Ϣ ����ͼ�� ���� ʱ ; ÿһ�� i++
        for (var i = 0; i < info.characters.length; i++) {
	        //ͼ������� ��ȡ����ͼ(��Ϣ ����ͼ��[i][0])
            ImageManager.loadCharacter(info.characters[i][0]);
        }
    }
	//��� ��Ϣ ��ͼ��
    if (info.faces) {
	    //ѭ�� ��ʼʱ i = 0 ; �� i < ��Ϣ ��ͼ�� ���� ʱ ; ÿһ�� i++
        for (var j = 0; j < info.faces.length; j++) {
	        //ͼ������� ��ȡ��ͼ(��Ϣ ��ͼ��[i][0])
            ImageManager.loadFace(info.faces[j][0]);
        }
    }
};
//��󱣴��ļ�
DataManager.maxSavefiles = function() {
	//���� 20
    return 20;
};
//������Ϸ
DataManager.saveGame = function(savefileId) {
	//����
    try {
	    //���� ������Ϸ�޾�Ԯ(�浵�ļ�id)
        return this.saveGameWithoutRescue(savefileId);
    //�������
    } catch (e) {
	    //����̨ ����(e)
        console.error(e);
        //����
        try {
	        //�洢������ ɾ��(�浵�ļ�id)
            StorageManager.remove(savefileId);
        //�������(e2)
        } catch (e2) {
        }
        //���� false
        return false;
    }
};
//������Ϸ
DataManager.loadGame = function(savefileId) {
	//����
    try {
	    //������Ϸ�޾�Ԯ
        return this.loadGameWithoutRescue(savefileId);
    //�������(e)
    } catch (e) {
	    //����̨ ����(e)
        console.error(e);
        //���� false
        return false;
    }
};
//���ر����ļ���Ϣ
DataManager.loadSavefileInfo = function(savefileId) {
	//ȫ����Ϣ = ����ȫ����Ϣ
    var globalInfo = this.loadGlobalInfo();
    //���� ��� (ȫ����Ϣ ���� ȫ����Ϣ[�浵�ļ�id]) ����  ȫ����Ϣ[�浵�ļ�id] ���� null
    return (globalInfo && globalInfo[savefileId]) ? globalInfo[savefileId] : null;
};
//�ϴη��ʱ����ļ�ID
DataManager.lastAccessedSavefileId = function() {
	//���� �ϴη���ID
    return this._lastAccessedId;
};
//������Ϸ�޾�Ԯ
DataManager.saveGameWithoutRescue = function(savefileId) {
	//json  = json��չ ת�� ( ������������ )
    var json = JsonEx.stringify(this.makeSaveContents());
    //��� json ���� >= 20000
    if (json.length >= 200000) {
	    //����̨ ����(��������̫��)
        console.warn('Save data too big!');
    }
    //
    StorageManager.save(savefileId, json);
    this._lastAccessedId = savefileId;
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};
//������Ϸ�޾�Ԯ
DataManager.loadGameWithoutRescue = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (this.isThisGameFile(savefileId)) {
        var json = StorageManager.load(savefileId);
        this.createGameObjects();
        this.extractSaveContents(JsonEx.parse(json));
        this._lastAccessedId = savefileId;
        return true;
    } else {
        return false;
    }
};
//ѡ�񱣴��ļ���������Ϸ
DataManager.selectSavefileForNewGame = function() {
    var globalInfo = this.loadGlobalInfo();
    this._lastAccessedId = 1;
    if (globalInfo) {
        var numSavefiles = Math.max(0, globalInfo.length - 1);
        if (numSavefiles < this.maxSavefiles()) {
            this._lastAccessedId = numSavefiles + 1;
        } else {
            var timestamp = Number.MAX_VALUE;
            for (var i = 1; i < globalInfo.length; i++) {
                if (!globalInfo[i]) {
                    this._lastAccessedId = i;
                    break;
                }
                if (globalInfo[i].timestamp < timestamp) {
                    timestamp = globalInfo[i].timestamp;
                    this._lastAccessedId = i;
                }
            }
        }
    }
};
//���������ļ���Ϣ
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    return info;
};
//������������
DataManager.makeSaveContents = function() {
    // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
    var contents = {};
    contents.system       = $gameSystem;
    contents.screen       = $gameScreen;
    contents.timer        = $gameTimer;
    contents.switches     = $gameSwitches;
    contents.variables    = $gameVariables;
    contents.selfSwitches = $gameSelfSwitches;
    contents.actors       = $gameActors;
    contents.party        = $gameParty;
    contents.map          = $gameMap;
    contents.player       = $gamePlayer;
    return contents;
};
//��ȡ��������
DataManager.extractSaveContents = function(contents) {
    $gameSystem        = contents.system;
    $gameScreen        = contents.screen;
    $gameTimer         = contents.timer;
    $gameSwitches      = contents.switches;
    $gameVariables     = contents.variables;
    $gameSelfSwitches  = contents.selfSwitches;
    $gameActors        = contents.actors;
    $gameParty         = contents.party;
    $gameMap           = contents.map;
    $gamePlayer        = contents.player;
};
