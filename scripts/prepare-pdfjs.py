"""Fetch the pinned official Mozilla compatibility build at build time."""
import pathlib,json,urllib.request,hashlib,io,zipfile,sys
root=pathlib.Path(__file__).resolve().parent.parent
config=json.loads((root/'scripts/pdfjs-package.json').read_text('utf-8'))
archive=pathlib.Path(sys.argv[1]).read_bytes() if len(sys.argv)>1 else urllib.request.urlopen(config['url'],timeout=90).read()
if hashlib.sha256(archive).hexdigest()!=config['sha256']:raise ValueError('PDF.js release checksum mismatch')
out=root/'dist/vendor/pdfjs';out.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(io.BytesIO(archive)) as z:
 for name in z.namelist():
  target=None
  if name in ['build/pdf.mjs','build/pdf.worker.mjs']:target=name.split('/')[-1]
  elif name.startswith(('cmaps/','standard_fonts/','wasm/')) or name in ['LICENSE']:target=name
  if not target or name.endswith('/'):continue
  relative=pathlib.PurePosixPath(target)
  if relative.is_absolute() or '..' in relative.parts:raise ValueError('Unsafe release path')
  path=out.joinpath(*relative.parts);path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(z.read(name))
print('Packaged pinned PDF.js '+config['version']+'; same-origin renderer, worker and fonts.')
