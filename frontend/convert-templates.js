import fs from 'fs';
import path from 'path';

const TEMPLATE_DIR = '/Users/muhfaiizr/Documents/Web Project/Larkon-React_v2.0/1.HTML_Template';
const OUT_DIR = '/Users/muhfaiizr/Documents/Web Project/Larkon-React_v2.0/frontend/src/app/(landing)/pages';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function getRouteInfo(filename) {
  const base = filename.replace('.html', '');
  let componentName = base.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  if (/^\d/.test(componentName)) componentName = 'Page' + componentName;
  if (base === 'index') componentName = 'LandingIndex';
  if (base === '404') componentName = 'Landing404';
  let routePath = '/' + base;
  if (base === 'index') routePath = '/';
  if (base === '404') routePath = '/pages-404';
  return { slug: base, componentName, routePath, title: base.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' | Larkon Store' };
}

function htmlToJsx(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;

  // --- Strip preloader robustly: find <div id="preloader-active"> and remove until 6th </div> closing ---
  {
    const preIdx = body.indexOf('id="preloader-active"');
    if (preIdx !== -1) {
      const tagStart = body.lastIndexOf('<', preIdx);
      // Count divs from tagStart
      let depth = 0;
      let endPos = -1;
      const re = /<\/?div[\s>]/gi;
      let m;
      while ((m = re.exec(body)) !== null) {
        if (m.index < tagStart) continue;
        const isClose = body[m.index + 1] === '/';
        if (!isClose) depth++;
        else depth--;
        if (depth === 0) {
          endPos = body.indexOf('>', m.index) + 1;
          break;
        }
      }
      if (endPos !== -1) body = body.slice(0, tagStart) + body.slice(endPos);
    }
  }

  // Remove <script> blocks
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Convert internal .html anchor hrefs to absolute routes BEFORE class conversion
  // <a href="index.html"> -> <a href="/index">  (keep as <a> for now, router will handle)
  // We'll NOT change tag name; just fix href value
  body = body.replace(/href="([a-zA-Z0-9_-]+)\.html"/g, 'href="/$1"');
  body = body.replace(/href='([a-zA-Z0-9_-]+)\.html'/g, "href='/$1'");
  // index.html -> /
  body = body.replace(/href="\/index"/g, 'href="/"');

  // Fix asset src/href that are still relative (assets/...)
  body = body.replace(/src="assets\//g, 'src="/assets/');
  body = body.replace(/src='assets\//g, "src='/assets/");
  body = body.replace(/href="assets\//g, 'href="/assets/');
  body = body.replace(/href='assets\//g, "href='/assets/");

  // Fix background-image url() that still has relative assets/ -> absolute
  // Handle inside inline styles and <style> blocks both
  body = body.replace(/url\(['"]?assets\//g, 'url(/assets/');

  // --- Inline style="..." -> style={{}} ---
  body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    const decls = p1.split(';').filter(s => s.trim().length > 0);
    const obj = {};
    for (const decl of decls) {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) continue;
      const prop = decl.slice(0, colonIdx).trim();
      let val = decl.slice(colonIdx + 1).trim();
      // Strip wrapping quotes from value if present (handles url('...') that leaked)
      // But keep url(...) wrapper
      const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[camelProp] = val;
    }
    // Use single quotes inside JSON to avoid escaping double quotes in JSX
    const entries = Object.entries(obj).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ');
    return `style={{${entries}}}`;
  });

  // Fix HTML attributes -> JSX
  body = body.replace(/\bclass=/g, 'className=');
  body = body.replace(/\bfor=/g, 'htmlFor=');
  body = body.replace(/\bautocomplete=/g, 'autoComplete=');
  body = body.replace(/\bautofocus=/g, 'autoFocus=');
  body = body.replace(/\bcolspan=/g, 'colSpan=');
  body = body.replace(/\browspan=/g, 'rowSpan=');
  body = body.replace(/\btabindex=/g, 'tabIndex=');
  body = body.replace(/\breadonly=/g, 'readOnly=');
  body = body.replace(/\bmaxlength=/g, 'maxLength=');
  body = body.replace(/\bcellspacing=/g, 'cellSpacing=');
  body = body.replace(/\bcellpadding=/g, 'cellPadding=');
  body = body.replace(/\bframeborder=/g, 'frameBorder=');
  body = body.replace(/\bmarginwidth=/g, 'marginWidth=');
  body = body.replace(/\bmarginheight=/g, 'marginHeight=');
  body = body.replace(/\benctype=/g, 'encType=');
  body = body.replace(/\bnovalidate=/g, 'noValidate=');

  // SVG camelCase (case-insensitive)
  body = body.replace(/\bviewbox=/gi, 'viewBox=');
  body = body.replace(/\bpreserveAspectRatio=/gi, 'preserveAspectRatio=');
  // Fix tag names: <clippath -> <clipPath, </clippath -> </clipPath
  body = body.replace(/<clipPath/gi, '<clipPath');
  body = body.replace(/<\/clipPath/gi, '</clipPath');
  body = body.replace(/<clippath/gi, '<clipPath');
  body = body.replace(/<\/clippath/gi, '</clipPath');
  body = body.replace(/\bclip-path=/gi, 'clipPath=');
  body = body.replace(/\bclipPath=/g, 'clipPath=');
  // Another pass: if lowercased clipPath attr slipped through
  body = body.replace(/\bclippath=/gi, 'clipPath=');
  body = body.replace(/\bfill-rule=/gi, 'fillRule=');
  body = body.replace(/\bclip-rule=/gi, 'clipRule=');
  body = body.replace(/\bstroke-width=/gi, 'strokeWidth=');
  body = body.replace(/\bstroke-linecap=/gi, 'strokeLinecap=');
  body = body.replace(/\bstroke-linejoin=/gi, 'strokeLinejoin=');
  body = body.replace(/\bstroke-miterlimit=/gi, 'strokeMiterlimit=');
  body = body.replace(/\bstroke-dasharray=/gi, 'strokeDasharray=');
  body = body.replace(/\bstroke-dashoffset=/gi, 'strokeDashoffset=');
  body = body.replace(/\bstroke-opacity=/gi, 'strokeOpacity=');
  body = body.replace(/\bfill-opacity=/gi, 'fillOpacity=');

  // Self-closing void elements in JSX
  const voidTags = ['img', 'input', 'br', 'hr', 'source', 'area', 'base', 'wbr', 'col', 'embed', 'link', 'meta', 'param', 'track'];
  for (const tag of voidTags) {
    const regex = new RegExp(`<(${tag}(?:\\s[^>]*?)?)(?<!/)>`, 'gi');
    body = body.replace(regex, '<$1 />');
  }
  // Fix double self-close: <img ... //> -> <img ... />
  body = body.replace(/\/\/>/g, '/>');

  // Comments -> JSX comments
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // Entities
  body = body.replace(/&copy;/g, '©').replace(/&nbsp;/g, ' ').replace(/&times;/g, '×')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&bull;/g, '•').replace(/&hellip;/g, '…').replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  // &amp; last (after others)
  body = body.replace(/&amp;/g, '&');

  // Clean stray whitespace lines at the very start before first real tag
  body = body.replace(/^\s*(<\/div>\s*)+/, '');

  return body.trim();
}

const files = fs.readdirSync(TEMPLATE_DIR).filter(f => f.endsWith('.html')).sort();
console.log(`Found ${files.length} HTML files.`);

const routes = [];

for (const file of files) {
  const info = getRouteInfo(file);
  const html = fs.readFileSync(path.join(TEMPLATE_DIR, file), 'utf-8');
  const jsxBody = htmlToJsx(html);

  const pageDir = path.join(OUT_DIR, info.slug);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

  const code = `import { Helmet } from 'react-helmet';

const ${info.componentName} = () => (
  <>
    <Helmet>
      <title>${info.title}</title>
    </Helmet>
    <div className="landing-page-${info.slug}">
${jsxBody.split('\n').map(l => '      ' + l).join('\n')}
    </div>
  </>
);

export default ${info.componentName};
`;
  fs.writeFileSync(path.join(pageDir, 'page.jsx'), code, 'utf-8');
  routes.push(info);
}

console.log(`Converted ${routes.length} pages.`);

fs.writeFileSync(
  path.join('/Users/muhfaiizr/Documents/Web Project/Larkon-React_v2.0/frontend/src/routes', 'landing-routes-manifest.json'),
  JSON.stringify(routes, null, 2), 'utf-8'
);
console.log('Saved manifest.');

// Quick sanity: check first page doesn't have stray </div> before <header
const sample = fs.readFileSync(path.join(OUT_DIR, 'index/page.jsx'), 'utf-8');
const wrapperContent = sample.slice(sample.indexOf('landing-page-index'));
const headerPos = wrapperContent.indexOf('<header');
const strayDiv = wrapperContent.lastIndexOf('</div>', headerPos);
if (strayDiv > wrapperContent.indexOf('landing-page-index') + 30) {
  console.warn('WARN: stray </div> before <header> still present — check preloader stripping');
} else {
  console.log('OK: no stray </div> before <header>');
}
const vbOk = sample.includes('viewBox=');
const cpOk = sample.includes('<clipPath') || !sample.includes('<clippath');
console.log(`SVG viewBox ok: ${vbOk}, clipPath tag ok: ${cpOk}`);
