
//-----------------------------------------------------------------------------
// Game_Item
// ��Ϸ��Ŀ
// The game object class for handling skills, items, weapons, and armor. It is
// required because save data should not include the database object itself.
// ��������Ʒ�������׵���Ϸ������,���Ǳ������Ϊ�������ݲ��������Ϸ���ݿ��Լ�

function Game_Item() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Item.prototype.initialize = function(item) {
	//���ݷ��� = ""
    this._dataClass = '';
    //��Ŀid = 0
    this._itemId = 0;
    //��� ��Ŀ
    if (item) {
	    //���ö��� (��Ŀ)
        this.setObject(item);
    }
};
//�Ǽ���
Game_Item.prototype.isSkill = function() {
	//���� ���ݷ��� = "skill"
    return this._dataClass === 'skill';
};
//����Ʒ
Game_Item.prototype.isItem = function() {
	//���� ���ݷ��� = "item"
    return this._dataClass === 'item';
};
//�ǿ�����Ŀ
Game_Item.prototype.isUsableItem = function() {
	//���� �Ǽ��� ���� ����Ʒ
    return this.isSkill() || this.isItem();
};
//������
Game_Item.prototype.isWeapon = function() {
	//���� ���ݷ��� = "weapon"
    return this._dataClass === 'weapon';
};
//�Ƿ���
Game_Item.prototype.isArmor = function() {
	//���� ���ݷ��� = "armor"
    return this._dataClass === 'armor';
};
//��װ����Ʒ
Game_Item.prototype.isEquipItem = function() {
	//���� ������ ���� �Ƿ���
    return this.isWeapon() || this.isArmor();
};
//����Ч��
Game_Item.prototype.isNull = function() {
	//���� ���ݷ��� = ""
    return this._dataClass === '';
};
//��Ŀid
Game_Item.prototype.itemId = function() {
	//���� ��Ŀid
    return this._itemId;
};
//����
Game_Item.prototype.object = function() {
	//��� �Ǽ���
    if (this.isSkill()) {
	    //���� ���ݼ���[��Ŀid]
        return $dataSkills[this._itemId];
    //���� ��� ����Ʒ
    } else if (this.isItem()) {
	    //���� ������Ʒ[��Ŀid]
        return $dataItems[this._itemId];
    //���� ��� ������
    } else if (this.isWeapon()) {
	    //���� ��������[��Ŀid]
        return $dataWeapons[this._itemId];
    //���� ��� �Ƿ���
    } else if (this.isArmor()) {
	    //���� ���ݷ���[��Ŀid]
        return $dataArmors[this._itemId];
    //���� 
    } else {
	    //���� null
        return null;
    }
};
//���ö���
Game_Item.prototype.setObject = function(item) {
	//��� ���ݹ����� �Ǽ���(item)
    if (DataManager.isSkill(item)) {
	    //���ݷ��� = "skill"
        this._dataClass = 'skill';
	//���� ��� ���ݹ����� ����Ʒ(item)
    } else if (DataManager.isItem(item)) {
	    //���ݷ��� = "item"
        this._dataClass = 'item';
	//���� ��� ���ݹ����� ������(item)
    } else if (DataManager.isWeapon(item)) {
	    //���ݷ��� = "weapon"
        this._dataClass = 'weapon';
	//���� ��� ���ݹ����� �Ƿ���(item)
    } else if (DataManager.isArmor(item)) {
	    //���ݷ��� = "armor"
        this._dataClass = 'armor';
    //���� 
    } else {
	    //���ݷ��� = ""
        this._dataClass = '';
    }
    //��Ŀid = ��� ��Ŀ ���� ��Ŀ id ���� ���� 0 
    this._itemId = item ? item.id : 0;
};
//����װ��
Game_Item.prototype.setEquip = function(isWeapon, itemId) {
	//���ݷ��� = ��� ������ ���� weapon ���� ���� armor 
    this._dataClass = isWeapon ? 'weapon' : 'armor';
    //��Ŀid = itemId
    this._itemId = itemId;
};
