import i18n, {init} from "i18next";
import {initReactI18next} from "react-i18next";
import {register} from 'timeago.js';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password Repeat': 'Password Repeat',
                'Password': 'Password',
                'Login': 'Login',
                'Log Out': 'Log Out',
                'Users': 'Users',
                'Previous': '< Previous',
                'Next': 'Next >',
                'Load Failure': 'Load Failure',
                'Edit': 'Edit',
                'Cancel': 'Cancel',
                'Save': 'Save',
                'Change Display Name': 'Change Display Name',
                'My Profile': 'My Profile',
                'There are No hoaxes': 'There are No hoaxes',
                'Load old Hoaxes': 'Load old Hoaxes',
                'There are New Hoaxes': 'There are New Hoaxes',
                'Delete Hoax': 'Delete Hoax',
                'Are you sure to delete hoax?': 'Are you sure to delete hoax?',
                'Delete My Accaount': 'Delete My Accaount',
                'Are You sure to delete your account?': 'Are You sure to delete your account?'


            }

        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch': 'Aynı Şifreyi giriniz',
                'Username': 'Kullanıcı Adı',
                'Password Repeat': 'Şifreyi Tekrarla',
                'Display Name': 'Tercih edilen isim',
                'Password': 'Şifre',
                'Login': 'Giriş Yap',
                'Log Out': 'Çıkış Yap',
                'Users': 'Kullanıcılar',
                'Previous': '< Geri',
                'Next': 'İleri >',
                'Load Failure': 'Liste alınamadı',
                'Edit': 'Düzenle',
                'Cancel': 'İptal Et',
                'Save': 'Kaydet',
                'Change Display Name': 'Görünür İsminizi Değiştirin',
                'My Profile': 'Hesabım',
                'There are No hoaxes': 'Herhangi  bir Hoax Bulunamadı',
                'Load old Hoaxes': 'Eski Hoaxları Getir',
                'There are New Hoaxes': 'Yeni Hoaxları Yükle',
                'Delete Hoax': 'Hoax Sil',
                'Are you sure to delete hoax?': `Hoax'u silmek istediğinizden emin misiniz?  `,
                'Delete My Accaount': 'Hesabımı Sil',
                'Are You sure to delete your account?': `Hesabınızı silmek istediğinizden emin misiniz? `

            }

        }

    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }


})

const timeageTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde']
    ][index];
};
register('tr', timeageTR);
export default i18n;