#!/usr/bin/env python3
"""Regenerate assets/search-index.json and sitemap.xml. Run after editing any page: python3 tools/build-search-index.py"""
import glob, html, json, re, datetime
BASE = "https://doc.raghim.com/"
SECTION = {"what-is-raghim":"Use Raghim","using-raghim":"Use Raghim","first-flow":"Use Raghim","api-quickstart":"Build","mcp-setup":"Build","integration-guide":"Build","examples":"Build","api-reference":"Build",
           "quick-start":"Self-host","deployment-guide":"Self-host","configuration":"Self-host","best-practices":"Self-host","troubleshooting":"Self-host",
           "security-guide":"Security","index":"Home"}
def text(s):
    s = re.sub(r"<(script|style)\b.*?</\1>", " ", s, flags=re.S)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s))).strip()
entries = []
for f in sorted(glob.glob("*.html")):
    if f == "404.html": continue
    name = f[:-5]
    src = open(f).read()
    m = re.search(r"<main.*?</main>", src, re.S)
    body = m.group(0) if m else src
    page = text(re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S).group(1)) if "<h1" in body else name
    parts = re.split(r"(?=<h2\b)", body)
    for p in parts:
        h = re.match(r"<h2[^>]*>(.*?)</h2>", p, re.S)
        if not h: continue
        idx = body.find(p)
        ids = re.findall(r'id="([^"]+)"', body[max(0, idx - 300):idx + 200])
        entries.append({"page": page, "section": SECTION.get(name, ""), "heading": text(h.group(1)),
                        "url": f + ("#" + ids[-1] if ids else ""), "text": text(p)[:600]})
    entries.append({"page": page, "section": SECTION.get(name, ""), "heading": page, "url": f, "text": text(body)[:300]})
json.dump(entries, open("assets/search-index.json", "w"), ensure_ascii=False, separators=(",", ":"))
today = datetime.date.today().isoformat()
urls = "".join(f"  <url><loc>{BASE}{'' if f=='index.html' else f}</loc><lastmod>{today}</lastmod></url>\n" for f in sorted(glob.glob("*.html")) if f != "404.html")
open("sitemap.xml", "w").write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')
print(len(entries), "entries")
