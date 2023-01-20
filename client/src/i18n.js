import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        failbackLng: "en",
        debug: true,
        resources: {
            en: {
                translation: {
                    friends: "friends",
                    who_viewed_your_profile: "Who's viewed your profile",
                    impressions_text: "Impressions of your posts",
                    socialProfiles: "Social Profiles",
                    socialNetwork: "Social Network",
                    socialNetworkLinkedin: "Network Platform",
                    whats_on_your_mind: "What's on your mind?",
                    add_image_here: "Add image here",
                    image: "Image",
                    gif: "Clip",
                    attachments: "Attachments",
                    audio: "Audio",
                    post: "POST",
                    sponsored: "Sponsored",
                    create_ad: "Create Ad",
                    advert_text: "Unleash your true beauty with Consmetik. Our high-quality cosmetics are designed to enhance your natural features and give you the confidence to shine.",
                    frienddListWidget_title: "FriendList",
                },
            },
            fr: {
                translation: {
                    friends: "amis",
                },
            },
            de: {
                translation: {
                    friends: "Freunde",
                },
            },
            bg: {
                translation: {
                    friends: "приятели",
                    who_viewed_your_profile: "Кой е гледал твоят профил",
                    impressions_text: "Импресии на твоите публикации",
                    socialProfiles: "Социални профили",
                    socialNetwork: "Социална мрежа",
                    socialNetworkLinkedin: "Мрежова платформа",
                    whats_on_your_mind: "Какво мислиш?",
                    add_image_here: "Добави снимка тук",
                    image: "Снимка",
                    gif: "Клип",
                    attachments: "Прикачени файлове",
                    audio: "Аудио",
                    post: "ПУБЛИКУВАЙ",
                    sponsored: "Спонсорирано",
                    create_ad: "Създай реклама",
                    advert_text: "Откройте истинната си красота с Consmetik. Нашите качествени козметики са проектирани да подобряват вашите естествени особености и да ви дадат самоувереност, за да сияете.",
                    frienddListWidget_title: "Списък с приятели",
                },
            },
            ru: {
                translation: {
                    friends: "друзья",
                },
            },
            es: {
                translation: {
                    friends: "amigos",
                },
            },
            it: {
                translation: {
                    friends: "amici",
                },
            },
            pt: {
                translation: {
                    friends: "amigos",
                },
            },
            nl: {
                translation: {
                    friends: "vrienden",
                },
            },
            pl: {
                translation: {
                    friends: "przyjaciele",
                },
            },
            cs: {
                translation: {
                    friends: "přátelé",
                },
            },
            sr: {
                translation: {
                    friends: "пријатељи",
                },
            },
            tr: {
                translation: {
                    friends: "arkadaşlar",
                },
            },
            ro: {
                translation: {
                    friends: "prieteni",
                },
            },

        }
    });
