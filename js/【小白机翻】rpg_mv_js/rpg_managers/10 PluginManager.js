
//-----------------------------------------------------------------------------
// PluginManager
// ���������
// The static class that manages the plugins.
// �����̬���� ���� ���

function PluginManager() {
    throw new Error('This is a static class');
}
//·��
PluginManager._path         = 'js/plugins/';
//�ű���
PluginManager._scripts      = [];
//�����ַ��
PluginManager._errorUrls    = [];
//������
PluginManager._parameters   = {};
//��װ
PluginManager.setup = function(plugins) {
    plugins.forEach(function(plugin) {
	    //��� ��� ״̬ ���� ���� �ű��� ���� �����
        if (plugin.status && !this._scripts.contains(plugin.name)) {
	        //���ò���
            this.setParameters(plugin.name, plugin.parameters);
            //��ȡ�ű�
            this.loadScript(plugin.name + '.js');
            //�ű������
            this._scripts.push(plugin.name);
        }
    }, this);
};
//������
PluginManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        throw new Error('Failed to load: ' + url);
    }
};
//����
PluginManager.parameters = function(name) {
	//���� ������[���� ���ַ���ת��ΪСд] ���� {}
    return this._parameters[name.toLowerCase()] || {};
};
//���ò�����
PluginManager.setParameters = function(name, parameters) {
	//������[���� ���ַ���ת��ΪСд ] = ������
    this._parameters[name.toLowerCase()] = parameters;
};
//��ȡ�ű�
PluginManager.loadScript = function(name) {
    var url = this._path + name;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
};
//�ڴ���
PluginManager.onError = function(e) {
	//�����ַ��
    this._errorUrls.push(e.target._url);
};
