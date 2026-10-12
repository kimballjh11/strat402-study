"""Merge content/strat401/map/S??.json into content-map.json + a readable content-map.md (Phase 1)."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAP = ROOT / "content" / "strat401" / "map"
OUT = ROOT / "content" / "strat401"
REQUIRED = ["id", "title", "keyQuestion", "reading", "case", "framework", "terms", "claims", "failures",
            "caseFacts", "strongAnalysis", "counter", "courseMap", "slideExtras", "quant", "gaps"]


def main():
    sessions, problems = [], []
    for f in sorted(MAP.glob("S??.json")):
        s = json.loads(f.read_text())
        for k in REQUIRED:
            if k not in s:
                problems.append(f"{f.name}: missing {k}")
        for group in ("terms", "claims", "failures", "caseFacts"):
            for i, item in enumerate(s.get(group, [])):
                if not item.get("src"):
                    problems.append(f"{f.name}: {group}[{i}] has no source tag")
        sessions.append(s)
    (OUT / "content-map.json").write_text(json.dumps({"course": "STRAT 401", "sessions": sessions}, indent=1))

    md = ["# STRAT 401 content map", "",
          "Generated from `content/strat401/map/*.json` by `scripts/strat401/build_map.py`. Every item carries a source tag.", ""]
    for s in sessions:
        md += [f"## {s['id']} · {s['title']}", "",
               f"**Key Question:** {s['keyQuestion']} `[{s['keyQuestionSrc']}]`", "",
               f"**Reading:** {s['reading']['name']} · **Case:** {s['case']['name']}", "",
               f"**Slides:** {s.get('slides') or 'none'}", "",
               f"### Framework: {s['framework']['name']}", "", s["framework"]["summary"], ""]
        md += [f"- **{c['name']}**: {c['what']} `[{c['src']}]`" for c in s["framework"]["components"]]
        md += ["", "### Key terms", ""] + [f"- **{t['term']}**: {t['def']} `[{t['src']}]`" for t in s["terms"]]
        md += ["", "### Claims and propositions", ""] + [f"- {c['claim']} `[{c['src']}]`" for c in s["claims"]]
        md += ["", "### How it fails / misuse", ""] + [f"- **{x['name']}**: {x['what']} `[{x['src']}]`" for x in s["failures"]]
        md += ["", "### Case facts that matter", ""] + [f"- {x['fact']} *Why it matters:* {x['why']} `[{x['src']}]`" for x in s["caseFacts"]]
        md += ["", "### What a strong student brings to class", ""] + [f"- {x}" for x in s["strongAnalysis"]]
        md += ["", "### Strongest counterargument", "", f"- **Argument:** {s['counter']['argument']}", f"- **Response:** {s['counter']['response']}"]
        md += ["", f"### Course map", "", f"{s['courseMap']['text']} `[{s['courseMap']['src']}]`"]
        if s["slideExtras"]:
            md += ["", "### Slide content beyond the brief", ""] + [f"- **{x['topic']}**: {x['detail']} `[{x['src']}]`" for x in s["slideExtras"]]
        if s["quant"]:
            md += ["", "### Quantitative pieces", ""] + [f"- {x['what']} `[{x['src']}]`" for x in s["quant"]]
        if s["gaps"]:
            md += ["", "### Gaps", ""] + [f"- {g}" for g in s["gaps"]]
        md.append("")
    (OUT / "content-map.md").write_text("\n".join(md))
    counts = {s["id"]: (len(s["terms"]), len(s["claims"]), len(s["caseFacts"])) for s in sessions}
    print("sessions:", len(sessions), "terms/claims/facts:", counts)
    if problems:
        print("\n".join(problems))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
