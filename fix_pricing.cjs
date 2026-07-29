const fs = require('fs');

const updateLocales = () => {
  ['ko', 'en'].forEach(lang => {
    const file = `src/locales/${lang}.json`;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    if (lang === 'ko') {
      data.pricing.pro.support = "✓ 웹 및 크롬 익스텐션 지원";
    } else {
      data.pricing.pro.support = "✓ Web App & Chrome Extension support";
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  });
};

updateLocales();
