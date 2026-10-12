"""Make 2x2 contact sheets of rasterized slides: work/contact/<deck>/sNN.png"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
root = Path(__file__).resolve().parent.parent / "work"
for deck in sorted((root / "slides").iterdir()):
    pages = sorted(deck.glob("p*.png"))
    if not pages: continue
    out = root / "contact" / deck.name
    out.mkdir(parents=True, exist_ok=True)
    W = 760
    for i in range(0, len(pages), 4):
        ims = [Image.open(p).convert("RGB") for p in pages[i:i+4]]
        ims = [im.resize((W, int(im.height * W / im.width))) for im in ims]
        H = max(im.height for im in ims)
        sheet = Image.new("RGB", (W * 2 + 10, H * 2 + 10), "white")
        d = ImageDraw.Draw(sheet)
        for j, im in enumerate(ims):
            x, y = (j % 2) * (W + 10), (j // 2) * (H + 10)
            sheet.paste(im, (x, y))
            d.rectangle([x, y, x + 60, y + 22], fill="black")
            d.text((x + 5, y + 5), f"p{i+j+1}", fill="yellow")
        sheet.save(out / f"s{i//4+1:02d}.png")
