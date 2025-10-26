from PIL import Image, ImageDraw, ImageFont
import os

# Tesettür Giyim renkleri
PRIMARY_COLOR = (139, 71, 137)  # #8B4789 Mor
BACKGROUND_COLOR = (249, 245, 240)  # #F9F5F0 Krem

assets_dir = os.path.join(os.path.dirname(__file__), 'assets')
os.makedirs(assets_dir, exist_ok=True)

# 1. Icon (1024x1024)
print("Creating icon.png...")
icon = Image.new('RGB', (1024, 1024), PRIMARY_COLOR)
draw = ImageDraw.Draw(icon)
# Basit bir "T" harfi (Tesettür)
draw.ellipse([256, 256, 768, 768], fill=BACKGROUND_COLOR)
icon.save(os.path.join(assets_dir, 'icon.png'))
print("✓ icon.png created")

# 2. Adaptive Icon (1024x1024)
print("Creating adaptive-icon.png...")
adaptive = Image.new('RGB', (1024, 1024), PRIMARY_COLOR)
draw = ImageDraw.Draw(adaptive)
draw.ellipse([256, 256, 768, 768], fill=BACKGROUND_COLOR)
adaptive.save(os.path.join(assets_dir, 'adaptive-icon.png'))
print("✓ adaptive-icon.png created")

# 3. Splash Screen (1284x2778 iPhone 14 Pro Max)
print("Creating splash.png...")
splash = Image.new('RGB', (1284, 2778), PRIMARY_COLOR)
draw = ImageDraw.Draw(splash)
# Ortada büyük daire
center_x, center_y = 642, 1389
radius = 300
draw.ellipse([center_x-radius, center_y-radius, center_x+radius, center_y+radius], 
             fill=BACKGROUND_COLOR)
splash.save(os.path.join(assets_dir, 'splash.png'))
print("✓ splash.png created")

# 4. Favicon (48x48)
print("Creating favicon.png...")
favicon = Image.new('RGB', (48, 48), PRIMARY_COLOR)
draw = ImageDraw.Draw(favicon)
draw.ellipse([12, 12, 36, 36], fill=BACKGROUND_COLOR)
favicon.save(os.path.join(assets_dir, 'favicon.png'))
print("✓ favicon.png created")

print("\n✅ All icons created successfully!")
print(f"Location: {assets_dir}")
