
//-----------------------------------------------------------------------------
// Game_Unit
// ��ϷС��
// The superclass of Game_Party and Game_Troop.
// ����͵�Ⱥ �� ������

function Game_Unit() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Unit.prototype.initialize = function() {
    this._inBattle = false;
};
//��ս��
Game_Unit.prototype.inBattle = function() {
    return this._inBattle;
};
//��Ա��
Game_Unit.prototype.members = function() {
    return [];
};
//��ĳ�Ա��
Game_Unit.prototype.aliveMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive();
    });
};
//���ĳ�Ա��
Game_Unit.prototype.deadMembers = function() {
    return this.members().filter(function(member) {
        return member.isDead();
    });
};
//�ɶ���Ա��
Game_Unit.prototype.movableMembers = function() {
    return this.members().filter(function(member) {
        return member.canMove();
    });
};
//�������
Game_Unit.prototype.clearActions = function() {
    return this.members().forEach(function(member) {
        return member.clearActions();
    });
};
//����
Game_Unit.prototype.agility = function() {
	//��Ա�� = ��Ա��
    var members = this.members();
    //��� ��Ա�� ���� == 0
    if (members.length === 0) {
	    //���� 1
        return 1;
    }
	//�� =  ��Ա ���ûص����� ���� (r, ��Ա)
    var sum = members.reduce(function(r, member) {
	    //���� r + ��Ա ����
        return r + member.agi;
    //��ʼֵΪ 0
    }, 0);
    //���� �� / ��Ա�� ����
    return sum / members.length;
};
//Ŀ�������
Game_Unit.prototype.tgrSum = function() {
	//���� ��ĳ�Ա�� ���ûص����� ���� (r, ��Ա)
    return this.aliveMembers().reduce(function(r, member) {
	    //���� r + ��Ա Ŀ�����
        return r + member.tgr;
    //��ʼֵΪ 0 
    }, 0);
};
//���Ŀ��
Game_Unit.prototype.randomTarget = function() {
	//Ŀ�������� =  ����� *  Ŀ�������
    var tgrRand = Math.random() * this.tgrSum();
    //Ŀ�� = null
    var target = null;
    //��ĳ�Ա�� ��ÿһ�� (��Ա)
    this.aliveMembers().forEach(function(member) {
	    //Ŀ�������� - ��Ա Ŀ�����
        tgrRand -= member.tgr;
        //��� Ŀ�������� <= 0 ���� ���� Ŀ��  
        if (tgrRand <= 0 && !target) {
	        //Ŀ�� = ��Ա
            target = member;
        }
    });
    //���� ��Ա
    return target;
};
//�������Ŀ��
Game_Unit.prototype.randomDeadTarget = function() {
    var members = this.deadMembers();
    if (members.length === 0) {
        return null;
    }
    return members[Math.floor(Math.random() * members.length)];
};
//����Ŀ��
Game_Unit.prototype.smoothTarget = function(index) {
	//��� ���� < 0
    if (index < 0) {
	    //���� = 0
        index = 0;
    }
    //��Ա = ��Ա��[����]
    var member = this.members()[index];
    //����  ��� (��Ա ���� ��Ա�ǻ��) ���� ��Ա ���� ���� ��ĳ�Ա��[0]
    return (member && member.isAlive()) ? member : this.aliveMembers()[0];
};
//��������Ŀ��
Game_Unit.prototype.smoothDeadTarget = function(index) {
    if (index < 0) {
        index = 0;
    }
    var member = this.members()[index];
    return (member && member.isDead()) ? member : this.deadMembers()[0];
};
//������
Game_Unit.prototype.clearResults = function() {
    this.members().forEach(function(member) {
        member.clearResult();
    });
};
//��ս����ʼ
Game_Unit.prototype.onBattleStart = function() {
    this.members().forEach(function(member) {
        member.onBattleStart();
    });
    this._inBattle = true;
};
//��ս������
Game_Unit.prototype.onBattleEnd = function() {
    this._inBattle = false;
    this.members().forEach(function(member) {
        member.onBattleEnd();
    });
};
//��������
Game_Unit.prototype.makeActions = function() {
    this.members().forEach(function(member) {
        member.makeActions();
    });
};
//ѡ��
Game_Unit.prototype.select = function(activeMember) {
    this.members().forEach(function(member) {
        if (member === activeMember) {
            member.select();
        } else {
            member.deselect();
        }
    });
};
//��ȫ������
Game_Unit.prototype.isAllDead = function() {
    return this.aliveMembers().length === 0;
};
//���ս��
Game_Unit.prototype.substituteBattler = function() {
    var members = this.members();
    for (var i = 0; i < members.length; i++) {
        if (members[i].isSubstitute()) {
            return members[i];
        }
    }
};
