// @ts-nocheck
import { createI18n } from 'vue-i18n'

const loadLocaleMessages = () => {
  const locales = import.meta.globEager('../locales/**/*.json')
  const messages = {}

  Object.keys(locales).forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\.json$/i)

    if (matched && matched.length === 3) {
      const [, locale, module] = matched
      if (!messages[locale]) messages[locale] = {}
      messages[locale][module] = locales[key]
    }
  })
  return messages
}

export const i18n = createI18n<[any], 'en' | 'vi'>({
  legacy: false,
  locale: 'vi',
  messages: loadLocaleMessages(),
  fallbackLocale: 'en'
})
