#!/usr/bin/env python3
"""public/og-cover.png(1200x630)와 og-cover-en.png를 만든다. 손으로 한 번 돌리는 스크립트다.

왜 이 파일이 여기 있나: 예전에는 OG 이미지로 앱 아이콘(1200x1200 정사각)을
그대로 썼다. 카카오톡·슬랙·X의 큰 카드는 **가로 1.91:1**을 기대하므로 정사각을
넣으면 잘리거나 작은 카드로 떨어진다.

디자인은 **Play 스토어 피처 그래픽(1024x500)과 같은 얼굴**이다(PO 지정, 08-08) —
테라코타 풀블리드 배경 + 모서리의 큰 원호 두 개 + 가운데 로고·워드마크·슬로건.
스토어와 링크 미리보기가 같은 인상을 주는 편이 브랜드에 낫다.

문구를 바꾸려면 아래 상수만 고치고 다시 돌린 뒤 결과 PNG를 커밋한다.
빌드에는 끼우지 않는다 — 이미지는 자주 바뀌지 않고, 빌드에 파이썬·폰트
의존을 더할 이유가 없다.

    python3 scripts/og-cover.py      # Pillow 필요

폰트는 앱 저장소의 node_modules에서 가져온다(같은 서체를 앱·웹이 함께 쓴다).
없으면 시스템 폰트로 떨어지지 않고 그냥 실패시킨다 — 엉뚱한 서체로 만들어진
브랜드 이미지가 조용히 배포되는 것보다 낫다.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Design_System_Chaerok.md의 토큰
BRAND = (201, 96, 58)  # chaerok-600 — 배경
ARC = (214, 120, 84)  # 배경 위 원호 (밝은 쪽)
PAPER = (255, 253, 248)
WORD = (250, 245, 240)

VARIANTS = {
    "og-cover.png": {"word": "채록", "lede": "놓치지 않고, 대신 기억합니다", "serif": True},
    "og-cover-en.png": {"word": "Chaerok", "lede": "Your second brain that connects thoughts", "serif": False},
}

REPO = Path(__file__).resolve().parents[1]
FONTS = REPO.parent / "node_modules" / "@expo-google-fonts"
SERIF = FONTS / "noto-serif-kr" / "700Bold" / "NotoSerifKR_700Bold.ttf"
SANS_BOLD = FONTS / "noto-sans-kr" / "700Bold" / "NotoSansKR_700Bold.ttf"
SANS = FONTS / "noto-sans-kr" / "500Medium" / "NotoSansKR_500Medium.ttf"
LOGO = REPO / "src" / "assets" / "logo.png"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    if not path.exists():
        raise SystemExit(f"폰트를 찾지 못했습니다: {path}\n앱 저장소에서 npm install 후 다시 돌리세요.")
    return ImageFont.truetype(str(path), size)


def white_logo(px: int) -> Image.Image:
    """로고를 흰색으로 칠한다 — 원본은 테라코타라 같은 색 배경에서 사라진다."""
    logo = Image.open(LOGO).convert("RGBA").resize((px, px), Image.LANCZOS)
    solid = Image.new("RGBA", logo.size, PAPER + (255,))
    solid.putalpha(logo.getchannel("A"))
    return solid


def draw_arcs(img: Image.Image) -> None:
    """좌상단·우하단의 큰 원호 — 스토어 피처 그래픽과 같은 배경 패턴."""
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    # 좌상단: 큰 원 하나가 모서리를 물고 들어온다
    d.ellipse([-330, -430, 250, 150], fill=ARC + (255,))
    d.ellipse([-250, -350, 170, 70], fill=BRAND + (255,))
    # 우하단: 도넛 모양 (바깥 원 - 안쪽 원)
    d.ellipse([W - 210, H - 250, W + 330, H + 290], fill=ARC + (255,))
    d.ellipse([W - 120, H - 160, W + 240, H + 200], fill=BRAND + (255,))
    img.alpha_composite(layer)


def build(name: str, spec: dict) -> None:
    img = Image.new("RGBA", (W, H), BRAND + (255,))
    draw_arcs(img)
    d = ImageDraw.Draw(img)

    logo_px = 168
    word_font = font(SERIF if spec["serif"] else SANS_BOLD, 128)
    gap = 36

    word = spec["word"]
    wbox = d.textbbox((0, 0), word, font=word_font)
    word_w, word_h = wbox[2] - wbox[0], wbox[3] - wbox[1]

    row_w = logo_px + gap + word_w
    x = (W - row_w) // 2
    row_cy = 268

    logo = white_logo(logo_px)
    img.paste(logo, (x, row_cy - logo_px // 2), logo)
    d.text((x + logo_px + gap, row_cy - word_h // 2 - wbox[1]), word, font=word_font, fill=WORD)

    lede_font = font(SANS, 38)
    lbox = d.textbbox((0, 0), spec["lede"], font=lede_font)
    d.text(((W - (lbox[2] - lbox[0])) // 2, 424), spec["lede"], font=lede_font, fill=PAPER)

    out = REPO / "public" / name
    img.convert("RGB").save(out, "PNG", optimize=True)
    print(f"만들었습니다: {out} ({W}x{H}, {out.stat().st_size // 1024}KB)")


def main() -> None:
    for name, spec in VARIANTS.items():
        build(name, spec)


if __name__ == "__main__":
    main()
