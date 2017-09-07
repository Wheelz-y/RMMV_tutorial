
//-----------------------------------------------------------------------------
/**��̬���� ���幫�ó��򷽷�
 * The static class that defines utility methods.
 * ���ó���
 * @class Utils
 */
function Utils() {
    throw new Error('This is a static class');
}

/** RPG Maker ������ ,mv �ǵ�ǰ�汾
 * The name of the RPG Maker. 'MV' in the current version.
 *
 * @static
 * @property RPGMAKER_NAME
 * @type String
 * @final
 */
Utils.RPGMAKER_NAME = 'MV';

/**��� ��ĿURL�ַ����Ƿ���(name) ������Ϸʱ���
 * Checks whether the option is in the query string.
 *
 * @static
 * @method isOptionValid
 * @param {String} name The option name
 * @return {Boolean} True if the option is in the query string
 */
//��ѡ����Ч
Utils.isOptionValid = function(name) {
	//location��ŵ�������Ŀ����λ�õ�URL,
	//��file:///D:/RPGMV/Games/test/index.html?test,����D:/RPGMV/Games/test/Ϊ����Ŀ���ļ���,testΪ��Ŀ��
	//location.search�᷵��һ��?x,����xΪ�����Ŀ��
	//location.search.slice(0)��location.search.slice(1)�ֱ�Ϊ?x��x
	//location.search.slice(1).split('&')�᷵�������Ŀ��
	//contains�Ƕ�ԭ������string��array����չ,
	//�����Ƕ�����Ĳ������бȽ�,������ڵ���(����������Ĳ���),�ͷ���true,���򷵻�false
    return location.search.slice(1).split('&').contains(name);
};

/**����ǲ���nw.jsƽ̨
 * Checks whether the platform is NW.js.
 *
 * @static
 * @method isNwjs
 * @return {Boolean} True if the platform is NW.js
 */
Utils.isNwjs = function() {
	//���require��process�ֱ��Ǻ����Ͷ���,��ô�ͷ���true,������̨�ű���������������������
	//�������� nw.js ƽ̨����������
    return typeof require === 'function' && typeof process === 'object';
};

/**���ƽ̨�ǲ����ƶ��豸
 * Checks whether the platform is a mobile device.
 *
 * @static
 * @method isMobileDevice
 * @return {Boolean} True if the platform is a mobile device
 */
Utils.isMobileDevice = function() {
	//��r��ʼ��Ϊ��������ʽ,���������ʽ����˼��,�����ִ�Сд,��ƥ����������һ�Ϊ��
    var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    //navigator.userAgentΪ�ַ���,����Ϊ������汾,
    //navigator.userAgent.match(r)����ζ����������ʽr�Ĺ�����м���,������������ƥ��,����null
	//!!�ǽ���ǿ��ת��Ϊ����ֵ
    return !!navigator.userAgent.match(r);
};


/**����������Mobile Safari(ƻ��Safari�����)
 * Checks whether the browser is Mobile Safari.
 *
 * @static
 * @method isMobileSafari
 * @return {Boolean} True if the browser is Mobile Safari
 */
Utils.isMobileSafari = function() {
    var agent = navigator.userAgent;
    return !!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) &&
              !agent.match('CriOS'));
};

/**����������Android Chrome(��׿Chrome�����)
 * Checks whether the browser is Android Chrome.
 *
 * @static
 * @method isAndroidChrome
 * @return {Boolean} True if the browser is Android Chrome
 */
Utils.isAndroidChrome = function() {
    var agent = navigator.userAgent;
    //ͬʱƥ��Android��Chrome��Ϊ��,�����������Ƿ�Ϊ��׿��� Chrome �����
    return !!(agent.match(/Android/) && agent.match(/Chrome/));
};

/**���������ܹ����ļ�����Ϸ�ļ���
 * Checks whether the browser can read files in the game folder.
 *
 * @static
 * @method canReadGameFiles
 * @return {Boolean} True if the browser can read files in the game folder
 */
Utils.canReadGameFiles = function() {

	//�����нű�Ԫ�ط���scripts������,
    var scripts = document.getElementsByTagName('script');
    //����ĩβ�Ľű�Ԫ�ط���lastScript��,
    var lastScript = scripts[scripts.length - 1];
    //��ajaxʵ����
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', lastScript.src);
        //ͨ��overrideMimeTypeָ�����ܵ���Դ��ʲô��ʽ����,
        //�������ǰ���js�ű�����(��Ϊ����Ϊ'text/javascript')
        xhr.overrideMimeType('text/javascript');
        //���û���쳣,��ôsend(),����true
        xhr.send();
        return true;
    } catch (e) {
	    //���򷵻�false
        return false;
    }
};

/**����html ��ɫ�ַ��� �� rgb��ֵ
 * Makes a CSS color string from RGB values.
 *
 * @static
 * @method rgbToCssColor
 * @param {Number} r The red value in the range (0, 255)
 * @param {Number} g The green value in the range (0, 255)
 * @param {Number} b The blue value in the range (0, 255)
 * @return {String} CSS color string
 */
Utils.rgbToCssColor = function(r, g, b) {
	//Math.round()����������Ĳ���������������,��3.6==4;3.1==3;
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
	//��󷵻�����:rgb(0,0,255)�Ĳ���,�ò�������css��color����
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};
