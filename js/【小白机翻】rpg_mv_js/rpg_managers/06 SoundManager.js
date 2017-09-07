
//-----------------------------------------------------------------------------
// SoundManager
// ����������
// The static class that plays sound effects defined in the database.
// �����̬���� ���� ���ݿ� ���� ���� Ч��

function SoundManager() {
    throw new Error('This is a static class');
}
//Ԥ������Ҫ������
SoundManager.preloadImportantSounds = function() {
    this.loadSystemSound(0);
    this.loadSystemSound(1);
    this.loadSystemSound(2);
    this.loadSystemSound(3);
};
//����ϵͳ����
SoundManager.loadSystemSound = function(n) {
    if ($dataSystem) {
        AudioManager.loadStaticSe($dataSystem.sounds[n]);
    }
};
//����ϵͳ����
SoundManager.playSystemSound = function(n) {
    if ($dataSystem) {
        AudioManager.playStaticSe($dataSystem.sounds[n]);
    }
};
//����ָ��
SoundManager.playCursor = function() {
    this.playSystemSound(0);
};
//����ȷ��
SoundManager.playOk = function() {
    this.playSystemSound(1);
};
//����ȡ��
SoundManager.playCancel = function() {
    this.playSystemSound(2);
};
//���ŷ�����
SoundManager.playBuzzer = function() {
    this.playSystemSound(3);
};
//����װ��
SoundManager.playEquip = function() {
    this.playSystemSound(4);
};
//���ű���
SoundManager.playSave = function() {
    this.playSystemSound(5);
};
//���Ŷ�ȡ
SoundManager.playLoad = function() {
    this.playSystemSound(6);
};
//����ս����ʼ
SoundManager.playBattleStart = function() {
    this.playSystemSound(7);
};
//��������
SoundManager.playEscape = function() {
    this.playSystemSound(8);
};
//���ŵ��˹���
SoundManager.playEnemyAttack = function() {
    this.playSystemSound(9);
};
//���ŵ����˺�
SoundManager.playEnemyDamage = function() {
    this.playSystemSound(10);
};
//���ŵ�������
SoundManager.playEnemyCollapse = function() {
    this.playSystemSound(11);
};
//����boss���� 1
SoundManager.playBossCollapse1 = function() {
    this.playSystemSound(12);
};
//����boss���� 2
SoundManager.playBossCollapse2 = function() {
    this.playSystemSound(13);
};
//���Ž�ɫ�˺�
SoundManager.playActorDamage = function() {
    this.playSystemSound(14);
};
//���Ž�ɫ����
SoundManager.playActorCollapse = function() {
    this.playSystemSound(15);
};
//���Żָ�
SoundManager.playRecovery = function() {
    this.playSystemSound(16);
};
//����δ����
SoundManager.playMiss = function() {
    this.playSystemSound(17);
};
//��������
SoundManager.playEvasion = function() {
    this.playSystemSound(18);
};
//����ħ������
SoundManager.playMagicEvasion = function() {
    this.playSystemSound(19);
};
//����ħ������
SoundManager.playReflection = function() {
    this.playSystemSound(20);
};
//���̵��
SoundManager.playShop = function() {
    this.playSystemSound(21);
};
//����ʹ����Ʒ
SoundManager.playUseItem = function() {
    this.playSystemSound(22);
};
//����ʹ�ü���
SoundManager.playUseSkill = function() {
    this.playSystemSound(23);
};
