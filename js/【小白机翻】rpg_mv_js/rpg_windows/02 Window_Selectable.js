
//-----------------------------------------------------------------------------
// Window_Selectable
// ����ѡ��
// The window class with cursor movement and scroll functions.
// ����͹��������Ĵ�����

function Window_Selectable() {
    this.initialize.apply(this, arguments);
}

//����ԭ�� 
Window_Selectable.prototype = Object.create(Window_Base.prototype);
//���ô�����
Window_Selectable.prototype.constructor = Window_Selectable;
//��ʼ��
Window_Selectable.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._index = -1;
    this._cursorFixed = false;
    this._cursorAll = false;
    this._stayCount = 0;
    this._helpWindow = null;
    this._handlers = {};
    this._touching = false;
    this._scrollX = 0;
    this._scrollY = 0;
    this.deactivate();
};
//����
Window_Selectable.prototype.index = function() {
	//���� _index 
    return this._index;
};
//���̶�
Window_Selectable.prototype.cursorFixed = function() {
	//����  _cursorFixed
    return this._cursorFixed;
};
//���ù��̶�
Window_Selectable.prototype.setCursorFixed = function(cursorFixed) {
	// ���̶� _cursorFixed  ����Ϊ cursorFixed (true , false)
    this._cursorFixed = cursorFixed;
};
//�������
Window_Selectable.prototype.cursorAll = function() {
	//���� _cursorAll �������
    return this._cursorAll;
};
//���ù������
Window_Selectable.prototype.setCursorAll = function(cursorAll) {
	// ������� _cursorAll ����Ϊ cursorAll  (true , false)
    this._cursorAll = cursorAll;
};
//�������
Window_Selectable.prototype.maxCols = function() {
    return 1;
};
//�����Ŀ��
Window_Selectable.prototype.maxItems = function() {
    return 0;
};
//���
Window_Selectable.prototype.spacing = function() {
    return 12;
};
//��Ŀ��
Window_Selectable.prototype.itemWidth = function() {
    /** ʾ��: ȥ����, ��Ŀ3�� ���2��, �Ӽ�� ,������,�� ��Ŀ�� + ��� 
     *
     *  [                   ��                      ]
     *  [���][��Ŀ��][���][��Ŀ��][���][��Ŀ��][���]
     *
	 */
	// (�� - ���* 2 + ��� ) /  �������  - ���
    return Math.floor((this.width - this.padding * 2 +
                       this.spacing()) / this.maxCols() - this.spacing());
};
//��Ŀ��
Window_Selectable.prototype.itemHeight = function() {
	//�и�
    return this.lineHeight();
};
//�������
Window_Selectable.prototype.maxRows = function() {
	//(   (�����Ŀ��/�������)����ȡ�� , 1 )֮������
    return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
};
//ʹ�
Window_Selectable.prototype.activate = function() {
	//ʹ�� Window_Base �� ʹ� �ķ���
    Window_Base.prototype.activate.call(this);
    //��ѡ
    this.reselect();
};
//ʹ���
Window_Selectable.prototype.deactivate = function() {
	//ʹ�� Window_Base �� ʹ��� �ķ���
    Window_Base.prototype.deactivate.call(this);
    //����
    this.reselect();
};
//ѡ��
Window_Selectable.prototype.select = function(index) {
	// _���� ����Ϊ index
    this._index = index;
    //ͣ������ = 0 
    this._stayCount = 0;
    //ȷ�����ɼ�
    this.ensureCursorVisible();
    //���¹��
    this.updateCursor();
    //���и��°���
    this.callUpdateHelp();
};
//ȡ��
Window_Selectable.prototype.deselect = function() {
	//ѡ��(-1)
    this.select(-1);
};
//��ѡ
Window_Selectable.prototype.reselect = function() {
	//ѡ��  _index
    this.select(this._index);
};
//��  (��0��ʼ)
Window_Selectable.prototype.row = function() {
	//����/�������
    return Math.floor(this.index() / this.maxCols());
};
//������
Window_Selectable.prototype.topRow = function() {
	//����y / ��Ŀ��
    return Math.floor(this._scrollY / this.itemHeight());
};
//��󶥲���
Window_Selectable.prototype.maxTopRow = function() {
	/*  ʾ�� : ������� 7 ,���ҳ���� 3
	0
	1
	2
	3  
	4  0 ��󶥲���
	5  0
	6  0
	*/
	// (0  , ������� - ���ҳ����)  ������
    return Math.max(0, this.maxRows() - this.maxPageRows());
};
//���ö�����
Window_Selectable.prototype.setTopRow = function(row) {
	// scrollY =  row(0 - ��󶥲���)֮��� * ��Ŀ��
    var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
    //���  _scrollY  ������ scrollY  
    if (this._scrollY !== scrollY) {
	    // _scrollY ����Ϊ scrollY
        this._scrollY = scrollY;
        //ˢ��
        this.refresh();
        //���¹��
        this.updateCursor();
    }
};
//���¹���
Window_Selectable.prototype.resetScroll = function() {
	//���ö�����Ϊ0
    this.setTopRow(0);
};
//���ҳ����
Window_Selectable.prototype.maxPageRows = function() {
	// ҳ�� = ��- ��� *2
    var pageHeight = this.height - this.padding * 2;
    //ҳ��/��Ŀ��
    return Math.floor(pageHeight / this.itemHeight());
};
//���ҳ��Ŀ
Window_Selectable.prototype.maxPageItems = function() {
	//���ҳ���� * �������
    return this.maxPageRows() * this.maxCols();
};
//��ˮƽ
Window_Selectable.prototype.isHorizontal = function() {
	//���� ���ҳ���� === 1 (ֻ��һ��)
    return this.maxPageRows() === 1;
};
//�ײ���
Window_Selectable.prototype.bottomRow = function() {
	/*  ʾ�� : ������ 2 ,���ҳ���� 3
	0
	1 
	2 0 ������   2  , 2 + 3 - 1 = 4 
	3 0 
	4 0 �ײ���   4  , 4 - (3 - 1) = 2
	5 
	*/
	// (0 , ������ + ���ҳ���� -1)����
    return Math.max(0, this.topRow() + this.maxPageRows() - 1);
};
//���õײ���
Window_Selectable.prototype.setBottomRow = function(row) {
	//���ö�����(row - (ҳ���� - 1) )
    this.setTopRow(row - (this.maxPageRows() - 1));
};
//��������
Window_Selectable.prototype.topIndex = function() {
	/**ʾ�� : ����� 3
	*  [0]  0 1 2 
	*  [1]  3 4 5
	*  [2]  6 7 8
    *  [3]  9
	*/
	//���� ������*�����
    return this.topRow() * this.maxCols();
};
//��Ŀ����
Window_Selectable.prototype.itemRect = function(index) {
	//�����¾���
    var rect = new Rectangle();
    //������� 
    var maxCols = this.maxCols();
    //���ο� = ��Ŀ��
    rect.width = this.itemWidth();
    //���θ� = ��Ŀ��
    rect.height = this.itemHeight();
    //����x =  ������������������� * (���ο�+���) - ����x
    rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    //����y =  ����/ �������  * ���θ� - ����y
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    //���ؾ���
    return rect;
};
//��Ŀ����Ϊ���ı�
Window_Selectable.prototype.itemRectForText = function(index) {
	//����
    var rect = this.itemRect(index);
    //����x + �ı����
    rect.x += this.textPadding();
    //���ο� - 2 �ı����
    rect.width -= this.textPadding() * 2;
    /* ʾ��: 
    *   [               ����              ]
    *   [�ı����][     �ı�    ][�ı����]
    */
    //���ؾ���
    return rect;
};
//���ð�������
Window_Selectable.prototype.setHelpWindow = function(helpWindow) {
	//�������� __helpWindow ����Ϊ helpWindow
    this._helpWindow = helpWindow;
    //���и��°���
    this.callUpdateHelp();
};
//��ʾ��������
Window_Selectable.prototype.showHelpWindow = function() {
	//����������ڴ���
    if (this._helpWindow) {
	    //����������ʾ
        this._helpWindow.show();
    }
};
//���ذ�������
Window_Selectable.prototype.hideHelpWindow = function() {
	//����������ڴ���
    if (this._helpWindow) {
	    //����������ʾ
        this._helpWindow.hide();
    }
};
//���ô���
Window_Selectable.prototype.setHandler = function(symbol, method) {
	// _handlers[ symbol ����] = method ����
    this._handlers[symbol] = method;
};
//�Ǵ���?
Window_Selectable.prototype.isHandled = function(symbol) {
	//����  _handlers[ symbol ����]
    return !!this._handlers[symbol];
};
//���д���
Window_Selectable.prototype.callHandler = function(symbol) {
	//��� _handlers[symbol] ����
    if (this.isHandled(symbol)) {
	    //���� _handlers[symbol]
        this._handlers[symbol]();
    }
};
//�Ǵ򿪺ͻ��
Window_Selectable.prototype.isOpenAndActive = function() {
	//���� (�Ǵ� ���� �)
    return this.isOpen() && this.active;
};
//�ǹ�����ƶ�
Window_Selectable.prototype.isCursorMovable = function() {
	//����  (�Ǵ򿪺ͻ��) ���� (���� ���̶�) ���� (���� ������� ) ���� �����Ŀ�� > 0
    return (this.isOpenAndActive() && !this._cursorFixed &&
            !this._cursorAll && this.maxItems() > 0);
};
//�����
Window_Selectable.prototype.cursorDown = function(wrap) {
	//����
    var index = this.index();
    //�����Ŀ
    var maxItems = this.maxItems();
    //�����
    var maxCols = this.maxCols();
    //��� ����С�� �����Ŀ��-������� �� (wrap �� ����� == 1)
    //   ������� 3 �����Ŀ�� 7 
    //   0 1 2 
    //   3 4 5 
    //   6
    // ������ С�� 4
    //   ���Ծ��� ��������Ŀ ʱ,����  ֻ��һ��ʱ
    if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
	    //ѡ�� (���� + �����) �� �����Ŀ�� ������
	    //����һ��  ,ֻ��һ��ʱѭ��
        this.select((index + maxCols) % maxItems);
    }
};

//�����
Window_Selectable.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();    
    //��� ���� ���ڵ��� �����Ŀ��-������� �� (wrap �� ����� == 1)
    //  ������� 3 �����Ŀ�� 7 
    //   0 1 2 
    //   3 4 5 
    //   6
    //  ������ ���ڵ��� 3
    //���Ծ��� ��������Ŀ ʱ,����  ֻ��һ��ʱ
    if (index >= maxCols || (wrap && maxCols === 1)) {
	    //ѡ�� (���� - ����� + �����Ŀ��) �� �����Ŀ���� ����
	    //����һ��  ,ֻ��һ��ʱѭ��
        this.select((index - maxCols + maxItems) % maxItems);
    }
};
//�����
Window_Selectable.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
        this.select((index + 1) % maxItems);
    }
};
//�����
Window_Selectable.prototype.cursorLeft = function(wrap) {
	//����
    var index = this.index();
    //�����Ŀ��
    var maxItems = this.maxItems();
    //�������
    var maxCols = this.maxCols();
    // ������� >=2  ���� (����>0 ��  ( wrap ���� ��ˮƽ��) )
    if (maxCols >= 2 && (index > 0 || ( wrap && this.isHorizontal()))) {
	    //ѡ�� (����-1 + �����Ŀ��) �������Ŀ�� ������
        this.select((index - 1 + maxItems) % maxItems);
    }
};
//�����ҳ
Window_Selectable.prototype.cursorPagedown = function() {
    var index = this.index();
    var maxItems = this.maxItems();
    if (this.topRow() + this.maxPageRows() < this.maxRows()) {
        this.setTopRow(this.topRow() + this.maxPageRows());
        this.select(Math.min(index + this.maxPageItems(), maxItems - 1));
    }
};
//�����ҳ
Window_Selectable.prototype.cursorPageup = function() {
    var index = this.index();
    if (this.topRow() > 0) {
        this.setTopRow(this.topRow() - this.maxPageRows());
        this.select(Math.max(index - this.maxPageItems(), 0));
    }
};
//������
Window_Selectable.prototype.scrollDown = function() {
    if (this.topRow() + 1 < this.maxRows()) {
        this.setTopRow(this.topRow() + 1);
    }
};
//������
Window_Selectable.prototype.scrollUp = function() {
    if (this.topRow() > 0) {
        this.setTopRow(this.topRow() - 1);
    }
};
//����
Window_Selectable.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    //���¼�ͷ
    this.updateArrows();
    //�������ƶ�
    this.processCursorMove();
    //��������
    this.processHandling();
    //�������
    this.processWheel();
    //������
    this.processTouch();
    //ͣ������
    this._stayCount++;
};
//���¼�ͷ
Window_Selectable.prototype.updateArrows = function() {
    var topRow = this.topRow();
    var maxTopRow = this.maxTopRow();
    this.downArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
    this.upArrowVisible = topRow > 0;
};
//���� ����ƶ�
Window_Selectable.prototype.processCursorMove = function() {
	//���������ƶ�
    if (this.isCursorMovable()) {
	    //��������
        var lastIndex = this.index();
        //���ظ� down
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        //���ظ� up
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        //���ظ� right
        if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        }
        //���ظ� left
        if (Input.isRepeated('left')) {
	        //�����
            this.cursorLeft(Input.isTriggered('left'));
        }
        //��pagedown������ �����ڲ��Ұ��� pagedown
        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        }
        //��pageup�����߲����ڲ��Ұ��� pageup
        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }
        //��� ���� ������ ��������
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};
//���� ����
Window_Selectable.prototype.processHandling = function() {
	//��� �Ǵ򿪺ͻ��
    if (this.isOpenAndActive()) {
	    //��� ������ȷ�� ���� �� ȷ��������
        if (this.isOkEnabled() && this.isOkTriggered()) {
	        //����ȷ��
            this.processOk();
	    //��� ������ȡ�� ���� �� ȡ��������
        } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
	        //����ȡ��
            this.processCancel();	    
        //��� �Ǵ�����pagedown  ���� �� pagedown ����
        } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.processPagedown();
        //��� �Ǵ�����pageup����  ���� �� pageup ����
        } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.processPageup();
        }
    }
};
//���� ת��
Window_Selectable.prototype.processWheel = function() {
	//�Ǵ򿪺ͻ��
    if (this.isOpenAndActive()) {
	    //�ٽ�ֵ=20
        var threshold = 20;
        //�������y >= �ٽ�
        if (TouchInput.wheelY >= threshold) {
            this.scrollDown();
        }
        //�������y <= -�ٽ�
        if (TouchInput.wheelY <= -threshold) {
            this.scrollUp();
        }
    }
};
//������
Window_Selectable.prototype.processTouch = function() {
	//��� �Ǵ򿪺ͻ��
    if (this.isOpenAndActive()) {
	    //�������밴�� �����ڿ���
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
	        //����=true
            this._touching = true;
            //������
            this.onTouch(true);
         //��� ������ȡ��
        } else if (TouchInput.isCancelled()) {
	        //��ȡ������
            if (this.isCancelEnabled()) {
	            //����ȡ��
                this.processCancel();
            }
        }
        //��� ����
        if (this._touching) {
	        //��� �ǰ���
            if (TouchInput.isPressed()) {
	            //������
                this.onTouch(false);
            } else {
	            //���� _touching =false
                this._touching = false;
            }
        }
    } else {
	    //���� _touching =false
        this._touching = false;
    }
};
//�Ǵ����ڲ���
Window_Selectable.prototype.isTouchedInsideFrame = function() {
	//x=�ֲ�x
    var x = this.canvasToLocalX(TouchInput.x);
    //y=�ֲ�y
    var y = this.canvasToLocalY(TouchInput.y);
    //���� x,y �ڿ���
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};
//������
Window_Selectable.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    //�ֲ�x
    var x = this.canvasToLocalX(TouchInput.x);
    //�ֲ�y
    var y = this.canvasToLocalY(TouchInput.y);
    //���������
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
	    //������� === ����
        if (hitIndex === this.index()) {
	        //  triggered ���� ��������
            if (triggered && this.isTouchOkEnabled()) {
	            //����ȷ��
                this.processOk();
            }
        //��� �ǹ���ƶ�����
        } else if (this.isCursorMovable()) {
	        //ѡ�� �������
            this.select(hitIndex);
        }
    //��� ͣ��ʱ�� >= 10
    } else if (this._stayCount >= 10) {
	    // y< ���
        if (y < this.padding) {
	        //�����
            this.cursorUp();
        // y>= ��-���
        } else if (y >= this.height - this.padding) {
	        //�����
            this.cursorDown();
        }
    }
    //���� !== ��������
    if (this.index() !== lastIndex) {
	    //���Ź��
        SoundManager.playCursor();
    }
};
//�������
Window_Selectable.prototype.hitTest = function(x, y) {
	//�������������(x,y)
    if (this.isContentsArea(x, y)) {
	    //cx= x - ���
        var cx = x - this.padding;
        //cy= y - ���
        var cy = y - this.padding;
        //��������
        var topIndex = this.topIndex();
        //ѭ����0-���ҳ��Ŀ
        for (var i = 0; i < this.maxPageItems(); i++) {
	        //����
            var index = topIndex + i;
            //�������С�������Ŀ��
            if (index < this.maxItems()) {
	            //������Ŀ�ľ���
                var rect = this.itemRect(index);
                //�Ҳ�
                var right = rect.x + rect.width;
                //�ײ�
                var bottom = rect.y + rect.height;
                //cx cy �ھ�����
                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
	                //��������
                    return index;
                }
            }
        }
    }
    //����-1
    return -1;
};
//����������
Window_Selectable.prototype.isContentsArea = function(x, y) {
	//��=���
    var left = this.padding;
    //��=���
    var top = this.padding;
    //��= ��-���
    var right = this.width - this.padding;
    //��= ��-���
    var bottom = this.height - this.padding;
    //�ڴ�����
    return (x >= left && y >= top && x < right && y < bottom);
};
//�Ǵ����ܹ�ȷ��
Window_Selectable.prototype.isTouchOkEnabled = function() {
	//��ȷ������
    return this.isOkEnabled();
};
//���ܹ�ȷ��
Window_Selectable.prototype.isOkEnabled = function() {
	//���� �Ǵ�����ok
    return this.isHandled('ok');
};
//���ܹ�ȡ��
Window_Selectable.prototype.isCancelEnabled = function() {
	//���� �Ǵ�����cancel
    return this.isHandled('cancel');
};
//��ȷ������
Window_Selectable.prototype.isOkTriggered = function() {
	//���ظ� ok
    return Input.isRepeated('ok');
};
//��ȡ������
Window_Selectable.prototype.isCancelTriggered = function() {
	//���ظ�cancel
    return Input.isRepeated('cancel');
};
//���� ȷ��
Window_Selectable.prototype.processOk = function() {
	//�ǵ�ǰ��Ŀ����
    if (this.isCurrentItemEnabled()) {
	    //����ȷ������
        this.playOkSound();
        //������������
        this.updateInputData();
        //����
        this.deactivate();
        //����ȷ��������
        this.callOkHandler();
    } else {
	    //���ŷ���������
        this.playBuzzerSound();
    }
};
//���� ȷ������
Window_Selectable.prototype.playOkSound = function() {
	//����ȷ������
    SoundManager.playOk();
};
//���ŷ���������
Window_Selectable.prototype.playBuzzerSound = function() {
	//���ŷ���������
    SoundManager.playBuzzer();
};
//����ȷ������
Window_Selectable.prototype.callOkHandler = function() {
	//���д�����ok
    this.callHandler('ok');
};
//����ȡ��
Window_Selectable.prototype.processCancel = function() {
	//����ȡ��
    SoundManager.playCancel();
    //������������
    this.updateInputData();
    //����
    this.deactivate();
    //����ȡ������
    this.callCancelHandler();
};
//����ȡ������
Window_Selectable.prototype.callCancelHandler = function() {
	//���д�����cancel
    this.callHandler('cancel');
};
//������ҳ
Window_Selectable.prototype.processPageup = function() {
	//���Ź��
    SoundManager.playCursor();
    //������������
    this.updateInputData();
    //����
    this.deactivate();
    //���д���pageup
    this.callHandler('pageup');
};
//������ҳ
Window_Selectable.prototype.processPagedown = function() {
	//���Ź��
    SoundManager.playCursor();
    //������������
    this.updateInputData();
    //����
    this.deactivate();
    //���д���pagedown
    this.callHandler('pagedown');
};
//������������
Window_Selectable.prototype.updateInputData = function() {
	//�������
    Input.update();
    //�����������
    TouchInput.update();
};
//���¹��
Window_Selectable.prototype.updateCursor = function() {
	//����������
    if (this._cursorAll) {
	    //�����и� = ������� * ��Ŀ��
        var allRowsHeight = this.maxRows() * this.itemHeight();
        //���ù�����(0,0,���ݿ�,�����и�)
        this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
        //���ö�����(0)
        this.setTopRow(0);
    } else if (this.isCursorVisible()) {
	    //���� = ��Ŀ����(����)
        var rect = this.itemRect(this.index());
        //���ù�����(����x,����y,���ο�,���θ�)
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
	    //���ù��(0,0,0,0)
        this.setCursorRect(0, 0, 0, 0);
    }
};
//�ǹ��ɼ�
Window_Selectable.prototype.isCursorVisible = function() {
	//��
    var row = this.row();
    //����  ��>= ������ ���� �� <=�ײ���
    return row >= this.topRow() && row <= this.bottomRow();
};
//ȷ�����ɼ�
Window_Selectable.prototype.ensureCursorVisible = function() {
	//��
    var row = this.row();
    //��� ��<������
    if (row < this.topRow()) {
	    //���ö�����
        this.setTopRow(row);
        //��� ��>�ײ���
    } else if (row > this.bottomRow()) {
	    //���õײ���
        this.setBottomRow(row);
    }
};
//���� ���°���
Window_Selectable.prototype.callUpdateHelp = function() {
	//��� ����� ��������
    if (this.active && this._helpWindow) {
	    //���°�������
        this.updateHelp();
    }
};
//���°���
Window_Selectable.prototype.updateHelp = function() {
	//�����������
    this._helpWindow.clear();
};
//���ð���������Ŀ
Window_Selectable.prototype.setHelpWindowItem = function(item) {
	//�����������
    if (this._helpWindow) {
	    //������������
        this._helpWindow.setItem(item);
    }
};
//�ǵ�ǰ��Ŀ����
Window_Selectable.prototype.isCurrentItemEnabled = function() {
    return true;
};
//����������Ŀ
Window_Selectable.prototype.drawAllItems = function() {
	//������Ŀ
    var topIndex = this.topIndex();
    //ѭ����0�� ���ҳ��Ŀ��
    for (var i = 0; i < this.maxPageItems(); i++) {
	    //����
        var index = topIndex + i;
        //�������С�������Ŀ
        if (index < this.maxItems()) {
	        //������Ŀ
            this.drawItem(index);
        }
    }
};
//������Ŀ
Window_Selectable.prototype.drawItem = function(index) {
};
//�����Ŀ
Window_Selectable.prototype.clearItem = function(index) {
	//����=��Ŀ����
    var rect = this.itemRect(index);
    //�����������
    this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
};
//�ػ���Ŀ
Window_Selectable.prototype.redrawItem = function(index) {
    if (index >= 0) {
	    //�����Ŀ
        this.clearItem(index);
        //������Ŀ
        this.drawItem(index);
    }
};
//�ػ�����Ŀ
Window_Selectable.prototype.redrawCurrentItem = function() {
	//�ػ���Ŀ
    this.redrawItem(this.index());
};
//ˢ��
Window_Selectable.prototype.refresh = function() {
	//�������
    if (this.contents) {
	    //�������
        this.contents.clear();
        //����������Ŀ
        this.drawAllItems();
    }
};
