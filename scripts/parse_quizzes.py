"""Parse Comprehension Quiz result pages (work/quizzes/*/page.html) into src/content/questions/cq.json.

Each question keeps the professor's stem, options, correct answer, and General Feedback verbatim
(sanitized HTML). Run after scripts/ingest.py.
"""
import json, re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
ALLOWED = {"p", "br", "sub", "sup", "strong", "em", "b", "i", "table", "thead", "tbody", "tr", "td", "th", "ul", "ol", "li"}


def clean(node):
    soup = BeautifulSoup(str(node), "html.parser")
    for sr in soup.select(".css-r9cwls-screenReaderContent"):
        sr.decompose()
    for tag in soup.find_all(True):
        if tag.name not in ALLOWED:
            tag.unwrap()
        else:
            tag.attrs = {}
    html = str(soup).replace("\xa0", " ").strip()
    html = re.sub(r"<p>\s*</p>", "", html)
    return html


def parse(path, quiz_no):
    soup = BeautifulSoup(path.read_text(errors="ignore"), "html.parser")
    heads = [h for h in soup.find_all("h3") if re.match(r"Results for question \d+\.", h.get_text())]
    out = []
    for h in heads:
        n = int(re.findall(r"\d+", h.get_text())[0])
        # climb to the container holding this question (the parent that also has the feedback)
        box = h
        while box is not None and not box.find(string=re.compile("General Feedback")):
            box = box.parent
        # the box may contain later questions too; cut at the next heading
        qtype = box.find(attrs={"data-automation": "sdk-interaction-type-name-div"}).get_text(strip=True)
        user = box.find_all("div", class_="user_content")
        stem = user[0]
        labels = box.find_all("span", class_=re.compile("radioInput__label"))
        options, correct = [], None
        for i, lab in enumerate(labels):
            radio = lab.find_parent("div", attrs={"data-cid": "RadioInput"})
            is_correct = any(
                "Correct answer" in sib.get_text()
                for sib in radio.parent.find_all(recursive=False)
                if sib is not radio
            )
            uc = lab.find("div", class_="user_content")
            options.append(clean(uc) if uc else lab.get_text(strip=True))
            if is_correct and correct is None:
                correct = i
        fb = box.find(string=re.compile("General Feedback")).find_parent().find_next("div", class_="user_content")
        if qtype == "True or False" and not options:
            options = ["True", "False"]
        out.append({
            "id": f"CQ{quiz_no}-Q{n}",
            "quiz": quiz_no,
            "number": n,
            "type": "tf" if qtype.startswith("True") else "mc",
            "stemHtml": clean(stem),
            "optionsHtml": options,
            "correct": correct,
            "feedbackHtml": clean(fb),
        })
    return out


def main():
    allq = []
    for d in sorted((ROOT / "work" / "quizzes").iterdir()):
        m = re.search(r"Quiz-(\d+)", d.name)
        if not m or not (d / "page.html").exists():
            continue
        allq += parse(d / "page.html", int(m.group(1)))
    dest = ROOT / "src" / "content" / "questions" / "cq.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(allq, indent=1, ensure_ascii=False))
    bad = [q["id"] for q in allq if q["correct"] is None]
    print(f"{len(allq)} questions; missing correct: {bad}")


if __name__ == "__main__":
    main()
