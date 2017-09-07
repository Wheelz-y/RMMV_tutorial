
//-----------------------------------------------------------------------------
// StorageManager
// �洢������
// The static class that manages storage for saving game data.
// �����̬���� ����洢 ������Ϸ����

function StorageManager() {
    throw new Error('This is a static class');
}

//����
StorageManager.save = function(savefileId, json) {
	//��� �Ǳ���ģʽ
    if (this.isLocalMode()) {
	    //���浽�����ļ�
        this.saveToLocalFile(savefileId, json);
    } else {
	    //���浽����洢
        this.saveToWebStorage(savefileId, json);
    }
};
//��ȡ
StorageManager.load = function(savefileId) {
	//��� �Ǳ���ģʽ
    if (this.isLocalMode()) {
	    // ��ȡ�ӱ����ļ�
        return this.loadFromLocalFile(savefileId);
    } else {
	    // ��ȡ������洢
        return this.loadFromWebStorage(savefileId);
    }
};
//���� 
StorageManager.exists = function(savefileId) {
	//��� �Ǳ���ģʽ
    if (this.isLocalMode()) {
	    //�����ļ�����
        return this.localFileExists(savefileId);
    } else {
	    //����洢����
        return this.webStorageExists(savefileId);
    }
};
//ɾ��
StorageManager.remove = function(savefileId) {
	//��� �Ǳ���ģʽ
    if (this.isLocalMode()) {
	    //ɾ�������ļ�
        this.removeLocalFile(savefileId);
    } else {
	    //ɾ������洢
        this.removeWebStorage(savefileId);
    }
};
//�Ǳ���ģʽ
StorageManager.isLocalMode = function() {
	//Utils��Nwjs
    return Utils.isNwjs();
};
//���浽�����ļ�
StorageManager.saveToLocalFile = function(savefileId, json) {
	// data ����Ϊ LZString��ѹ������׼64(json)
    var data = LZString.compressToBase64(json);
    // ʹ��fs�ķ���
    var fs = require('fs');
    // Ŀ¼·�� ����Ϊ �����ļ�Ŀ¼·��
    var dirPath = this.localFileDirectoryPath();
    // �ļ�·�� ����Ϊ �����ļ�·��(savefileId)
    var filePath = this.localFilePath(savefileId);
    //��� ���� ����ļ�����(Ŀ¼·��)
    if (!fs.existsSync(dirPath)) {
	    //���� Ŀ¼·��
        fs.mkdirSync(dirPath);
    }
    //д���ļ�(�ļ�·��,data)
    fs.writeFileSync(filePath, data);
};
//��ȡ�ӱ����ļ�
StorageManager.loadFromLocalFile = function(savefileId) {
	//data ��Ϊ null
    var data = null;
    // ʹ��fs�ķ���
    var fs = require('fs');
    // �ļ�·�� ����Ϊ �����ļ�·��(savefileId)
    var filePath = this.localFilePath(savefileId);
    //��� ����ļ�����(�ļ�·��)
    if (fs.existsSync(filePath)) {
	    //data ����Ϊ ��ȡ�ļ�(�ļ�·��,{����:utf8})
        data = fs.readFileSync(filePath, { encoding: 'utf8' });
    }
    //���� LZString�Ľ�ѹ�ӻ���64(data)
    return LZString.decompressFromBase64(data);
};
//�����ļ�����
StorageManager.localFileExists = function(savefileId) {
	// ʹ��fs�ķ���
    var fs = require('fs');
    //���� ����ļ�����(�����ļ�·��(savefileId))
    return fs.existsSync(this.localFilePath(savefileId));
};
//ɾ�������ļ�
StorageManager.removeLocalFile = function(savefileId) {
	// ʹ��fs�ķ���
    var fs = require('fs');
    // �ļ�·�� ����Ϊ �����ļ�·��(savefileId)
    var filePath = this.localFilePath(savefileId);
    //��� ����ļ�����(�ļ�·��)
    if (fs.existsSync(filePath)) {
	    //ɾ���ļ�(�ļ�·��)
        fs.unlinkSync(filePath);
    }
};
//���浽����洢
StorageManager.saveToWebStorage = function(savefileId, json) {
	//������Ϊ ����洢��(savefileId)
    var key = this.webStorageKey(savefileId);
    // data ����Ϊ  LZString��ѹ������׼64(json)
    var data = LZString.compressToBase64(json);
    //û��ʱ�����Ƶ����ݴ洢 ������Ŀ(��,data)
    localStorage.setItem(key, data);
};
//��ȡ������洢
StorageManager.loadFromWebStorage = function(savefileId) {
	//������Ϊ ����洢��(savefileId)
    var key = this.webStorageKey(savefileId);
    //data ����Ϊ û��ʱ�����Ƶ����ݴ洢 ��ȡ��Ŀ(key)
    var data = localStorage.getItem(key);
    //���� LZString�Ľ�ѹ�ӻ���64(data)
    return LZString.decompressFromBase64(data);
};
//����洢����
StorageManager.webStorageExists = function(savefileId) {
	//�� ����Ϊ ����洢��(savefileId)
    var key = this.webStorageKey(savefileId);
    // ���� û��ʱ�����Ƶ����ݴ洢 ��ȡ��Ŀ(key) �Ĳ���ֵ
    return !!localStorage.getItem(key);
};
//ɾ������洢
StorageManager.removeWebStorage = function(savefileId) {
	//�� ����Ϊ ����洢��(savefileId)
    var key = this.webStorageKey(savefileId);
    //û��ʱ�����Ƶ����ݴ洢 ɾ����Ŀ(key) 
    localStorage.removeItem(key);
};
//�����ļ�Ŀ¼·��
StorageManager.localFileDirectoryPath = function() {
	//·�� ����Ϊ ���� λ�� �� ·������ �� /www/��֮�� ����Ϊ save/   (����)
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/save/');
    //·�� �Ƚ� (������ʽʲô����ȫ����)
    if (path.match(/^\/([A-Z]\:)/)) {
	    //����Ϊ ��Ƭ(1)
        path = path.slice(1);
    }
    //���� ����(·��)
    return decodeURIComponent(path);
};
//�����ļ�·��
StorageManager.localFilePath = function(savefileId) {
    var name;
    if (savefileId < 0) {
        name = 'config.rpgsave';
    } else if (savefileId === 0) {
        name = 'global.rpgsave';
    } else {
        name = 'file%1.rpgsave'.format(savefileId);
    }
    return this.localFileDirectoryPath() + name;
};
//����洢��
StorageManager.webStorageKey = function(savefileId) {
	//��� savefileId < 0 
    if (savefileId < 0) {
	    //���� rpg ����
        return 'RPG Config';
        //��� savefileId ȫ����0
    } else if (savefileId === 0) {
	    //���� rpg ����
        return 'RPG Global';
    } else {
	    //���� rpg file + savefileId
        return 'RPG File%1'.format(savefileId);
    }
};

/*
=======================================================================================================
=======================================================================================================
���索��Ĳ���
ת������

localStorage��sessionStorage����
localStorage��sessionStorage��������ͬ�Ĳ�������������setItem��getItem��removeItem��
localStorage��sessionStorage�ķ�����
setItem�洢value
��;����value�洢��key�ֶ�
�÷���.setItem( key, value)
����ʾ����

���ƴ����������:
sessionStorage.setItem("key", "value");
localStorage.setItem("site", "js8.in");

getItem��ȡvalue
��;����ȡָ��key���ش洢��ֵ
�÷���.getItem(key)
����ʾ����

���ƴ����������:
var value = sessionStorage.getItem("key"); 
var site = localStorage.getItem("site");

removeItemɾ��key
��;��ɾ��ָ��key���ش洢��ֵ
�÷���.removeItem(key)
����ʾ����

���ƴ����������:
sessionStorage.removeItem("key"); 
localStorage.removeItem("site");

clear������е�key/value
��;��������е�key/value
�÷���.clear()
����ʾ����

���ƴ����������:
sessionStorage.clear(); 
localStorage.clear();

�ġ����������������������[]
web Storage���������������setItem,getItem�ȷ����ȡ��Ҳ��������ͨ����һ���õ�(.)����������[]�ķ�ʽ�������ݴ洢�������µĴ��룺

���ƴ����������:

var storage = window.localStorage; storage.key1 = "hello"; 
storage["key2"] = "world"; 
console.log(storage.key1); 
console.log(storage["key2"]);

�塢localStorage��sessionStorage��key��length����ʵ�ֱ���
sessionStorage��localStorage�ṩ��key()��length���Է����ʵ�ִ洢�����ݱ�������������Ĵ��룺

���ƴ����������:

var storage = window.localStorage; 
for (var i=0, len = storage.length; i < len; i++)
{
var key = storage.key(i); 
var value = storage.getItem(key); 
console.log(key + "=" + value); 
}

����storage�¼�
storage���ṩ��storage�¼�������ֵ�ı����clear��ʱ�򣬾Ϳ��Դ���storage�¼���������Ĵ���������һ��storage�¼��ı�ļ�����

���ƴ����������:
if(window.addEventListener){ 
window.addEventListener("storage",handle_storage,false); 
}
else if(window.attachEvent)
{ 
window.attachEvent("onstorage",handle_storage); 
} 
function handle_storage(e){
if(!e){e=window.event;} 
}

storage�¼�����ľ����������±�
Property	Type	Description
key	String	The named key that was added, removed, or moddified
oldValue	Any	The previous value(now overwritten), or null if a new item was added
newValue	Any	The new value, or null if an item was added
url/uri	String	The page that called the method that triggered this change


=======================================================================================================
=======================================================================================================


�����ļ��Ĳ���
ת������

File System 
    �����ļ���������ô�����Ҫ�ľ��� fs ���ģ�顣����node�� fs ģ���ṩ��API�ܶ࣬���������еķ�������ͬ�����첽����ʽ�����ڶ�ȡ�ļ�������˵������Ҫע���һ������첽��ͬ��֮�����ִ�����̵�����~

var fs = require('fs');
// ʹ���첽�ص��ķ�ʽ ��Ϊ���첽�ģ����Զ������ݶ�ȡ���Ĳ���������Ҫʹ�ûص��ķ�ʽ���д���
// ������ϰ���¼�������ǰ�˿���Ӧ����ϰ��Ϊ���� ��
fs.readFile('data.json',function(err, data){
  if(err){ }else{ 
    console.log(data.length);
   }
});


    ÿ���첽��API��������ص���������ʹ�ã���ô��������ķ�ʽ�ͻᱨ����������JSʹ�õ�setTimeout�����ƣ�                                                      

var fs = require('fs');
//���д� ��Ϊ���첽��ȡ�ļ� ����console��ʱ�����ݻ�δ��ȡ����
var data = fs.readFile('data.json');
console.log(data.length);



    ���߸ɴ�ֱ��     ʹ�����Ӧ��ͬ��APIʹ��

var fs = require('fs');
// ���߸�Ϊͬ����API��ȡ
var data = fs.readFileSync('data.json');
console.log(data.length);



    ����һЩ�򵥵�API

fs.writeFile('delete.txt','1234567890'��function(err){
    console('youxi!');
});

// ɾ���ļ�
fs.unlink('delete.txt', function(){
 console.log('success');
});

// �޸��ļ�����
fs.rename('delete.txt','anew.txt',function(err){
 console.log('rename success');

 // �鿴�ļ�״̬
fs.stat('anew.txt', function(err, stat){
  console.log(stat);
 });
});

// �ж��ļ��Ƿ����
fs.exists('a.txt', function( exists ){
    console.log( exists );
});

fs.existsSync()  ͬ����� fs.exists() ��


File System API

fs.open( path, flags,  [mode], callback );
flagsΪ��
    'r' - ��ֻ����ʽ���ļ������ļ������ڵ�ʱ�����쳣
    'r+' - �Զ�д��ʽ���ļ������ļ������ڵ�ʱ�����쳣
    'rs' - ��ֻ����ʽͬ�����ļ����ƹ����ػ����ļ�����ϵͳ����
    'rs+' - �Զ�д��ʽͬ�����ļ� ���ƹ����ػ����ļ�����ϵͳ����
    'w' - ��ֻд��ʽ���ļ������ļ�������ʱ�����ļ������ߴ��ڵ�ʱ�򸲸��ļ�
    'wx' - ��'w'һ�£���ֻ�������ļ������ڵ�ʱ��( ���Ե�ʱ��,��node�汾Ϊv0.10.26������ļ������������������ļ�����д�����ݣ����ǵ��ļ������ڵ�ʱ�򣬱���Ϊ����Ҫд��callback������callback�󲻱����ǲ�ִ���κβ����� )
    'w+' - �Զ�д��ʽ���ļ�
    'ws+' - ��'w+'һ�£���ֻ�������ļ������ڵ�ʱ��
    'a' - ��������ݵķ�ʽ���ļ����ļ��������򴴽�
    'a+' - ����ӺͶ�ȡ�ķ�ʽ���ļ����ļ��������򴴽�
    'ax+' - ��'a+'һ�£����Ǵ��ڵ�ʱ���ʧ��

modeΪ��
    �����ļ���ģʽ��Ĭ��Ϊ 0666���ɶ���д��

callback��
    �������������� (  err, fd )


fs.readFile( filename, [optins], callback );
filename : String
option : Object
    encoding : String | Null, default = Null
    flag : String default = 'r'    
callback : Function
// callback ��������������( err, data )����node�д󲿷ֻص��ӿ����ơ�


fs.writeFile( filename, data,  [optins], callback );
filename : String
data : String | Buffer��֮���򵥽��ܣ�
option : Object
    encoding : String | Null, default = 'utf8'
    mode : Number default = 438
    flag : String default = 'w'    
callback : Function


// ��������ӵ��ļ�ĩβ
fs.appendFile( filename, data,  [optins], callback );
filename : String
data : String | Buffer
option : Object
    encoding : String | Null, default = 'utf8'
    mode : Number default = 438
    flag : String default = 'w'    
callback : Function

���ϱȽϳ��õ��첽API ������֮��Ӧ��ͬ��API�����첽API�������Sync����ͬ����API�������API��鿴�ٷ��ĵ� http://nodejs.org/api/fs.html



Stream

    Stream��������node���һ����ͷϷ��������ݴ����������в��ɷֵĹ�ϵ��

var fs = require('fs');
function copy( src, dest ){
  fs.writeFileSync( dest, fs.readFileSync(src) );
 }
copy('data.json', 'dataStream.json');

    ������һ�����ļ������Ĵ��룬����ûʲô���⣬Ҳ��ȷ�ڴ���С�ļ���ʱ��ûʲô�����⣬����һ�������������ܴ���ļ���ʱ����Կ������Ƚ����ݶ�ȡ��������д�룬�ڴ���Ϊ��ת������ļ�̫��ͻ�������⡣

    ����Ҫ������ļ������ʱ����Ҫʹ��file system�����⼸��API��createReadStream��fs.createWriteStream�����ļ���Ϊһ��һ��С�����������д���������һ����������ݡ�

// Ҳ���ܳ����ڴ汬�� д�����ݸ����϶�ȡ�ٶ� һֱ��ȡ���ļ����Ϸ����ڴ���
// �������������ٶȾ����ǲ�һ���ģ�����δ��д����������ڴ��в��ϱ�󣬾Ϳ��ܻᵼ���ڴ�ı��֡�
var fs = require('fs');
var rs = fs.createReadStream('data.json'); 
 var ws = fs.createWriteStream('dataStream.json')
 rs.on('data',function(chunk){
  console.log('data chunk read ok');
  times++;
  ws.write(chunk,function(){
   console.log('data chunk write ok'); 
  });
 });
 rs.on('end',function(){
  console.log(times);
 });


��߿��Կ������ڶ�ȡ��д����ٶȲ�ͬ�����ʼ��ʱ���ȡ��2�����ݿ�󣬵�һ�����ݿ�д�����ϣ����ۼƺܶ�֮���Ʊػ�����ڴ����⡣���Զ�������������Ҫ�Ľ�һ��

var fs = require('fs');
var rs = fs.createReadStream('data.json');
 var ws = fs.createWriteStream('dataStream.json')
 // eg 1 ���Կ������� drain�¼���ʾΪ ֻд�������ѽ������������д��Ŀ��
 rs.on('data',function(chunk){
  console.log('data chunk read ok');
  if( ws.write(chunk,function(){
    console.log('data chunk write ok')
  }) == false ){
   rs.pause()
  }
 });
 rs.on('end',function(){
  ws.end()
 });
 ws.on('drain',function(){
  rs.resume();
 });

���ߣ�
//eg2
 function reStartRead( rs ){
  console.log('lasted readed data write OK, reStart Read.');
  rs.resume();
 }
 rs.on('data',function(chunk){
  console.log('data chunk read ok' );
  if( ws.write(chunk,function(){
    reStartRead( rs );
   }) == false ){
   rs.pause()
  }
 });
 rs.on('end',function(){
  ws.end()
 });



����������ʽ�൱��ÿ�ζ�ȡ��һ��data��֮�����ͣ��ȡ��ֱ���ÿ�д���Ѿ���ɲ��ٴο�����ȡ��stream��

����������� node������һ��pipe�ķ��� �������������������絼��һ�������ݶ���д��

function copy( src, dest ){
  fs.createReadStream( src ).pipe( fs.createWriteStream( dest ) );
 }
 copy('data.json', 'dataStream.json');






fs.mkdirSync ͬ����� fs.mkdir() ��

fs.mkdirSync(path, [mode])
���ڸ÷�������fsģ�飬ʹ��ǰ��Ҫ����fsģ�飨var fs= require(��fs��) ��
���ղ�����
path            ��������Ŀ¼·��
mode          Ŀ¼Ȩ�ޣ���дȨ�ޣ���Ĭ��0777
 
 */ 