const fs = require('fs');

const updateLocales = () => {
  ['ko', 'en'].forEach(lang => {
    const file = `src/locales/${lang}.json`;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    if (lang === 'ko') {
      data.faq.cta.btnAppStorePrefix = "App Store에서";
      data.faq.cta.btnGooglePlayPrefix = "Google Play에서";
      data.faq.cta.btnDownloadAction = "다운로드";
      data.faq.cta.btnWebPrefix = "Web으로";
      data.faq.cta.btnStartAction = "시작하기";
    } else {
      data.faq.cta.btnAppStorePrefix = "Download on the";
      data.faq.cta.btnGooglePlayPrefix = "Get it on";
      data.faq.cta.btnDownloadAction = "App Store"; // Or "Google Play"
      
      // Let's do prefix and suffix exactly:
      data.faq.cta.btnAppStorePrefix = "Download on the";
      data.faq.cta.btnAppStoreAction = "App Store";
      
      data.faq.cta.btnGooglePlayPrefix = "GET IT ON";
      data.faq.cta.btnGooglePlayAction = "Google Play";
      
      data.faq.cta.btnWebPrefix = "Start on";
      data.faq.cta.btnWebAction = "Web";
    }
    
    if (lang === 'ko') {
      data.faq.cta.btnAppStorePrefix = "App Store에서";
      data.faq.cta.btnAppStoreAction = "다운로드";
      data.faq.cta.btnGooglePlayPrefix = "Google Play에서";
      data.faq.cta.btnGooglePlayAction = "다운로드";
      data.faq.cta.btnWebPrefix = "Web으로";
      data.faq.cta.btnWebAction = "시작하기";
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  });
};

updateLocales();
