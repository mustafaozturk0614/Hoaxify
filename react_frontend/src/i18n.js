import i18n, { init } from "i18next";
import { initReactI18next } from "react-i18next";

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
                'Login':'Login'


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
                'Login':'Giriş Yap'


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
export default i18n;