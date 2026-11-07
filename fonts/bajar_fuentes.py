#!/usr/bin/env python3
"""Baja Grandstander y Nunito de Google Fonts (solo el set latino, que cubre el español)
y las guarda acá al lado, para que la página no dependa de Google al cargar.
Uso:  python3 fonts/bajar_fuentes.py   (desde la carpeta web-mama)"""
import os, re, urllib.request

AQUI = os.path.dirname(os.path.abspath(__file__))
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
FUENTES = {
    "grandstander": "https://fonts.googleapis.com/css2?family=Grandstander:wght@600;800&display=swap",
    "nunito": "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap",
}

def bajar(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

for nombre, url_css in FUENTES.items():
    css = bajar(url_css).decode()
    # cada bloque viene precedido por un comentario con el subset: /* latin */
    bloques = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*{[^}]*})", css)
    urls = sorted({re.search(r"url\((https://[^)]+\.woff2)\)", b).group(1) for s, b in bloques if s == "latin"})
    if not urls:
        raise SystemExit(f"No encontré el set latino de {nombre}. Avisale a Claude.")
    if len(urls) > 1:
        print(f"Ojo: {nombre} vino en {len(urls)} archivos; guardo el primero y aviso.")
    destino = os.path.join(AQUI, f"{nombre}.woff2")
    with open(destino, "wb") as f:
        f.write(bajar(urls[0]))
    print(f"OK {nombre}.woff2  ({os.path.getsize(destino) // 1024} KB)")
print("Listo. Ya podés recargar la página.")
