#!/usr/bin/env python3
"""
Versiona as referências a assets/*.css, assets/*.js e aos ícones (favicon.svg,
apple-touch-icon.png) nas páginas HTML usando um hash do conteúdo do arquivo
(assets/base.css?v=ab12cd34).

Por quê: o GitHub Pages serve os assets com cache-control: max-age=600. Sem isso,
por até 10 minutos após um deploy o navegador combina HTML novo com CSS/JS antigo
— e o layout quebra. Com o hash na URL, qualquer mudança no arquivo gera uma URL
nova e o navegador busca a versão certa na hora.

Rodar sempre depois de mexer em assets/ e antes de publicar:
    python3 versionar-assets.py
"""
import hashlib, glob, re, os

ASSETS = ['assets/base.css', 'assets/site.js', 'assets/nav.js', 'assets/amd.js',
          'favicon.svg', 'apple-touch-icon.png']

def short_hash(path):
    with open(path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()[:8]

def main():
    versions = {}
    for a in ASSETS:
        if os.path.exists(a):
            versions[a] = short_hash(a)

    total = 0
    for page in sorted(glob.glob('*.html')):
        s = open(page, encoding='utf-8').read()
        orig = s
        for asset, ver in versions.items():
            # troca "assets/x.css" ou "assets/x.css?v=qualquercoisa" pela versão atual
            s = re.sub(re.escape(asset) + r'(\?v=[0-9a-f]+)?(?=["\'])', asset + '?v=' + ver, s)
        if s != orig:
            open(page, 'w', encoding='utf-8').write(s)
            total += 1

    for a, v in versions.items():
        print('  %-18s v=%s' % (a, v))
    print('paginas atualizadas: %d' % total)

if __name__ == '__main__':
    main()
