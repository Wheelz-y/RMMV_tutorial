
//-----------------------------------------------------------------------------
// Window_ShopSell
// �����̵���
// The window for selecting an item to sell on the shop screen.
// �̵껭��ѡ��һ����Ʒ���Ĵ���

function Window_ShopSell() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_ShopSell.prototype = Object.create(Window_ItemList.prototype);
//���ô�����
Window_ShopSell.prototype.constructor = Window_ShopSell;
//��ʼ��
Window_ShopSell.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
};
//������
Window_ShopSell.prototype.isEnabled = function(item) {
    return item && item.price > 0;
};
