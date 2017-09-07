
//-----------------------------------------------------------------------------
// AudioManager
// ��Ƶ������
// The static class that handles BGM, BGS, ME and SE.
// �����̬���� ���� bgm bgs me se

function AudioManager() {
    throw new Error('This is a static class');
}
// ��Ƶ������ bgm��С
AudioManager._bgmVolume      = 100;
// ��Ƶ������ bgs��С
AudioManager._bgsVolume      = 100;
// ��Ƶ������ me��С
AudioManager._meVolume       = 100;
// ��Ƶ������ se��С
AudioManager._seVolume       = 100;
// ��Ƶ������ ��ǰ��bgm
AudioManager._currentBgm     = null;
// ��Ƶ������ ��ǰ��bgs
AudioManager._currentBgs     = null;
// ��Ƶ������ bgm����
AudioManager._bgmBuffer      = null;
// ��Ƶ������ bgs����
AudioManager._bgsBuffer      = null;
// ��Ƶ������ me����
AudioManager._meBuffer       = null;
// ��Ƶ������ se����
AudioManager._seBuffers      = [];
// ��Ƶ������ ��̬����
AudioManager._staticBuffers  = [];
// ��Ƶ������ �ز�����ʱ��
AudioManager._replayFadeTime = 0.5;
// ��Ƶ������ ·��
AudioManager._path           = 'audio/';

// �������� bgmVolume
Object.defineProperty(AudioManager, 'bgmVolume', {
	//���
    get: function() {
	    //���� bgm��С
        return this._bgmVolume;
    },
    //����
    set: function(value) {
	    //bgm��С��Ϊ value
        this._bgmVolume = value;
        //����bgm����(��ǰ��bgm)
        this.updateBgmParameters(this._currentBgm);
    },
    //�����õ� :true
    configurable: true
});
// �������� bgsVolume
Object.defineProperty(AudioManager, 'bgsVolume', {
    //��� 
    get: function() () {
        return this._bgsVolume;
    },
    //���� 
    set: function() (value) {
        this._bgsVolume = value;
        this.updateBgsParameters(this._currentBgs);
    },
    //�����õ� :true 
    configurable: true
});

//�������� meVolume
Object.defineProperty(AudioManager, 'meVolume', {
    //��� 
    get: function() () {
        return this._meVolume;
    },
    //���� 
    set: function() (value) {
        this._meVolume = value;
        this.updateMeParameters(this._currentMe);
    },
    //�����õ� :true 
    configurable: true
});

//�������� seVolume
Object.defineProperty(AudioManager, 'seVolume', {
    //��� 
    get: function() () {
        return this._seVolume;
    },
    //���� 
    set: function() (value) {
        this._seVolume = value;
    },
    //�����õ� :true 
    configurable: true
});
//����bgm (bgm,λ��)
AudioManager.playBgm = function(bgm, pos) {
	//��� �ǵ�ǰ�� bgm
    if (this.isCurrentBgm(bgm)) {
	    //����bgm����
        this.updateBgmParameters(bgm);
    } else {
	    //ֹͣbgm
        this.stopBgm();
        //��� bgm������
        if (bgm.name) {
	        //bgm ���� ����Ϊ  ��������('bgm',bgm������)
            this._bgmBuffer = this.createBuffer('bgm', bgm.name);
            //����bgm����(bgm)
            this.updateBgmParameters(bgm);
            //��� ���� me����
            if (!this._meBuffer) {
	            //bgm���� ����(true,λ�� �� 0 )
                this._bgmBuffer.play(true, pos || 0);
            }
        }
    }
    //���µ�ǰ��bgm(bgm,λ��)
    this.updateCurrentBgm(bgm, pos);
};
//�ز�bgm(bgm)
AudioManager.replayBgm = function(bgm) {
	//��� �ǵ�ǰ��bgm
    if (this.isCurrentBgm(bgm)) {
	    //����bgm����(bgm)
        this.updateBgmParameters(bgm);
    } else {
	    //����bgm(bgm,bgm��λ��)
        this.playBgm(bgm, bgm.pos);
        //��� bgm����
        if (this._bgmBuffer) {
	        //bgm���� ����(�ز�����ʱ��)
            this._bgmBuffer.fadeIn(this._replayFadeTime);
        }
    }
};
//�ǵ�ǰ��bgm(bgm)
AudioManager.isCurrentBgm = function(bgm) {
	//���� ��ǰ��bgm ���� bgm���� ���� ��ǰ��bgm������ ȫ�� bgm������
    return (this._currentBgm && this._bgmBuffer &&
            this._currentBgm.name === bgm.name);
};
//����bgm����(bgm)
AudioManager.updateBgmParameters = function(bgm) {
	//���»������(bgm����,bgm��С,bgm)
    this.updateBufferParameters(this._bgmBuffer, this._bgmVolume, bgm);
};
//���µ�ǰ��bgm(bgm,λ��)
AudioManager.updateCurrentBgm = function(bgm, pos) {
	//��ǰ��bgm ��Ϊ
    this._currentBgm = {
	    //���� bgm������
        name: bgm.name,
        //��С bgm�Ĵ�С
        volume: bgm.volume,
        //���� bgm������
        pitch: bgm.pitch,
        //pan bgm��pan
        pan: bgm.pan,
        //λ�� λ��
        pos: pos
    };
};
//ֹͣbgm
AudioManager.stopBgm = function() {
	//��� bgm����
    if (this._bgmBuffer) {
	    //bgm���� ֹͣ
        this._bgmBuffer.stop();
        //bgm���� ��Ϊ null
        this._bgmBuffer = null;
        //��ǰ��bgm ��Ϊ null
        this._currentBgm = null;
    }
};
//����bgm(����ʱ��)
AudioManager.fadeOutBgm = function(duration) {
	//��� bgm���� ���� ��ǰ��bgm
    if (this._bgmBuffer && this._currentBgm) {
	    //bgm���� ����(����ʱ��)
        this._bgmBuffer.fadeOut(duration);
        //��ǰ��bgm ��Ϊ null
        this._currentBgm = null;
    }
};
//����bgm(����ʱ��)
AudioManager.fadeInBgm = function(duration) {
	//��� bgm���� ���� ��ǰ��bgm
    if (this._bgmBuffer && this._currentBgm) {
	    //bgm���� ����(����ʱ��)
        this._bgmBuffer.fadeIn(duration);
    }
};
//���� bgs (bgs,λ��)
AudioManager.playBgs = function(bgs, pos) {
	//��� �ǵ�ǰ�� bgs
    if (this.isCurrentBgs(bgs)) {
	    //����bgs����
        this.updateBgsParameters(bgs);
    } else {
	    //ֹͣbgs
        this.stopBgs();
        //��� bgs������
        if (bgs.name) {
	        //bgs ���� ����Ϊ  ��������('bgs',bgs������)
            this._bgsBuffer = this.createBuffer('bgs', bgs.name);
            //����bgs����(bgs)
            this.updateBgsParameters(bgs);
            //��� ���� me����
            if (!this._meBuffer) {
	            //bgs���� ����(true,λ�� �� 0 )
                this._bgsBuffer.play(true, pos || 0);
            }
        }
    }
    //���µ�ǰ��bgs(bgs,λ��)
    this.updateCurrentBgs(bgs, pos);
};
//�ز�bgs(bgs)
AudioManager.replayBgs = function(bgs) {
	//��� �ǵ�ǰ��bgs
    if (this.isCurrentBgs(bgs)) {
	    //����bgs����(bgs)
        this.updateBgsParameters(bgs);
    } else {
	    //����bgs(bgs,bgs��λ��)
        this.playBgs(bgs, bgs.pos);
        //��� bgs����
        if (this._bgsBuffer) {
	        //bgs���� ����(�ز�����ʱ��)
            this._bgsBuffer.fadeIn(this._replayFadeTime);
        }
    }
};
//�ǵ�ǰ��bgs(bgs)
AudioManager.isCurrentBgs = function(bgs) {
	//���� ��ǰ��bgs ���� bgs���� ���� ��ǰ��bgs������ ȫ���� bgs������
    return (this._currentBgs && this._bgsBuffer &&
            this._currentBgs.name === bgs.name);
};
//����bgs����(bgs)
AudioManager.updateBgsParameters = function(bgs) {
	//���»������(bgs����,bgs��С,bgs)
    this.updateBufferParameters(this._bgsBuffer, this._bgsVolume, bgs);
};
//���µ�ǰ��bgs(bgs,λ��)
AudioManager.updateCurrentBgs = function(bgs, pos) {
	//��ǰ��bgs ��Ϊ
    this._currentBgs = {
	    //���� bgs������
        name: bgs.name,
        //��С bgs�Ĵ�С
        volume: bgs.volume,
        //���� bgs������
        pitch: bgs.pitch,
        //pan bgs��pan
        pan: bgs.pan,
        //λ�� λ��
        pos: pos
    };
};
//ֹͣbgs
AudioManager.stopBgs = function() {
	//��� bgs����
    if (this._bgsBuffer) {
	    //bgs���� ֹͣ
        this._bgsBuffer.stop();
        //bgs���� ��Ϊ null
        this._bgsBuffer = null;
        //��ǰ��bgs ��Ϊ null
        this._currentBgs = null;
    }
};
//����bgs(����ʱ��)
AudioManager.fadeOutBgs = function(duration) {
	//��� bgs���� ���� ��ǰ��bgs
    if (this._bgsBuffer && this._currentBgs) {
	    //bgs���� ����(����ʱ��)
        this._bgsBuffer.fadeOut(duration);
        //��ǰ��bgs ��Ϊ null
        this._currentBgs = null;
    }
};
//����bgs(����ʱ��)
AudioManager.fadeInBgs = function(duration) {
	//��� bgs���� ���� ��ǰ��bgs
    if (this._bgsBuffer && this._currentBgs) {
	    //bgs���� ����(����ʱ��)
        this._bgsBuffer.fadeIn(duration);
    }
};
//����me
AudioManager.playMe = function(me) {
    this.stopMe();
    if (me.name) {
        if (this._bgmBuffer && this._currentBgm) {
            this._currentBgm.pos = this._bgmBuffer.seek();
            this._bgmBuffer.stop();
        }
        this._meBuffer = this.createBuffer('me', me.name);
        this.updateMeParameters(me);
        this._meBuffer.play(false);
        this._meBuffer.addStopListener(this.stopMe.bind(this));
    }
};
//����me����
AudioManager.updateMeParameters = function(me) {
    this.updateBufferParameters(this._meBuffer, this._meVolume, me);
};
//����me
AudioManager.fadeOutMe = function(duration) {
    if (this._meBuffer) {
        this._meBuffer.fadeOut(duration);
    }
};
//ֹͣme
AudioManager.stopMe = function() {
    if (this._meBuffer) {
        this._meBuffer.stop();
        this._meBuffer = null;
        if (this._bgmBuffer && this._currentBgm && !this._bgmBuffer.isPlaying()) {
            this._bgmBuffer.play(true, this._currentBgm.pos);
            this._bgmBuffer.fadeIn(this._replayFadeTime);
        }
    }
};
//����se
AudioManager.playSe = function(se) {
    if (se.name) {
        this._seBuffers = this._seBuffers.filter(function(audio) {
            return audio.isPlaying();
        });
        var buffer = this.createBuffer('se', se.name);
        this.updateSeParameters(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
    }
};
//����se����
AudioManager.updateSeParameters = function(buffer, se) {
    this.updateBufferParameters(buffer, this._seVolume, se);
};
//ֹͣse
AudioManager.stopSe = function() {
    this._seBuffers.forEach(function(buffer) {
        buffer.stop();
    });
    this._seBuffers = [];
};
//���ž�̬se(se)
AudioManager.playStaticSe = function(se) {
	//��� se������
    if (se.name) {
	    //��ȡ��̬se
        this.loadStaticSe(se);
        //ѭ�� ,i = 0 ,��� i< ��̬����ĳ� ,ÿ��i + 1
        for (var i = 0; i < this._staticBuffers.length; i++) {
	        // ����� ����Ϊ ��̬����[i]
            var buffer = this._staticBuffers[i];
            //��� ����� ����se���� ȫ���� se������
            if (buffer._reservedSeName === se.name) {
	            //�����ֹͣ
                buffer.stop();
                //����se����(�����,se)
                this.updateSeParameters(buffer, se);
                //����Ĳ���(false)
                buffer.play(false);
                break;
            }
        }
    }
};
//��ȡ��̬se(se)
AudioManager.loadStaticSe = function(se) {
	//��� se ������ ���� ���� �Ǿ�̬se
    if (se.name && !this.isStaticSe(se)) {
	    //����� ����Ϊ ���컺��("se",se������)
        var buffer = this.createBuffer('se', se.name);
        //����� ����se���� ����Ϊ se������
        buffer._reservedSeName = se.name;
        //��̬���� ��� �����
        this._staticBuffers.push(buffer);
        //��� ���õ�Html5Audio
        if (this.shouldUseHtml5Audio()) {
	        //Html5Audio ���þ�̬se(����� ��ַ)
            Html5Audio.setStaticSe(buffer._url);
        }
    }
};
//�Ǿ�̬se(se)
AudioManager.isStaticSe = function(se) {
	//ѭ�� ,i = 0 ,��� i< ��̬����ĳ� ,ÿ��i + 1
    for (var i = 0; i < this._staticBuffers.length; i++) {
	    //����� ����Ϊ ��̬�Ļ���[i]
        var buffer = this._staticBuffers[i];
        //��� ����� ����se���� ȫ���� se������
        if (buffer._reservedSeName === se.name) {
	        //���� true
            return true;
        }
    }
    //���� false
    return false;
};
//ֹͣ����
AudioManager.stopAll = function() {
    this.stopMe();
    this.stopBgm();
    this.stopBgs();
    this.stopSe();
};
//����bgm
AudioManager.saveBgm = function() {
	//��� ��ǰ��bgm
    if (this._currentBgm) {
        var bgm = this._currentBgm;
        return {
	        //���� bgm������
            name: bgm.name,
            //��С bgm�Ĵ�С
            volume: bgm.volume,
            //���� bgm������
            pitch: bgm.pitch,
            //pan bgm��pan
            pan: bgm.pan,
            //λ�� bgm���� ? bgm���� ���� : 0
            pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0
        };
    } else {
	    //���� ��������Ƶ����
        return this.makeEmptyAudioObject();
    }
};
//����bgs
AudioManager.saveBgs = function() {
    if (this._currentBgs) {
        var bgs = this._currentBgs;
        return {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: this._bgsBuffer ? this._bgsBuffer.seek() : 0
        };
    } else {
        return this.makeEmptyAudioObject();
    }
};
//��������Ƶ����
AudioManager.makeEmptyAudioObject = function() {
	//���� :"" ,��С 0 ,���� 0
    return { name: '', volume: 0, pitch: 0 };
};
//���컺�� (�ļ��� ,����)
AudioManager.createBuffer = function(folder, name) {
	//��ȡ ����Ϊ ��Ƶ�ļ���ȡ
    var ext = this.audioFileExt();
    //��ַ ����Ϊ ·�� + �ļ��� +"/" + ����(name) + ��ȡ
    var url = this._path + folder + '/' + encodeURIComponent(name) + ext;
    //��� ���õ�Html5Audio ���� �ļ��� ȫ���� bgm
    if (this.shouldUseHtml5Audio() && folder === 'bgm') {
	    //Html5Audio��װ(��ַ)
        Html5Audio.setup(url);
        //���� Html5Audio
        return Html5Audio;
    } else {
	    //����  WebAudio(url)
        return new WebAudio(url);
    }
};
//���»������(�����,��С,��Ƶ)
AudioManager.updateBufferParameters = function(buffer, configVolume, audio) {
    if (buffer && audio) {
	    //��������� ����Ϊ ��С * (��Ƶ��С �� 0) / 10000
        buffer.volume = configVolume * (audio.volume || 0) / 10000;
        //
        buffer.pitch = (audio.pitch || 0) / 100;
        buffer.pan = (audio.pan || 0) / 100;
    }
};
//��Ƶ�ļ���ȡ
AudioManager.audioFileExt = function() {
	//��� web��Ƶ ���Բ���ogg ���� ���� ���ƶ��豸
    if (WebAudio.canPlayOgg() && !Utils.isMobileDevice()) {
        return '.ogg';
    } else {
        return '.m4a';
    }
};
// ���õ�Html5Audio 
AudioManager.shouldUseHtml5Audio = function() {
    // We use HTML5 Audio to play BGM instead of Web Audio API
    // because decodeAudioData() is very slow on Android Chrome.
    //���� Utils ��AndroidChrome
    return Utils.isAndroidChrome();
};
//������
AudioManager.checkErrors = function() {
	//���web��Ƶ����
    this.checkWebAudioError(this._bgmBuffer);
    this.checkWebAudioError(this._bgsBuffer);
    this.checkWebAudioError(this._meBuffer);
    this._seBuffers.forEach(function(buffer) {
        this.checkWebAudioError(buffer);
    }.bind(this));
    this._staticBuffers.forEach(function(buffer) {
        this.checkWebAudioError(buffer);
    }.bind(this));
};
//���web��Ƶ����
AudioManager.checkWebAudioError = function(webAudio) {
	//��� webAudio ���� webAudio�Ǵ���
    if (webAudio && webAudio.isError()) {
	    //�׳� �´��� (��ȡ webAudio ʧ��)
        throw new Error('Failed to load: ' + webAudio.url);
    }
};
