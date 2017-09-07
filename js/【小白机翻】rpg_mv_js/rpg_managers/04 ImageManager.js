
//-----------------------------------------------------------------------------
// ImageManager
// ͼ�������
// The static class that loads images, creates bitmap objects and retains them.
// �����̬���� ��ȡ ͼ�� ����ͼƬ���� �� ��������

function ImageManager() {
    throw new Error('This is a static class');
}
//����
ImageManager._cache = {};

//��ȡ����
ImageManager.loadAnimation = function(filename, hue) {
    return this.loadBitmap('img/animations/', filename, hue, true);
};

//��ȡս������1
ImageManager.loadBattleback1 = function(filename, hue) {
    return this.loadBitmap('img/battlebacks1/', filename, hue, true);
};
//��ȡս������2
ImageManager.loadBattleback2 = function(filename, hue) {
    return this.loadBitmap('img/battlebacks2/', filename, hue, true);
};
//��ȡ����
ImageManager.loadEnemy = function(filename, hue) {
    return this.loadBitmap('img/enemies/', filename, hue, true);
};
//��ȡ����ͼ
ImageManager.loadCharacter = function(filename, hue) {
    return this.loadBitmap('img/characters/', filename, hue, false);
};
//��ȡ��ͼ
ImageManager.loadFace = function(filename, hue) {
    return this.loadBitmap('img/faces/', filename, hue, true);
};
//��ȡԶ��ͼ
ImageManager.loadParallax = function(filename, hue) {
    return this.loadBitmap('img/parallaxes/', filename, hue, true);
};
//��ȡͼƬ
ImageManager.loadPicture = function(filename, hue) {
    return this.loadBitmap('img/pictures/', filename, hue, true);
};
//��ȡsv��ɫ
ImageManager.loadSvActor = function(filename, hue) {
    return this.loadBitmap('img/sv_actors/', filename, hue, false);
};
//��ȡsv����
ImageManager.loadSvEnemy = function(filename, hue) {
    return this.loadBitmap('img/sv_enemies/', filename, hue, true);
};
//��ȡϵͳ
ImageManager.loadSystem = function(filename, hue) {
    return this.loadBitmap('img/system/', filename, hue, false);
};
//��ȡͼ����
ImageManager.loadTileset = function(filename, hue) {
    return this.loadBitmap('img/tilesets/', filename, hue, false);
};
//��ȡ���⻭��1
ImageManager.loadTitle1 = function(filename, hue) {
    return this.loadBitmap('img/titles1/', filename, hue, true);
};
//��ȡ���⻭��2
ImageManager.loadTitle2 = function(filename, hue) {
    return this.loadBitmap('img/titles2/', filename, hue, true);
};
//��ȡͼƬ
ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
	//����ļ�����
    if (filename) {
	    //λ��
        var path = folder + encodeURIComponent(filename) + '.png';
        //λͼ =��ȡ��ͨλͼ(λ��,ɫ��)
        var bitmap = this.loadNormalBitmap(path, hue || 0);
        //λͼƽ��
        bitmap.smooth = smooth;
        //���� λͼ
        return bitmap;
    } else {
	    //���� ��ȡ�հ�ͼƬ
        return this.loadEmptyBitmap();
    }
};
//��ȡ��ͼƬ
ImageManager.loadEmptyBitmap = function() {
    if (!this._cache[null]) {
        this._cache[null] = new Bitmap();
    }
    return this._cache[null];
};
//��ȡ����ͼƬ
ImageManager.loadNormalBitmap = function(path, hue) {
    var key = path + ':' + hue;
    if (!this._cache[key]) {
        var bitmap = Bitmap.load(path);
        //��Ӷ�ȡ����
        bitmap.addLoadListener(function() {
	        //ɫ��ת��
            bitmap.rotateHue(hue);
        });
        this._cache[key] = bitmap;
    }
    return this._cache[key];
};
//���
ImageManager.clear = function() {
    this._cache = {};
};
//��׼����
ImageManager.isReady = function() {
    for (var key in this._cache) {
        var bitmap = this._cache[key];
        if (bitmap.isError()) {
            throw new Error('Failed to load: ' + bitmap.url);
        }
        if (!bitmap.isReady()) {
            return false;
        }
    }
    return true;
};
//����������
ImageManager.isObjectCharacter = function(filename) {
    var sign = filename.match(/^[\!\$]+/);
    return sign && sign[0].contains('!');
};
//�Ǵ�����
ImageManager.isBigCharacter = function(filename) {
    var sign = filename.match(/^[\!\$]+/);
    return sign && sign[0].contains('$');
};
//��0�Ӳ�
ImageManager.isZeroParallax = function(filename) {
    return filename.charAt(0) === '!';
};
