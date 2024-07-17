import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            bookName: "Book Name",
            bookDescription: "Book Description",
            bookCategory: "Book Category",
            bookValidation:'Please Fill Out The Field',
            bookCreate: 'Create Book',
            actions: "Actions",
            addNew: "Add New(+)",
            update : 'Update',
            delete:'Delete',
            detail:'Detail',
            save:'Save',
            back:'Back',
            language: "Language",
            bookUpdate:'Update Book',
            bookDetail: 'Book Detail',
            bookList: 'Book List',
            welcome : 'Welcome',
            login : 'Login',
            signup:'Sing up'
        }
    },
    tr: {
        translation: {
            bookName: "Kitap İsmi",
            bookDescription: "Kitap Açıklaması",
            bookCategory: "Kitap Kategorisi",
            bookValidation:'Lütfen Boş Alanı Doldurunuz...',
            bookCreate: 'Kitap Oluştur',
            actions: "İşlemler",
            addNew: "Yeni Ekle(+)",
            update : 'Güncelle',
            delete:'Sil',
            detail:'Detay',
            save: 'Kayıt Et',
            back:'Geri',
            language: "Dil",
            bookUpdate:'Kitap Güncelle',
            bookDetail: 'Kitap Detay',
            bookList: 'Kitap Listesi',
            welcome:'Hoşgeldiniz',
            login : 'Giriş Yap',
            signup:'Kayıt Ol'

        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;