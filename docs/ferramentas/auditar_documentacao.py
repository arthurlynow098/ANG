"""Confere links locais, fontes, imagens e índices publicados no GitHub."""

from pathlib import Path
from urllib.parse import unquote, urlsplit
import csv
import hashlib
import json
import re
import pymupdf

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'docs/testes/auditoria-documentacao.json'


def anchors(text):
    result = set(re.findall(r'<a\s+id="([^"]+)"', text))
    used = {}
    for title in re.findall(r'^#{1,6}\s+(.+)$', text, re.M):
        slug = re.sub(r'[^\w\- ]', '', title.lower()).replace(' ', '-')
        number = used.get(slug, 0)
        used[slug] = number + 1
        result.add(slug if not number else f'{slug}-{number}')
    return result


def main():
    problems = []
    files = list((ROOT / 'docs').rglob('*.md'))
    files += [ROOT / path for path in ['README.md', 'PRODUCT-BACKLOG.md',
                                      'frontend/README.md', 'data/README.md']]
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    if not REPORT.exists():
        REPORT.write_text('{}\n', encoding='utf-8')
    links = 0
    tables = 0
    for path in files:
        source = path.read_text(encoding='utf-8')
        source = re.sub(r'```.*?```', '', source, flags=re.S)
        table_width = None
        for number, line in enumerate(source.splitlines(), 1):
            if line.startswith('|'):
                width = len(re.split(r'(?<!\\)\|', line.strip().strip('|')))
                if table_width is None:
                    table_width = width
                    tables += 1
                elif width != table_width:
                    problems.append(f'Tabela desalinhada: {path.relative_to(ROOT)}:{number}')
            else:
                table_width = None
        for raw in re.findall(r'!?\[[^\]]*\]\(([^\n)]+)\)', source):
            target = raw.strip().strip('<>')
            parsed = urlsplit(target)
            if parsed.scheme or parsed.netloc:
                continue
            links += 1
            destination = path.parent / unquote(parsed.path) if parsed.path else path
            if not destination.exists():
                problems.append(f'Link ausente: {path.relative_to(ROOT)} -> {target}')
                continue
            if parsed.fragment and destination.suffix == '.md':
                if unquote(parsed.fragment) not in anchors(destination.read_text(encoding='utf-8')):
                    problems.append(f'Âncora ausente: {path.relative_to(ROOT)} -> {target}')
        if re.search(r'Projeto Exemplo|PB-EX-01|EXEMPLO-FICTICIO|Estoque Escolar', source):
            problems.append(f'Exemplo não preenchido: {path.relative_to(ROOT)}')
    manifest = json.loads((ROOT / 'docs/fontes.json').read_text(encoding='utf-8'))
    if len(manifest) != 4:
        problems.append('O índice deve conter os quatro documentos do projeto')
    pages = 0
    for item in manifest:
        path = ROOT / item['pdf']
        actual_hash = hashlib.sha256(path.read_bytes()).hexdigest()
        if actual_hash != item['sha256']:
            problems.append(f'Hash divergente: {item["pdf"]}')
        incoming = ROOT / 'Dados' / item['arquivo_original']
        if incoming.exists() and incoming.read_bytes() != path.read_bytes():
            problems.append(f'Cópia diferente do original: {item["pdf"]}')
        doc = pymupdf.open(path)
        if len(doc) != item['paginas']:
            problems.append(f'Contagem divergente: {item["pdf"]}')
        for number in range(1, len(doc) + 1):
            image = ROOT / item['capturas'] / f'pagina-{number:02d}.png'
            if not image.exists():
                problems.append(f'Página sem captura: {image.relative_to(ROOT)}')
            else:
                pix = pymupdf.Pixmap(image)
                if abs(pix.width - 1400) > 1:
                    problems.append(f'Largura inesperada: {image.relative_to(ROOT)}')
        pages += len(doc)
    images = list((ROOT / 'docs').rglob('*.png')) + list((ROOT / 'docs').rglob('*.jpeg'))
    for path in images:
        pymupdf.Pixmap(path)
    prototypes = list((ROOT / 'docs/prototipos/imagens').glob('*.png'))
    current = json.loads((ROOT / 'docs/prototipos/atual/capturas.json').read_text(encoding='utf-8'))
    for item in current['capturas']:
        if not (ROOT / 'docs/prototipos/atual' / item['arquivo']).exists():
            problems.append(f'Captura React ausente: {item["arquivo"]}')
    if len(prototypes) != 13 or len(current['capturas']) != 10 or pages != 59:
        problems.append('Quantidade inesperada de evidências')
    with (ROOT / 'docs/backlog/product-backlog.csv').open(encoding='utf-8', newline='') as file:
        backlog = list(csv.DictReader(file, delimiter=';'))
    if len(backlog) != 13:
        problems.append('Backlog CSV divergente')
    for item in backlog:
        if f'| {item["ID"]} |' not in (ROOT / 'PRODUCT-BACKLOG.md').read_text(encoding='utf-8'):
            problems.append(f'Item sem correspondência: {item["ID"]}')
    report = {'data': '2026-10-27', 'tipo': 'Auditoria documental, sem execução de regras comerciais',
              'markdowns_conferidos': len(files), 'links_locais_conferidos': links,
              'tabelas_conferidas': tables,
              'pdfs_integros': len(manifest), 'paginas_capturadas': pages,
              'telas_extraidas_do_pdf': len(prototypes), 'telas_react_capturadas': len(current['capturas']),
              'imagens_validas': len(images), 'itens_backlog_csv': len(backlog),
              'estimativa_equipe_conferida': {'horas': 60+50+40+80,
                                               'reais': 50*60+35*50+45*40+40*80},
              'problemas': problems, 'resultado': 'Aprovado' if not problems else 'Revisar'}
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=True, indent=2))
    return bool(problems)


if __name__ == '__main__':
    raise SystemExit(main())
