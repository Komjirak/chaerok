#!/usr/bin/env python3
"""public/og-cover.png(1200x630)를 만든다. 손으로 한 번 돌리는 스크립트다.

왜 이 파일이 여기 있나: 예전에는 OG 이미지로 앱 아이콘(1200x1200 정사각)을
그대로 썼다. 카카오톡·슬랙·X의 큰 카드는 **가로 1.91:1**을 기대하므로 정사각을
넣으면 잘리거나 작은 카드로 떨어진다(그래서 twitter:card를 summary로 낮춰
뒀었다). 이제 전용 가로 이미지를 만들어 summary_large_image로 되돌렸다.

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
PAPER = (255, 253, 248)
BRAND = (201, 96, 58)
BRAND_DEEP = (140, 58, 30)
INK = (26, 20, 16)
INK_MUTED = (111, 98, 85)

TITLE = "당신의 두 번째 뇌, 채록"
LEDE = "던지기만 하면, 나머지는 채록이가"
SUB = "메모 · 링크 · 스크린샷을 AI가 요약하고 이어 둡니다"
FOOT = "chaerok.komjirak.studio"

REPO = Path(__file__).resolve().parents[1]
FONTS = REPO.parent / "node_modules" / "@expo-google-fonts"
SERIF = FONTS / "noto-serif-kr" / "700Bold" / "NotoSerifKR_700Bold.ttf"
SANS = FONTS / "noto-sans-kr" / "500Medium" / "NotoSansKR_500Medium.ttf"
SANS_BOLD = FONTS / "noto-sans-kr" / "700Bold" / "NotoSansKR_700Bold.ttf"
ICON = REPO / "src" / "assets" / "logo.png"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    if not path.exists():
        raise SystemExit(f"폰트를 찾지 못했습니다: {path}\n앱 저장소에서 npm install 후 다시 돌리세요.")
    return ImageFont.truetype(str(path), size)


def main() -> None:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # 왼쪽 테라코타 띠 — 브랜드 색을 한 곳에만 쓴다(디자인 시스템의 희소성 규칙)
    d.rectangle([0, 0, 14, H], fill=BRAND)

    x = 92
    y = 118

    logo = Image.open(ICON).convert("RGBA").resize((112, 112), Image.LANCZOS)
    img.paste(logo, (x, y), logo)

    d.text((x + 132, y + 22), "채록  chaerok", font=font(SANS_BOLD, 34), fill=BRAND_DEEP)

    y += 168
    d.text((x, y), TITLE, font=font(SERIF, 74), fill=INK)

    y += 104
    d.text((x, y), LEDE, font=font(SANS_BOLD, 40), fill=BRAND)

    y += 66
    d.text((x, y), SUB, font=font(SANS, 30), fill=INK_MUTED)

    d.text((x, H - 86), FOOT, font=font(SANS, 26), fill=INK_MUTED)

    out = REPO / "public" / "og-cover.png"
    img.save(out, "PNG", optimize=True)
    print(f"만들었습니다: {out} ({W}x{H}, {out.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
