#!/bin/bash
# Merge generated article JSONs into blog.ts
# Usage: bash scripts/merge-articles.sh

SITE_DIR="/mnt/clients/test-dev/openclaw/workspace/Websites/nerdmerch"
OUTPUT_DIR="$SITE_DIR/scripts/generated-articles"
BLOG_TS="$SITE_DIR/src/lib/blog.ts"

if [ ! -d "$OUTPUT_DIR" ] || [ -z "$(ls -A "$OUTPUT_DIR" 2>/dev/null)" ]; then
  echo "No generated articles found in $OUTPUT_DIR"
  exit 1
fi

echo "=== Merging articles into blog.ts ==="

# Use Python to merge
python3 << 'PYEOF'
import json, glob, os, re

site_dir = "/mnt/clients/test-dev/openclaw/workspace/Websites/nerdmerch"
articles_dir = f"{site_dir}/scripts/generated-articles"
blog_ts = f"{site_dir}/src/lib/blog.ts"

# Read existing blog.ts to extract current posts
with open(blog_ts, "r") as f:
    content = f.read()

# Extract existing slugs
existing_slugs = set(re.findall(r'slug:\s*"([^"]+)"', content))
print(f"Existing posts: {len(existing_slugs)}")

# Load all generated articles
new_articles = []
for fpath in sorted(glob.glob(f"{articles_dir}/*.json")):
    try:
        with open(fpath) as f:
            article = json.load(f)
        if article["slug"] not in existing_slugs:
            new_articles.append(article)
            print(f"  + {article['slug']}")
        else:
            print(f"  SKIP (exists): {article['slug']}")
    except Exception as e:
        print(f"  ERROR loading {fpath}: {e}")

if not new_articles:
    print("No new articles to merge.")
    exit(0)

print(f"\nMerging {len(new_articles)} new articles...")

# Find the closing bracket of blogPosts array
# Pattern: find the last ]; before blogCategories
marker = "export const blogCategories"
marker_pos = content.find(marker)
if marker_pos < 0:
    print("ERROR: Could not find blogCategories marker in blog.ts")
    exit(1)

# Find the ]; before that marker
insert_pos = content.rfind("];", 0, marker_pos)
if insert_pos < 0:
    print("ERROR: Could not find blogPosts array end")
    exit(1)

# Build new article entries as TypeScript
def escape_ts(s):
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

entries = []
for a in new_articles:
    related = ", ".join(f'"{s}"' for s in a.get("relatedProducts", []))
    featured_line = f"\n    featured: true," if a.get("featured") else ""
    entry = f"""  {{
    slug: "{a['slug']}",
    title: "{a['title']}",
    excerpt: "{a['excerpt']}",
    content: `{escape_ts(a['content'])}`,
    category: "{a['category']}",
    date: "{a['date']}",
    readTime: {a['readTime']},{featured_line}
    relatedProducts: [{related}],
  }}"""
    entries.append(entry)

insert_text = ",\n" + ",\n".join(entries) + "\n"

# Insert before the ];
new_content = content[:insert_pos] + insert_text + content[insert_pos:]

with open(blog_ts, "w") as f:
    f.write(new_content)

print(f"Done! blog.ts now has {len(existing_slugs) + len(new_articles)} posts.")
PYEOF

echo ""
echo "=== Merge complete ==="
