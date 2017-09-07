
//-----------------------------------------------------------------------------
// SceneManager
// ����������
// The static class that manages scene transitions.
// �����̬���� ���� ����ת��

function SceneManager() {
    throw new Error('This is a static class');
}

//���� = null
SceneManager._scene             = null;
//��һ������ = null
SceneManager._nextScene         = null;
//�� = []
SceneManager._stack             = [];
//ֹͣ��
SceneManager._stopped           = false;
//������ʼ��
SceneManager._sceneStarted      = false;
SceneManager._exiting           = false;
SceneManager._previousClass     = null;
SceneManager._backgroundBitmap  = null;
SceneManager._screenWidth       = 816;
SceneManager._screenHeight      = 624;
SceneManager._boxWidth          = 816;
SceneManager._boxHeight         = 624;
//����
SceneManager.run = function(sceneClass) {
    try {
        this.initialize();
        this.goto(sceneClass);
        this.requestUpdate();
    } catch (e) {
        this.catchException(e);
    }
};
//��ʼ��
SceneManager.initialize = function() {
    this.initGraphics();
    this.checkFileAccess();
    this.initAudio();
    this.initInput();
    this.initNwjs();
    this.checkPluginErrors();
    this.setupErrorHandlers();
};
//��ʼ��ͼ��
SceneManager.initGraphics = function() {
    var type = this.preferableRendererType();
    Graphics.initialize(this._screenWidth, this._screenHeight, type);
    Graphics.boxWidth = this._boxWidth;
    Graphics.boxHeight = this._boxHeight;
    Graphics.setLoadingImage('img/system/Loading.png');
    if (Utils.isOptionValid('showfps')) {
        Graphics.showFps();
    }
    if (type === 'webgl') {
        this.checkWebGL();
    }
};
//��ȡ��Ⱦ������
SceneManager.preferableRendererType = function() {
	//��ѡ��������Ч
    if (Utils.isOptionValid('canvas')) {
        return 'canvas';
    } else if (Utils.isOptionValid('webgl')) {
        return 'webgl';
    } else if (this.shouldUseCanvasRenderer()) {
        return 'canvas';
    } else {
        return 'auto';
    }
};
//Ӧ��ʹ�û�����Ⱦ��
SceneManager.shouldUseCanvasRenderer = function() {
	//���ƶ��豸
    return Utils.isMobileDevice();
};
//����WebGL
SceneManager.checkWebGL = function() {
    if (!Graphics.hasWebGL()) {
        throw new Error('Your browser does not support WebGL.');
    }
};
//����ļ�����
SceneManager.checkFileAccess = function() {
    if (!Utils.canReadGameFiles()) {
        throw new Error('Your browser does not allow to read local files.');
    }
};
//��ʼ����Ƶ
SceneManager.initAudio = function() {
    var noAudio = Utils.isOptionValid('noaudio');
    if (!WebAudio.initialize(noAudio) && !noAudio) {
        throw new Error('Your browser does not support Web Audio API.');
    }
};
//��ʼ������
SceneManager.initInput = function() {
    Input.initialize();
    TouchInput.initialize();
};
//��ʼ��NW JS
SceneManager.initNwjs = function() {
    if (Utils.isNwjs()) {
        var gui = require('nw.gui');
        var win = gui.Window.get();
        if (process.platform === 'darwin' && !win.menu) {
            var menubar = new gui.Menu({ type: 'menubar' });
            var option = { hideEdit: true, hideWindow: true };
            menubar.createMacBuiltin('Game', option);
            win.menu = menubar;
        }
    }
};
//���������
SceneManager.checkPluginErrors = function() {
    PluginManager.checkErrors();
};
//���ô��������
SceneManager.setupErrorHandlers = function() {
    window.addEventListener('error', this.onError.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
};
//Ҫ�����
SceneManager.requestUpdate = function() {
	//��� ���� ֹͣ�� 
    if (!this._stopped) {
	    //���󶯻�֡ ( ���� ��(this))
        requestAnimationFrame(this.update.bind(this));
    }
};
//����
SceneManager.update = function() {
    try {
	    //��ǿ�ʼ
        this.tickStart();
        //������������
        this.updateInputData();
        //������Ҫ
        this.updateMain();
        //��ǽ���
        this.tickEnd();
    } catch (e) {
	    //��׽�쳣
        this.catchException(e);
    }
};
//��ֹ
SceneManager.terminate = function() {
    window.close();
};
//����ʱ
SceneManager.onError = function(e) {
    console.error(e.message);
    console.error(e.filename, e.lineno);
    try {
        this.stop();
        Graphics.printError('Error', e.message);
        AudioManager.stopAll();
    } catch (e2) {
    }
};
//�ڼ�����
SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 116:   // F5
            if (Utils.isNwjs()) {
                location.reload();
            }
            break;
        case 119:   // F8
            if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                require('nw.gui').Window.get().showDevTools();
            }
            break;
        }
    }
};
//��׽�쳣
SceneManager.catchException = function(e) {
    if (e instanceof Error) {
        Graphics.printError(e.name, e.message);
        console.error(e.stack);
    } else {
        Graphics.printError('UnknownError', e);
    }
    AudioManager.stopAll();
    this.stop();
};
//��ǿ�ʼ
SceneManager.tickStart = function() {
    Graphics.tickStart();
};
//��ǽ���
SceneManager.tickEnd = function() {
    Graphics.tickEnd();
};
//������������
SceneManager.updateInputData = function() {
    Input.update();
    TouchInput.update();
};
//������Ҫ
SceneManager.updateMain = function() {
    this.changeScene();
    this.updateScene();
    this.renderScene();
    this.requestUpdate();
};
//�ı䳡��
SceneManager.changeScene = function() {
	//��� �ǳ����ı��� ���� ���� �ǵ�ǰ������æ
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
	    //��� ���� (���� ����)
        if (this._scene) {
	        //���� ����
            this._scene.terminate();
            // ֮ǰ���� = ���� ������
            this._previousClass = this._scene.constructor;
        }
        //���� = ��һ������
        this._scene = this._nextScene;
        if (this._scene) {
	        //���� ����
            this._scene.create();
            //��һ������ = null
            this._nextScene = null;
            //������ʼ�� = false
            this._sceneStarted = false;
            //����������
            this.onSceneCreate();
        }
        //��� �˳���
        if (this._exiting) {
	        //����
            this.terminate();
        }
    }
};
//���³���
SceneManager.updateScene = function() {
	//��� ���� (���� ����)
    if (this._scene) {
	    //��� ���� ������ʼ�� ���� ���� ��׼����
        if (!this._sceneStarted && this._scene.isReady()) {
	        //���� ��ʼ
            this._scene.start();
            //������ʼ�� = true
            this._sceneStarted = true;
            //��������ʼ
            this.onSceneStart();
        }
        //��� �ǵ�ǰ�ĳ�����ʼ��
        if (this.isCurrentSceneStarted()) {
	        //���� ����
            this._scene.update();
        }
    }
};
//ת������
SceneManager.renderScene = function() {
    //��� �ǵ�ǰ�ĳ�����ʼ��
    if (this.isCurrentSceneStarted()) {
	    //ͼ�� ת��(����)
        Graphics.render(this._scene);
    //���� ��� ���� (��������)
    } else if (this._scene) {
	    //��������ȡ��
        this.onSceneLoading();
    }
};
//����������
SceneManager.onSceneCreate = function() {
	//ͼ�� ��ʼ��ȡ��
    Graphics.startLoading();
};
//��������ʼ
SceneManager.onSceneStart = function() {
	//ͼ�� ������ȡ��
    Graphics.endLoading();
};
//��������ȡ��
SceneManager.onSceneLoading = function() {
	//ͼ�� ���¶�ȡ��
    Graphics.updateLoading();
};
//�ǳ����ı���
SceneManager.isSceneChanging = function() {
	//���� �˳��� ���� !!��һ������ (��һ������ ���� true ���� false)
    return this._exiting || !!this._nextScene;
};
//�ǵ�ǰ����æµ
SceneManager.isCurrentSceneBusy = function() {
	//����  ���� (���� ����) ���� ���� �Ƿ�æ
    return this._scene && this._scene.isBusy();
};
//�ǵ�ǰ������ʼ��
SceneManager.isCurrentSceneStarted = function() {
	//���� ���� (��������) ���� ������ʼ�� 
    return this._scene && this._sceneStarted;
};
//����һ������
SceneManager.isNextScene = function(sceneClass) {
	//���� ��һ������ (��һ������ ����) ���� ��һ������ ������ === sceneClass
    return this._nextScene && this._nextScene.constructor === sceneClass;
};
//��֮ǰ����
SceneManager.isPreviousScene = function(sceneClass) {
	//���� ֮ǰ���� (֮ǰ���� ����) ���� ֮ǰ���� ������ === sceneClass
    return this._previousClass === sceneClass;
};
//ת��
SceneManager.goto = function(sceneClass) {
	//��� sceneClass������ (sceneClass������ ����)
    if (sceneClass) {
	    //��һ������ = �� sceneClass������()
        this._nextScene = new sceneClass();
    }
    //��� ���� (���� ����)
    if (this._scene) {
	    //���� ֹͣ
        this._scene.stop();
    }
};
//���
SceneManager.push = function(sceneClass) {
	//�� ��� (���� ������)
    this._stack.push(this._scene.constructor);
    //ת�� (sceneClass������)
    this.goto(sceneClass);
};
//ĩβ
SceneManager.pop = function() {
	//��� �� ���� > 0 
    if (this._stack.length > 0) {
	    //ת�� �� ���һ��(��ɾ��)
        this.goto(this._stack.pop());
    } else {
	    //�˳�
        this.exit();
    }
};
//�˳�
SceneManager.exit = function() {
	//ת�� null
    this.goto(null);
    //�˳��� = true
    this._exiting = true;
};
//�����
SceneManager.clearStack = function() {
	//�� = []
    this._stack = [];
};
//ֹͣ
SceneManager.stop = function() {
	//ֹͣ�� = true
    this._stopped = true;
};
//׼����һ������
SceneManager.prepareNextScene = function() {
	//��һ������ ׼�� Ӧ��(��һ�� ����,���� )
    this._nextScene.prepare.apply(this._nextScene, arguments);
};
//����
SceneManager.snap = function() {
	//���� ͼƬ ����(����)
    return Bitmap.snap(this._scene);
};
//����Ϊ�˱���
SceneManager.snapForBackground = function() {
	//����ͼƬ = ����
    this._backgroundBitmap = this.snap();
    //����ͼƬ ģ��
    this._backgroundBitmap.blur();
};
//����ͼƬ
SceneManager.backgroundBitmap = function() {
	//���� ����ͼƬ
    return this._backgroundBitmap;
};
