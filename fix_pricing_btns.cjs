const fs = require('fs');
let code = fs.readFileSync('src/components/sections/Pricing.tsx', 'utf8');
code = code.replace('<Button variant="outline" className="w-full">\n              {t(\'pricing.free.cta\')}\n            </Button>', '<Link to="/notes" className="w-full"><Button variant="outline" className="w-full">{t(\'pricing.free.cta\')}</Button></Link>');
code = code.replace('<Button className="w-full">\n              {t(\'pricing.pro.cta\')}\n            </Button>', '<Link to="/notes" className="w-full"><Button className="w-full">{t(\'pricing.pro.cta\')}</Button></Link>');

// We also need to import Link from react-router-dom if not imported
if (!code.includes('import { Link }')) {
  code = code.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { Link } from 'react-router-dom';");
}
fs.writeFileSync('src/components/sections/Pricing.tsx', code);
