"""Copia as fontes do projeto e gera capturas reais de cada página dos PDFs.

Uso na raiz: python docs/ferramentas/importar_documentos.py
Dependência: PyMuPDF (python -m pip install PyMuPDF).
"""

from pathlib import Path
import hashlib
import json
import shutil
import pymupdf

ROOT = Path(__file__).resolve().parents[2]
SOURCES = [
    ('2209ANG.pdf', 'academico', 'estudo-ang'),
    ('Pi Atividade 29_09_26pdf.pdf', 'continuidade', 'atividade-29-09-2026'),
    ('RequisitosFuncionais_ANG.pdf', 'requisitos', 'requisitos-funcionais'),
    ('telasANG.pdf', 'prototipos', 'telas-ang'),
    ('Protocolo-de-Estudo.pdf', 'apoio', 'protocolo-de-estudo'),
]
SCREEN_NAMES = [
    '01-autenticacao', '02-credenciais-invalidas', '03-inicio-administrador',
    '04-produtos', '05-cadastro-produto', '06-venda-cliente-cadastrado',
    '07-venda-cliente-avulso', '08-clientes', '09-detalhe-cliente',
    '10-estoque', '11-relatorios', '12-atendentes', '13-inicio-atendente',
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    inventory = []
    for name, category, slug in SOURCES:
        incoming = ROOT / 'Dados' / name
        destination = ROOT / 'docs' / category / 'fontes' / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        if incoming.exists():
            shutil.copyfile(incoming, destination)
        doc = pymupdf.open(destination)
        captures = destination.parents[1] / 'evidencias' / slug
        captures.mkdir(parents=True, exist_ok=True)
        gallery = [f'# Capturas — {name}', '',
                   f'Fonte: [{name}](../../fontes/{name.replace(" ", "%20")}). '
                   'Páginas renderizadas diretamente do PDF, sem redesenho.', '']
        for number, page in enumerate(doc, 1):
            filename = f'pagina-{number:02d}.png'
            page.get_pixmap(matrix=pymupdf.Matrix(1400 / page.rect.width,
                                                  1400 / page.rect.width),
                            alpha=False).save(captures / filename)
            gallery += [f'## Página {number}', '', f'![Página {number}]({filename})', '']
        (captures / 'README.md').write_text('\n'.join(gallery), encoding='utf-8')
        if name == 'telasANG.pdf':
            images_dir = ROOT / 'docs/prototipos/imagens'
            images_dir.mkdir(parents=True, exist_ok=True)
            for page_index, screen in enumerate(SCREEN_NAMES, 3):
                page = doc[page_index]
                image = doc.extract_image(page.get_images(full=True)[0][0])
                (images_dir / f'{screen}.{image["ext"]}').write_bytes(image['image'])
        if name in ('2209ANG.pdf', 'RequisitosFuncionais_ANG.pdf'):
            targets = [(29, 'casos-de-uso', 'diagrama-casos-de-uso-original'),
                       (30, 'arquitetura', 'diagrama-classes-original')] if name == '2209ANG.pdf' else [
                           (4, 'casos-de-uso', 'diagrama-casos-de-uso-requisitos')]
            for page_index, folder, filename in targets:
                image = doc.extract_image(doc[page_index].get_images(full=True)[0][0])
                target = ROOT / 'docs' / folder / 'imagens'
                target.mkdir(parents=True, exist_ok=True)
                (target / f'{filename}.{image["ext"]}').write_bytes(image['image'])
        inventory.append({'arquivo_original': name, 'categoria': category,
                          'pdf': destination.relative_to(ROOT).as_posix(),
                          'capturas': captures.relative_to(ROOT).as_posix(),
                          'paginas': len(doc), 'sha256': digest(destination),
                          'copia_identica_ao_original': digest(incoming) == digest(destination)
                          if incoming.exists() else None})
        print(f'{name}: {len(doc)} páginas; cópia e capturas prontas.')
    manifest = ROOT / 'docs/fontes.json'
    manifest.write_text(json.dumps(inventory, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
