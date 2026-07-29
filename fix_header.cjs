const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');
code = code.replace('<Button size="sm">{t(\'header.try\')}</Button>', '<Link to="/notes"><Button size="sm">{t(\'header.try\')}</Button></Link>');
code = code.replace('<Button size="sm" className="w-full justify-center">\n                  {t(\'header.try\')}\n                </Button>', '<Link to="/notes" onClick={closeMenu} className="w-full"><Button size="sm" className="w-full justify-center">{t(\'header.try\')}</Button></Link>');
fs.writeFileSync('src/components/layout/Header.tsx', code);
