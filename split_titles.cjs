const fs = require('fs');

const updateLocales = () => {
  ['ko', 'en'].forEach(lang => {
    const file = `src/locales/${lang}.json`;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Features
    if (lang === 'ko') {
      data.features.title1 = "AI 채록이가 돕는";
      data.features.title2 = "완벽한 워크플로우";
    } else {
      data.features.title1 = "Intelligent workflows";
      data.features.title2 = "powered by AI";
    }
    delete data.features.badge;

    // Extension
    if (lang === 'ko') {
      data.extension.title1 = "읽던 페이지를";
      data.extension.title2 = "그 자리에서 '채록하기'";
    } else {
      data.extension.title1 = "Capture any page";
      data.extension.title2 = "right where you are";
    }
    delete data.extension.title;

    // Privacy
    if (lang === 'ko') {
      data.privacy.title1 = "오늘의 통찰이";
      data.privacy.title2 = "내일의 지혜가 됩니다.";
    } else {
      data.privacy.title1 = "Today's insights become";
      data.privacy.title2 = "tomorrow's wisdom.";
    }
    delete data.privacy.title;

    // Add Pro feature
    if (lang === 'ko') {
      if (!data.pricing.pro.features.includes('웹 및 크롬 익스텐션 지원')) {
        data.pricing.pro.features.push('웹 및 크롬 익스텐션 지원');
      }
    } else {
      if (!data.pricing.pro.features.includes('Web App & Chrome Extension support')) {
        data.pricing.pro.features.push('Web App & Chrome Extension support');
      }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  });
};

updateLocales();
