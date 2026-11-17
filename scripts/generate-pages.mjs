import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=process.cwd();
const origin='https://cmei-seven.vercel.app';
const pages=JSON.parse(await readFile(resolve(root,'src/content/siteMeta.json'),'utf8'));
const base=await readFile(resolve(root,'index.html'),'utf8');
const output=resolve(root,'generated-entries');
await mkdir(output,{recursive:true});
const escapeHtml=value=>String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
for(const [route,meta] of Object.entries(pages)){
  if(route==='/')continue;
  const name=route==='/films/the-dark-didnt-win'?'the-dark-didnt-win':route.slice(1);
  const canonical=origin+route;
  const image=new URL(meta.image,origin).toString();
  const extra=[
    '<link rel="canonical" href="'+escapeHtml(canonical)+'"/>',
    '<meta property="og:type" content="website"/>',
    '<meta property="og:site_name" content="CMEI"/>',
    '<meta property="og:title" content="'+escapeHtml(meta.title)+'"/>',
    '<meta property="og:description" content="'+escapeHtml(meta.description)+'"/>',
    '<meta property="og:url" content="'+escapeHtml(canonical)+'"/>',
    '<meta property="og:image" content="'+escapeHtml(image)+'"/>',
    '<meta name="twitter:card" content="summary_large_image"/>',
    '<meta name="twitter:title" content="'+escapeHtml(meta.title)+'"/>',
    '<meta name="twitter:description" content="'+escapeHtml(meta.description)+'"/>',
    '<meta name="twitter:image" content="'+escapeHtml(image)+'"/>'
  ].join('');
  const html=base
    .replace(/<meta name="description" content="[^"]*"\s*\/>/,'<meta name="description" content="'+escapeHtml(meta.description)+'"/>')
    .replace(/<title>[^<]*<\/title>/,'<title>'+escapeHtml(meta.title)+'</title>')
    .replace('</head>',extra+'</head>');
  await writeFile(resolve(output,name+'.html'),html);
}
