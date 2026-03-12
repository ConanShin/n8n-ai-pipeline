import os
import json

with open('docs/feature/BASEBALL-011/2026-03-12_11-08-29/design-specs.json', 'r', encoding='utf-8') as f:
    specs = json.load(f)

# Create directories
os.makedirs('src/components/atoms', exist_ok=True)
os.makedirs('src/components/molecules', exist_ok=True)
os.makedirs('src/components/organisms', exist_ok=True)
os.makedirs('src/components/templates', exist_ok=True)
os.makedirs('src/components/pages', exist_ok=True)

# We will just write all the component code manually since generating 22 robust React components from JSON 
# programmatically with full game logic is too complex and error-prone for a simple script. 
# It's better if I output the full React code directly into the Python script as a giant string, 
# then the Python script writes it to individual files and preview.html.

