import { createI18n } from "vue-i18n";

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
    const messages = {};
    const locales = Object.entries(
        import.meta.glob("./lang/**.json", {
            eager: true,
        })
    );
    locales.forEach(([fileName, langModule]) => {
        const langMod = langModule;
        const matched = fileName.match(/([A-Za-z0-9-_]+)\./i);
        const locale = matched[1];
        messages[locale] = langMod.default;
    });

    return messages;
}

const setDateTimeFormats = {
    short: {
        year: "numeric",
        month: "short",
        day: "numeric",
    },
    long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
    },
};

const dateTimeFormats = {
    en: setDateTimeFormats,
    "en-GB": setDateTimeFormats,
};

export default createI18n({
    locale: import.meta.env.VUE_APP_I18N_LOCALE || "en",
    fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
    messages: loadLocaleMessages(),
    dateTimeFormats,
});
