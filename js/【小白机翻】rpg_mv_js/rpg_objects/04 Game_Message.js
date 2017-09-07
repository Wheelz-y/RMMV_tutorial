
//-----------------------------------------------------------------------------
// Game_Message
// ��Ϸ��Ϣ   $gameMessage
// The game object class for the state of the message window that displays text
// or selections, etc.
// ��ʾ�ı�,ѡ������� ��Ϣ���� ����Ϸ������

function Game_Message() {
    this.initialize.apply(this, arguments);
}
//��ʼ��
Game_Message.prototype.initialize = function() {
	//���
    this.clear();
};
//���
Game_Message.prototype.clear = function() {
	//�ı��� = []
    this._texts = [];
    //ѡ���� = []
    this._choices = [];
    //��ͼ�� = ''
    this._faceName = '';
    //��ͼ���� = 0
    this._faceIndex = 0;
    //���� = 0 
    this._background = 0;
    //λ������ = 2
    this._positionType = 2;
    //ѡ��Ĭ������ = 0
    this._choiceDefaultType = 0;
    //ѡ��ȡ������ = 0 
    this._choiceCancelType = 0;
    //ѡ�񱳾� = 0
    this._choiceBackground = 0;
    //ѡ��λ������ = 2
    this._choicePositionType = 2;
    //�����������id = 0
    this._numInputVariableId = 0;
    //��������λ�� = 0 
    this._numInputMaxDigits = 0;
    //��Ʒѡ�����id = 0
    this._itemChoiceVariableId = 0;
    //��Ʒѡ������id = 0
    this._itemChoiceItypeId = 0;
    //����ģʽ = false 
    this._scrollMode = false;
    //�����ٶ� = 2
    this._scrollSpeed = 2;
    //���������� = false
    this._scrollNoFast = false;
    //ѡ����з��� = null 
    this._choiceCallback = null;
};
//ѡ����
Game_Message.prototype.choices = function() {
	//ѡ����
    return this._choices;
};
//��ͼ����
Game_Message.prototype.faceName = function() {
    //���� ��ͼ����
    return this._faceName;
};
//��ͼ����
Game_Message.prototype.faceIndex = function() {
    //���� ��ͼ����
    return this._faceIndex;
};
//����
Game_Message.prototype.background = function() {
    //���� ����
    return this._background;
};
//λ������
Game_Message.prototype.positionType = function() {
    //���� λ������
    return this._positionType;
};
//ѡ��Ĭ������
Game_Message.prototype.choiceDefaultType = function() {
    //���� ѡ��Ĭ������
    return this._choiceDefaultType;
};
//ѡ��ȡ������
Game_Message.prototype.choiceCancelType = function() {
    //���� ѡ��ȡ������
    return this._choiceCancelType;
};
//ѡ�񱳾�
Game_Message.prototype.choiceBackground = function() {
    //���� ѡ�񱳾�
    return this._choiceBackground;
};
//ѡ��λ������
Game_Message.prototype.choicePositionType = function() {
    //���� ѡ��λ������
    return this._choicePositionType;
};
//�����������id
Game_Message.prototype.numInputVariableId = function() {
    //���� �����������id
    return this._numInputVariableId;
};
//���������������
Game_Message.prototype.numInputMaxDigits = function() {
    //���� ���������������
    return this._numInputMaxDigits;
};
//��Ʒѡ�����id
Game_Message.prototype.itemChoiceVariableId = function() {
    //���� ��Ʒѡ�����id
    return this._itemChoiceVariableId;
};
//��Ʒѡ������id
Game_Message.prototype.itemChoiceItypeId = function() {
    //���� ��Ʒѡ������id
    return this._itemChoiceItypeId;
};
//������ʽ
Game_Message.prototype.scrollMode = function() {
    //���� ������ʽ
    return this._scrollMode;
};
//�����ٶ�
Game_Message.prototype.scrollSpeed = function() {
    //���� �����ٶ�
    return this._scrollSpeed;
};
//����������
Game_Message.prototype.scrollNoFast = function() {
	//���� ����������
    return this._scrollNoFast;
};
//���
Game_Message.prototype.add = function(text) {
	//�ı��� ���(text)
    this._texts.push(text);
};
//������ͼ
Game_Message.prototype.setFaceImage = function(faceName, faceIndex) {
	//��ͼ���� =  faceName
    this._faceName = faceName;
    //��ͼ���� = faceIndex
    this._faceIndex = faceIndex;
};
//���ñ���
Game_Message.prototype.setBackground = function(background) {
	//���� = background
    this._background = background;
};
//����λ������
Game_Message.prototype.setPositionType = function(positionType) {
	//λ������ = positionType
    this._positionType = positionType;
};
//����ѡ��
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
	//ѡ���� = choices
    this._choices = choices;
    //ѡ��Ĭ������ = defaultType
    this._choiceDefaultType = defaultType;
    //ѡ��ȡ������ = cancelType
    this._choiceCancelType = cancelType;
};
//����ѡ�񱳾�
Game_Message.prototype.setChoiceBackground = function(background) {
	//ѡ�񱳾� = background
    this._choiceBackground = background;
};
//����ѡ��λ������
Game_Message.prototype.setChoicePositionType = function(positionType) {
	//ѡ��λ������ = positionType
    this._choicePositionType = positionType;
};
//������������
Game_Message.prototype.setNumberInput = function(variableId, maxDigits) {
    //�����������id = variableId
    this._numInputVariableId = variableId;
    //��������λ�� = maxDigits
    this._numInputMaxDigits = maxDigits;
};
//������Ʒѡ��
Game_Message.prototype.setItemChoice = function(variableId, itemType) {
    //��Ʒѡ�����id = variableId
    this._itemChoiceVariableId = variableId;
    //��Ʒѡ������id = itemType
    this._itemChoiceItypeId = itemType;
};
//���ù���
Game_Message.prototype.setScroll = function(speed, noFast) {
	//����ģʽ = true 
    this._scrollMode = true;
    //�����ٶ� = speed
    this._scrollSpeed = speed;
    //���������� = noFast
    this._scrollNoFast = noFast;
};
//����ѡ�����
Game_Message.prototype.setChoiceCallback = function(callback) {
    //ѡ����з��� = callback 
    this._choiceCallback = callback;
};
//��ѡ��
Game_Message.prototype.onChoice = function(n) {
    //��� ѡ����з��� (ѡ����з��� ����)
    if (this._choiceCallback) {
	    //ѡ����з���(n)
        this._choiceCallback(n);
        //ѡ����з��� = null
        this._choiceCallback = null;
    }
};
//���ı�
Game_Message.prototype.hasText = function() {
	//���� �ı��� ���� > 0 
    return this._texts.length > 0;
};
//��ѡ��
Game_Message.prototype.isChoice = function() {
	//���� ѡ���� ���� > 0
    return this._choices.length > 0;
};
//����������
Game_Message.prototype.isNumberInput = function() {
	//���� �����������id > 0
    return this._numInputVariableId > 0;
};
//����Ʒѡ��
Game_Message.prototype.isItemChoice = function() {
    //���� ��Ʒѡ�����id > 0
    return this._itemChoiceVariableId > 0;
};
//��æµ
Game_Message.prototype.isBusy = function() {
	//���� ���ı� ���� ��ѡ�� ���� ���������� ���� ����Ʒѡ��
    return (this.hasText() || this.isChoice() ||
            this.isNumberInput() || this.isItemChoice());
};
//�¼�¼
Game_Message.prototype.newPage = function() {
	//��� �ı��� ���� > 0 
    if (this._texts.length > 0) {
	    //�ı���[�ı��� ���� - 1 ] += "\f"
        this._texts[this._texts.length - 1] += '\f';
    }
};
//�����ı�
Game_Message.prototype.allText = function() {
	//���� �ı��� ����( ����(֮ǰֵ,��ǰֵ)
    return this._texts.reduce(function(previousValue, currentValue) {
	    //{���� ֮ǰֵ + "\n" + ��ǰֵ } )
        return previousValue + '\n' + currentValue;
    });
};
