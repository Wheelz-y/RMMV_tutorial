//=============================================================================
// 2w_scenceWindowChange.js
//=============================================================================

/*:
 * @plugindesc 场景修改窗口位置
 * @author wangwang
 *   
 * @param 2w_scenceWindowChange
 * @desc 插件 场景修改窗口位置
 * @default 汪汪
 *    
 * @param Scene_Title
 * @desc 场景 标题 _commandWindow
 * @default {}
 * 
 * 
 * @param Scene_Menu
 * @desc 场景 菜单 _commandWindow , _goldWindow , _statusWindow
 * @default {}
 * 
 * 
 * @param Scene_Item
 * @desc 场景 物品: _categoryWindow  ,   _itemWindow  ,  _actorWindow  
 * @default {}
 * 
 * @param Scene_Skill
 * @desc 场景 技能  _skillTypeWindow , _helpWindow  , _statusWindow ,_itemWindow , _actorWindow
 * @default {}
 * 
 * @param Scene_Equip
 * @desc 场景 装备 , _statusWindow , _helpWindow  , _commandWindow ,_slotWindow , _itemWindow 
 * @default {}
 * 
 * @param Scene_Status
 * @desc 场景 状态 _statusWindow
 * @default {}
 * 
 * @param Scene_Shop
 * @desc 场景 商店 _goldWindow , _commandWindow , _dummyWindow ,  _numberWindow  , _statusWindow , _categoryWindow , _sellWindow , _buyWindow
 * @default {}
 * 
 *  
 * @param Scene_Battle
 * @desc 场景 战斗 _logWindow , _statusWindow , _partyCommandWindow ,  _actorCommandWindow ,  _helpWindow  ,_skillWindow ,_itemWindow ,_actorWindow,_enemyWindow , _messageWindow ,_scrollTextWindow
 * @default {}
 *  
 * @param Scene_Map
 * @desc 场景 地图 _spriteset   _mapNameWindow  _messageWindow  _scrollTextWindow
 * @default {}
 * 
 * 
 * 
 * 
 * @help 
 *  
 * 
 *  Scene_Title
 *  场景 标题 _commandWindow
 *   
 *  Scene_Menu
 *  场景 菜单 _commandWindow , _goldWindow , _statusWindow
 * 
 * 
 *  Scene_Item
 *  场景 物品: _categoryWindow  ,   _itemWindow  ,  _actorWindow  
 * 
 * 
 *  Scene_Skill
 *  场景 技能  _skillTypeWindow , _helpWindow  , _statusWindow ,_itemWindow , _actorWindow
 *  
 * 
 *  Scene_Equip
 *  场景 装备 , _statusWindow , _helpWindow  , _commandWindow ,_slotWindow , _itemWindow 
 *
 * 
 *  Scene_Status
 *  场景 状态 _statusWindow
 *
 * 
 *  Scene_Shop
 *  场景 商店 _goldWindow , _commandWindow , _dummyWindow ,  _numberWindow  , _statusWindow , _categoryWindow , _sellWindow , _buyWindow
 *
 * 
 *  
 *  Scene_Battle 
 *  场景 战斗 _logWindow , _statusWindow , _partyCommandWindow ,  _actorCommandWindow ,  _helpWindow  ,_skillWindow ,_itemWindow ,_actorWindow,_enemyWindow , _messageWindow ,_scrollTextWindow
 *
 * 
 *  Scene_Map
 *  场景 地图 _spriteset   _mapNameWindow  _messageWindow  _scrollTextWindow
 * 
 * 
 * 设置方法 
 * {}
 * 
 * 对于某个窗口 ,如 _commandWindow
 * {"_commandWindow":{}}
 *  某些窗口  _commandWindow , _goldWindow ,
 * {"_commandWindow":{},"_goldWindow":{}}
 * 
 * 
 * 移动并改变大小
 * {"_commandWindow":{"moveSize":[0,0,100,100]}}
 * 
 * {"_commandWindow":{"moveSize":[0,0,100,100]},"_goldWindow":{"moveSize":[0,100,100,100]}}
 * 
 * "setWindowskin":["window"]
 * 
 * 设置窗口皮肤为系统图片的 "window"
 * 
 * 
 * 
 * 
 * */





var ww = ww || {}


ww.PluginManager = {}
ww.PluginManager.get = function (n) {
    var find = function (n) {
        var l = PluginManager._parameters;
        var p = l[(n || "").toLowerCase()];
        if (!p) { for (var m in l) { if (l[m] && (n in l[m])) { p = l[m]; } } }
        return p || {}
    }
    var parse = function (i) {
        try { return JSON.parse(i) } catch (e) { return i }
    }
    var m, o = {}, p = find(n)
    for (m in p) { o[m] = parse(p[m]) }
    return o
}


ww.scenceWindowChange = {}

ww.scenceWindowChange.scenesSet = ww.PluginManager.get("2w_scenceWindowChange")




ww.scenceWindowChange.changeScene = function (scene) {

    if (scene && scene.constructor.name) {

        var name = scene.constructor.name

        var scenesSet = ww.scenceWindowChange.scenesSet || {}

        var sceneSet = scenesSet[name] || {}
        for (var i in sceneSet) {
            var sprite = scene[i]
            var set = sceneSet[i]
            console.log(sprite, set)
            this.changeSprite(sprite, set)
        }
    }
}

ww.scenceWindowChange.changeSprite = function (sprite, set) {

    if (sprite && set) {
        if (typeof set == "object") {
            for (var i in set) {
                console.log(i, sprite[i], set[i])
                var type = typeof sprite[i]
                if (type == "function") {
                    if (Array.isArray(set[i])) {
                        sprite[i].apply(sprite, set[i])
                    } else {
                        sprite[i].call(sprite, set[i])
                    }
                } else if (type == "object") {
                    this.changeSprite(sprite[i], set[i])
                } else if (type == "undefined") {
                } else {
                    sprite[i] = set[i]
                }
            }
            if (typeof sprite["refresh"] == "function") {
                sprite.refresh()
            }
        }
    }

}

ww.scenceWindowChange.Scene_Title_prototype_start = Scene_Title.prototype.start
Scene_Title.prototype.start = function () {
    ww.scenceWindowChange.Scene_Title_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)

}



ww.scenceWindowChange.Scene_Menu_prototype_start = Scene_Menu.prototype.start
Scene_Menu.prototype.start = function () {
    ww.scenceWindowChange.Scene_Menu_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}



ww.scenceWindowChange.Scene_Item_prototype_start = Scene_Item.prototype.start
Scene_Item.prototype.start = function () {
    ww.scenceWindowChange.Scene_Item_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}




ww.scenceWindowChange.Scene_Skill_prototype_start = Scene_Skill.prototype.start
Scene_Skill.prototype.start = function () {
    ww.scenceWindowChange.Scene_Skill_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}






ww.scenceWindowChange.Scene_Equip_prototype_start = Scene_Equip.prototype.start
Scene_Equip.prototype.start = function () {
    ww.scenceWindowChange.Scene_Equip_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}





ww.scenceWindowChange.Scene_Status_prototype_start = Scene_Status.prototype.start
Scene_Status.prototype.start = function () {
    ww.scenceWindowChange.Scene_Status_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}




ww.scenceWindowChange.Scene_Shop_prototype_start = Scene_Shop.prototype.start
Scene_Shop.prototype.start = function () {
    ww.scenceWindowChange.Scene_Shop_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}





ww.scenceWindowChange.Scene_Battle_prototype_start = Scene_Battle.prototype.start
Scene_Battle.prototype.start = function () {
    ww.scenceWindowChange.Scene_Battle_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}


ww.scenceWindowChange.Scene_Map_prototype_start = Scene_Map.prototype.start
Scene_Map.prototype.start = function () {
    ww.scenceWindowChange.Scene_Map_prototype_start.call(this)
    ww.scenceWindowChange.changeScene(this)
}



Window_Base.prototype.moveSize = function (x, y, w, h) {
    this.move(x, y, w, h)
    this.createContents()
};



Window_Base.prototype.setWindowskin = function (name) {
    //窗口皮肤 = 图像管理器 读取系统("window")
    this.windowskin = ImageManager.loadSystem(name);
};