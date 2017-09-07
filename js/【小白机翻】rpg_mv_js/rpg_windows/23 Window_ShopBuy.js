
//-----------------------------------------------------------------------------
// Window_ShopBuy
// �����̵���
// The window for selecting an item to buy on the shop screen.
// �̵껭��ѡ������Ʒ�Ĵ���

function Window_ShopBuy() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_ShopBuy.prototype = Object.create(Window_Selectable.prototype);
//���ô�����
Window_ShopBuy.prototype.constructor = Window_ShopBuy;
//��ʼ��
Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods) {
    var width = this.windowWidth();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._shopGoods = shopGoods;
    this._money = 0;
    this.refresh();
    this.select(0);
};
//���ڿ�
Window_ShopBuy.prototype.windowWidth = function() {
    return 456;
};
//�����Ŀ
Window_ShopBuy.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//��Ŀ
Window_ShopBuy.prototype.item = function() {
    return this._data[this.index()];
};
//���ý�Ǯ
Window_ShopBuy.prototype.setMoney = function(money) {
    this._money = money;
    this.refresh();
};
//�ǵ�ǰ��Ŀ����
Window_ShopBuy.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};
//�۸�
Window_ShopBuy.prototype.price = function(item) {
    return this._price[this._data.indexOf(item)] || 0;
};
//������
Window_ShopBuy.prototype.isEnabled = function(item) {
    return (item && this.price(item) <= this._money &&
            !$gameParty.hasMaxItems(item));
};
//ˢ��
Window_ShopBuy.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//������Ŀ�б�
Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];
    this._shopGoods.forEach(function(goods) {
        var item = null;
        switch (goods[0]) {
        case 0:
            item = $dataItems[goods[1]];
            break;
        case 1:
            item = $dataWeapons[goods[1]];
            break;
        case 2:
            item = $dataArmors[goods[1]];
            break;
        }
        if (item) {
            this._data.push(item);
            this._price.push(goods[2] === 0 ? item.price : goods[3]);
        }
    }, this);
};
//������Ŀ
Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    this.drawText(this.price(item), rect.x + rect.width - priceWidth,
                  rect.y, priceWidth, 'right');
    this.changePaintOpacity(true);
};
//����״̬����
Window_ShopBuy.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};
//���°���
Window_ShopBuy.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setItem(this.item());
    }
};
