#!/usr/bin/env python3
"""Rewrite the shared nav and prev/next links on every page. Edit SECTIONS to add a page, then run: python3 tools/build-nav.py && python3 tools/build-search-index.py"""
import re, glob
SECTIONS = [
 ("use","Use Raghim",[("what-is-raghim.html","What is Raghim?","nav.what_is"),("using-raghim.html","Using the App","nav.using_app"),("first-flow.html","Your First Flow","nav.first_flow")]),
 ("build","Build",[("api-quickstart.html","API Quickstart","nav.api_quickstart"),("mcp-setup.html","MCP Setup","nav.mcp"),("integration-guide.html","Integration Guide","nav.integration"),("examples.html","Examples","nav.examples"),("api-reference.html","API Reference","nav.api")]),
 ("selfhost","Self-host",[("quick-start.html","Self-host Quick Start","nav.quick_start"),("deployment-guide.html","Deployment","nav.deployment"),("configuration.html","Configuration","nav.configuration"),("best-practices.html","Best Practices","nav.best_practices"),("troubleshooting.html","Troubleshooting","nav.troubleshooting")]),
]
SEARCH = '<div class="doc-search"><input type="search" id="doc-search" placeholder="Search docs (press /)" aria-label="Search documentation" autocomplete="off"><div id="doc-search-results" hidden></div></div>'
def nav(cur):
    h = '<div class="nav-menu" id="nav-menu">\n'
    h += f'                    <a href="index.html" class="nav-link{" active" if cur=="index.html" else ""}" data-translate="nav.home">Home</a>\n'
    for key, label, items in SECTIONS:
        on = any(cur == i[0] for i in items)
        h += f'                    <div class="nav-group{" active" if on else ""}">\n                        <button type="button" class="nav-link nav-group-btn{" active" if on else ""}" aria-haspopup="true" data-translate="nav.{key}">{label}</button>\n                        <div class="nav-sub">\n'
        for f, l, k in items:
            cls = ' class="active" aria-current="page"' if f == cur else ''
            h += f'                            <a href="{f}"{cls} data-translate="{k}">{l}</a>\n'
        h += '                        </div>\n                    </div>\n'
    h += f'                    <a href="security-guide.html" class="nav-link{" active" if cur=="security-guide.html" else ""}" data-translate="nav.security">Security</a>\n                    {SEARCH}\n                </div>'
    return h
def pager(cur):
    for _, _, items in SECTIONS:
        fs = [i[0] for i in items]
        if cur in fs:
            i = fs.index(cur); p = items[i-1] if i > 0 else None; n = items[i+1] if i < len(items)-1 else None
            s = '<div class="container"><nav class="page-nav" aria-label="Page navigation">'
            s += f'<a class="page-nav-prev" href="{p[0]}"><span data-translate="nav.previous">Previous</span><strong data-translate="{p[2]}">{p[1]}</strong></a>' if p else '<span></span>'
            s += f'<a class="page-nav-next" href="{n[0]}"><span data-translate="nav.next">Next</span><strong data-translate="{n[2]}">{n[1]}</strong></a>' if n else '<span></span>'
            return s + '</nav></div>\n    '
    return ''
for f in glob.glob('*.html'):
    if f == '404.html': continue
    s = open(f).read()
    s = re.sub(r'<div class="nav-menu" id="nav-menu">.*?</div>\s*(?=<div class="nav-toggle")', lambda m: nav(f) + '\n                ', s, count=1, flags=re.S)
    s = re.sub(r'<div class="container"><nav class="page-nav".*?</nav></div>\n    ', '', s, flags=re.S)
    if pager(f): s = s.replace('</main>', pager(f) + '</main>', 1)
    open(f, 'w').write(s)
