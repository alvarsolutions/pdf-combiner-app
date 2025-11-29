from PIL import Image, ImageDraw
import os

def add_corners(image_path, output_path, radius):
    img = Image.open(image_path).convert("RGBA")
    
    # Create a mask for rounded corners
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), img.size], radius=radius, fill=255)
    
    # Apply the mask
    result = Image.new('RGBA', img.size)
    result.paste(img, (0, 0), mask=mask)
    
    result.save(output_path)
    print(f"Saved rounded icon to {output_path}")

# Process the source icon
# Standard iOS/macOS icon curvature is roughly 22% of the dimension
# For a 1024x1024 icon, that's about 225px radius
if os.path.exists('build/icon-source.png'):
    add_corners('build/icon-source.png', 'build/icon-rounded.png', radius=225)
else:
    print("Source icon not found!")
