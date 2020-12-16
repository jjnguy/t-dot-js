
var strings = { defaultLang: "en", strings: {} };

var defaultLang = strings.defaultLanguage;
var language = navigator.language;

function config(cfg) {
  if (cfg.language) language = cfg.language;
  if (cfg.strings) strings = cfg.strings;
}

function lookup(key, data) {
  let str = strings.strings[key];
  if (!str) return `No string defined with key: ${key}`;
  let result = str.translations[language]
    || str.translations[language.split('-')[0]]
    || str.translations[defaultLang];

  return {
    type: str.type,
    txt: applyTemplate(result, data),
  };
}

function t(key, data) {
  return lookup(key, data).txt || key;
}

function applyTemplate(txt, data) {
  if (!data) return txt;

  let result = txt;
  Object.keys(data).forEach(key => {
    var regex = new RegExp(`\{\{\\s+${key}\\s+\}\}`);
    result = result.replace(regex, data[key]).toString();
  })

  return result;
}

export { t, lookup, config };
