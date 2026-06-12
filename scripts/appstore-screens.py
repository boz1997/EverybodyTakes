#!/usr/bin/env python3
"""App Store screenshot composer.

Takes raw iPhone screenshots and produces 6.5" (1284x2778) store images in
the GuestCam editorial style: warm paper gradient, serif headline, the real
UI in a rounded card. Apple 2.3.3 wants the actual app to dominate — the
screenshot fills most of the frame; the headline is a small caption.

Usage: python3 scripts/appstore-screens.py
Edit SHOTS below to change inputs/captions. Output: ~/Downloads/appstore-screens/
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1284, 2778
BG_TOP, BG_BOTTOM = (243, 236, 220), (234, 224, 204)   # gradients.page
INK = (34, 29, 22)            # text.primary
AMBER = (190, 106, 46)        # brand
BORDER = (220, 210, 191)      # border.DEFAULT
SERIF = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'

DOWNLOADS = os.path.expanduser('~/Downloads')
OUT = os.path.join(DOWNLOADS, 'appstore-screens')

# (filename, headline lines, full_bleed)
SHOTS = [
    ('IMG_8341.jpeg', ['Every guest is', 'a photographer'], True),
    ('IMG_8517.png',  ['One live', 'shared gallery'], False),
    ('IMG_8516.png',  ['Share a QR —', 'guests join in seconds'], False),
    ('IMG_8519.png',  ['Relive every', 'moment together'], False),
    ('IMG_8518.png',  ['Host or join', 'in seconds'], False),
]


def gradient(size, top, bottom):
    base = Image.new('RGB', (1, size[1]))
    for y in range(size[1]):
        t = y / (size[1] - 1)
        base.putpixel((0, y), tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)))
    return base.resize(size)


def rounded(im, radius):
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, *im.size], radius=radius, fill=255)
    out = Image.new('RGBA', im.size)
    out.paste(im, (0, 0), mask)
    return out


def headline(draw, lines, y, fill=INK, size=104):
    font = ImageFont.truetype(SERIF, size)
    for line in lines:
        w = draw.textlength(line, font=font)
        draw.text(((W - w) / 2, y), line, font=font, fill=fill)
        y += int(size * 1.18)
    return y


def card_shot(src, lines):
    """Screenshot inside a realistic iPhone body — titanium frame, bezel,
    Dynamic Island, side buttons — on the paper gradient."""
    canvas = gradient((W, H), BG_TOP, BG_BOTTOM).convert('RGBA')
    draw = ImageDraw.Draw(canvas)
    headline(draw, lines, 150)

    bezel = 26
    screen_w = 920
    shot = Image.open(src).convert('RGB')
    screen_h = round(screen_w * shot.height / shot.width)
    dev_w, dev_h = screen_w + bezel * 2, screen_h + bezel * 2
    x0 = (W - dev_w) // 2
    top = 470
    body_r, screen_r = 152, 126

    # drop shadow
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [x0, top + 26, x0 + dev_w, top + dev_h + 26], radius=body_r, fill=(20, 15, 8, 110))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(34)))
    draw = ImageDraw.Draw(canvas)

    # side buttons (drawn first so the body overlaps their inner edge)
    btn = (70, 70, 74)
    for by, bh in [(top + 360, 110), (top + 510, 190), (top + 740, 190)]:   # action, vol+, vol-
        draw.rounded_rectangle([x0 - 7, by, x0 + 8, by + bh], radius=7, fill=btn)
    draw.rounded_rectangle([x0 + dev_w - 8, top + 560, x0 + dev_w + 7, top + 560 + 260], radius=7, fill=btn)

    # titanium body + inner bezel
    draw.rounded_rectangle([x0, top, x0 + dev_w, top + dev_h], radius=body_r, fill=(58, 58, 62))
    draw.rounded_rectangle([x0 + 4, top + 4, x0 + dev_w - 4, top + dev_h - 4], radius=body_r - 5, fill=(28, 27, 30))

    # screen
    screen = rounded(shot.resize((screen_w, screen_h)), screen_r)
    canvas.paste(screen, (x0 + bezel, top + bezel), screen)
    draw = ImageDraw.Draw(canvas)

    # Dynamic Island
    iw, ih = 286, 82
    ix = x0 + (dev_w - iw) // 2
    iy = top + bezel + 24
    draw.rounded_rectangle([ix, iy, ix + iw, iy + ih], radius=ih // 2, fill=(10, 10, 12))
    return canvas


def hero_shot(src, lines):
    photo = Image.open(src).convert('RGB')
    scale = max(W / photo.width, H / photo.height)
    photo = photo.resize((round(photo.width * scale), round(photo.height * scale)))
    x = (photo.width - W) // 2
    canvas = photo.crop((x, 0, x + W, H)).convert('RGBA')

    # dark top scrim so the headline reads over the photo
    scrim = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(620):
        sd.line([(0, y), (W, y)], fill=(20, 14, 8, round(190 * (1 - y / 620))))
    canvas = Image.alpha_composite(canvas, scrim)

    headline(ImageDraw.Draw(canvas), lines, 130, fill=(248, 243, 232))
    return canvas


def main():
    os.makedirs(OUT, exist_ok=True)
    for i, (name, lines, full_bleed) in enumerate(SHOTS, 1):
        src = os.path.join(DOWNLOADS, name)
        img = hero_shot(src, lines) if full_bleed else card_shot(src, lines)
        path = os.path.join(OUT, f'{i:02d}-{os.path.splitext(name)[0]}.png')
        img.convert('RGB').save(path, 'PNG')
        print('wrote', path, img.size)


if __name__ == '__main__':
    main()
