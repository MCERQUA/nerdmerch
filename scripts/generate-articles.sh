#!/bin/bash
# Generate blog articles for NERDMERCH using maxcode
# Usage: bash scripts/generate-articles.sh [start_index] [end_index]
# Example: bash scripts/generate-articles.sh 1 5  (generates articles 1-5)
# Default: generates all 30

SITE_DIR="/mnt/clients/test-dev/openclaw/workspace/Websites/nerdmerch"
OUTPUT_DIR="$SITE_DIR/scripts/generated-articles"
BLOG_TS="$SITE_DIR/src/lib/blog.ts"

mkdir -p "$OUTPUT_DIR"

# Read existing blog.ts for context
EXISTING_CATEGORIES='["dev-culture", "behind-the-design", "merch-drops", "tech-humor"]'

# Product slugs for relatedProducts references
PRODUCTS='["github-parody","bash-sleep-run","im-absolutely-right","sudo-sandwich","404-sleep","rm-rf-danger","merge-no-conflicts","no-dependencies","fuck-it-ship-it","im-loggin-it","terminal-illness","push-it","fork-it","yolo-mode","got-tokens","sam-altman-owes-me","dangerously-skip-permissions","only-bots","fine-tuned-mom","trained-deez-nuts","got-root","show-me-backend","safe-word-ctrl-c","penetration-tested","gpu-hotter-girlfriend","wanna-see-my-vps","dtf-down-to-fork","only-commit-git"]'

# Article definitions: slug|title|category|related_products|excerpt_hint
ARTICLES=(
  "psychology-of-code-humor|The Psychology of Code Humor — Why Developers Need to Laugh|dev-culture|fuck-it-ship-it,terminal-illness,merge-no-conflicts|Why humor is essential in high-stress technical work and how merch became the medium"
  "conference-swag-vs-real-merch|Conference Swag vs Real Merch — The Evolution of Tech Fashion|dev-culture|github-parody,no-dependencies,im-absolutely-right|From free XL polos to curated statement pieces — how developer fashion grew up"
  "terminal-aesthetics-developer-style|Why Terminal Aesthetics Dominate Developer Style|dev-culture|bash-sleep-run,rm-rf-danger,404-sleep|The visual language of CLIs, dark themes, and monospace fonts in fashion"
  "developer-dress-code|The Developer Dress Code — From Hoodies to Statement Tees|dev-culture|sudo-sandwich,works-on-my-machine,fuck-it-ship-it|How the tech industry redefined professional attire"
  "open-source-culture-merch|Open Source Culture and the Merch That Represents It|dev-culture|github-parody,fork-it,push-it|Why the open source ethos translates perfectly to wearable culture"
  "works-on-my-machine|Why 'Works on My Machine' Is More Than a Meme|dev-culture|no-dependencies,yolo-mode,fuck-it-ship-it|The phrase that captures every deployment disaster in four words"
  "rise-of-vibe-coding|The Rise of Vibe Coding — And the Merch It Inspired|dev-culture|dangerously-skip-permissions,yolo-mode,fuck-it-ship-it|How AI-assisted coding created a whole new development philosophy"
  "remote-work-developer-fashion|Remote Work Fashion — What Developers Actually Wear on Camera|dev-culture|im-absolutely-right,sudo-sandwich,got-tokens|The Zoom-era wardrobe: business on top, NERDMERCH underneath"
  "story-behind-got-root|The Story Behind 'Got Root' — Layers of Meaning|behind-the-design|got-root,penetration-tested,show-me-backend|How one sysadmin term became our most layered double-meaning design"
  "designing-im-loggin-it|Designing 'I'm Loggin' It' — Fast Food Meets Fast Debugging|behind-the-design|im-loggin-it,bash-sleep-run,terminal-illness|The art of merging brand parody with developer daily life"
  "how-404-sleep-captures-dev-life|How '404: Sleep Not Found' Captures Developer Life|behind-the-design|404-sleep,bash-sleep-run,terminal-illness|Turning HTTP errors into existential commentary on developer health"
  "making-of-dangerously-skip-permissions|The Making of 'Dangerously Skip Permissions'|behind-the-design|dangerously-skip-permissions,yolo-mode,rm-rf-danger|When AI tooling flags became the new cowboy developer badge"
  "why-fuck-it-ship-it-best-seller|Why 'F*ck It, Ship It' Became Our Best Seller|behind-the-design|fuck-it-ship-it,yolo-mode,push-it|The universal developer mantra and why it resonates with every engineer"
  "creating-github-parody-logo|Creating the GitHub Parody Logo — Satire as Art|behind-the-design|github-parody,fork-it,merge-no-conflicts|How we walked the line between homage and commentary with our most recognizable design"
  "safe-word-ctrl-c-designing-double-take|'My Safe Word Is Ctrl+C' — Designing for the Double Take|behind-the-design|safe-word-ctrl-c,penetration-tested,got-root|The craft of making shirts that get funnier the longer you think about them"
  "terminal-illness-dark-humor-dev-culture|Terminal Illness — When Dark Humor Meets Developer Culture|behind-the-design|terminal-illness,404-sleep,bash-sleep-run|Why developers embrace gallows humor and how we designed around it"
  "complete-guide-git-pickup-lines|The Complete Guide to Git Pickup Lines|tech-humor|dtf-down-to-fork,only-commit-git,merge-no-conflicts|Every romantic thing you can say with version control terminology"
  "why-sudo-jokes-never-die|Why sudo Jokes Will Never Die|tech-humor|sudo-sandwich,got-root,rm-rf-danger|The immortal humor of superuser privileges and the xkcd that started it all"
  "linux-humor-love-letter|Linux Humor — A Love Letter to the Command Line|tech-humor|bash-sleep-run,rm-rf-danger,got-root|From kernel panics to permission denied — why Linux users are the funniest people in tech"
  "programming-puns-explained|The Best Programming Puns Explained for Non-Developers|tech-humor|im-absolutely-right,no-dependencies,im-loggin-it|A decoder ring for every tech joke on a NERDMERCH shirt"
  "npm-install-humor|npm install humor — JavaScript Culture in T-Shirt Form|tech-humor|no-dependencies,fuck-it-ship-it,yolo-mode|Why the JS ecosystem generates more jokes per capita than any other language"
  "stack-overflow-energy|Stack Overflow Energy — The Humor of Developer Q&A|tech-humor|merge-no-conflicts,im-absolutely-right,no-dependencies|Closed as duplicate: the comedy of programmer problem-solving culture"
  "rubber-duck-debugging-dev-rituals|Rubber Duck Debugging and Other Dev Rituals Worth Wearing|tech-humor|terminal-illness,bash-sleep-run,im-loggin-it|The superstitions, habits, and coping mechanisms that define developer life"
  "funniest-error-messages|The Funniest Error Messages That Became Internet Legend|tech-humor|404-sleep,rm-rf-danger,no-dependencies|From 'PC LOAD LETTER' to 'segfault' — errors that transcended tech into culture"
  "how-to-build-ai-wardrobe|How to Build an AI Wardrobe — The Essential Collection|merch-drops|got-tokens,sam-altman-owes-me,dangerously-skip-permissions|Curating the perfect AI-culture closet from our catalog"
  "token-economics-ai-humor|Token Economics — Why AI Humor Is the New Tech Comedy|merch-drops|got-tokens,only-bots,fine-tuned-mom|How LLM terminology created an entirely new comedy vocabulary"
  "sam-altman-owes-me-training-data|'Sam Altman Owes Me Money' and the AI Training Data Debate|merch-drops|sam-altman-owes-me,trained-deez-nuts,got-tokens|The real economics behind the joke — who owns your data?"
  "gpt-to-fashion-llm-culture|From GPT to Fashion — How LLMs Changed Internet Culture|merch-drops|got-tokens,only-bots,dangerously-skip-permissions|The cultural shockwave of AI and how it hit the merch world"
  "agent-era-talk-to-my-agent|The Agent Era — Why 'Talk to My Agent' Hits Different Now|merch-drops|dangerously-skip-permissions,got-tokens,only-bots|When Hollywood lingo became tech terminology"
  "summer-2026-collection-preview|Summer 2026 Collection Preview — What's Next for NERDMERCH|merch-drops|gpu-hotter-girlfriend,wanna-see-my-vps,show-me-backend|Sneak peek at upcoming designs and the themes driving our next drop"
)

START=${1:-1}
END=${2:-${#ARTICLES[@]}}

echo "=== NERDMERCH Blog Article Generator ==="
echo "Generating articles $START to $END of ${#ARTICLES[@]} total"
echo ""

for i in $(seq $((START - 1)) $((END - 1))); do
  IFS='|' read -r SLUG TITLE CATEGORY RELATED HINT <<< "${ARTICLES[$i]}"

  OUTFILE="$OUTPUT_DIR/${SLUG}.json"

  if [ -f "$OUTFILE" ]; then
    echo "[$((i+1))/${#ARTICLES[@]}] SKIP (exists): $TITLE"
    continue
  fi

  echo "[$((i+1))/${#ARTICLES[@]}] Generating: $TITLE"

  # Build the prompt
  PROMPT="You are writing a blog article for NERDMERCH, a premium developer/tech humor t-shirt brand. The site sells \$20 tees with designs about coding, AI, and tech culture.

Write a complete blog article in JSON format. Output ONLY valid JSON, no markdown fences, no explanation.

Article details:
- Title: $TITLE
- Category: $CATEGORY
- Related product slugs: $RELATED
- Topic hint: $HINT

The article should be:
- 800-1200 words of actual content
- Written in a confident, casual, insider tone — like a developer writing for developers
- Include 3-5 ## subheadings
- Reference specific NERDMERCH products naturally (use the related product slugs)
- Include code snippets in \`backticks\` or \`\`\` code blocks where relevant
- Be genuinely interesting and informative, not just product promotion
- Mix humor with real insight about developer/tech culture

Output this exact JSON structure:
{
  \"slug\": \"$SLUG\",
  \"title\": \"$TITLE\",
  \"excerpt\": \"A compelling 1-2 sentence summary\",
  \"content\": \"The full article text with ## headings, \`code\`, **bold**, and *italic* markdown\",
  \"category\": \"$CATEGORY\",
  \"date\": \"2026-03-24\",
  \"readTime\": <estimated minutes>,
  \"relatedProducts\": [$(echo "$RELATED" | sed 's/,/\",\"/g' | sed 's/^/\"/;s/$/\"/')]
}

IMPORTANT: Output ONLY the JSON object. No other text."

  # Run maxcode with the prompt, capture output
  RESULT=$(maxcode --print -p "$PROMPT" 2>/dev/null)

  if [ $? -eq 0 ] && [ -n "$RESULT" ]; then
    # Try to extract JSON from the result (in case there's wrapper text)
    echo "$RESULT" | python3 -c "
import sys, json
text = sys.stdin.read()
# Find JSON object in text
start = text.find('{')
end = text.rfind('}') + 1
if start >= 0 and end > start:
    obj = json.loads(text[start:end])
    print(json.dumps(obj, indent=2))
    sys.exit(0)
sys.exit(1)
" > "$OUTFILE" 2>/dev/null

    if [ $? -eq 0 ]; then
      echo "  -> Saved to $OUTFILE"
    else
      echo "  -> ERROR: Failed to parse JSON output"
      rm -f "$OUTFILE"
    fi
  else
    echo "  -> ERROR: maxcode failed"
  fi

  # Small delay between requests
  sleep 2
done

echo ""
echo "=== Generation complete ==="
echo "Generated articles in: $OUTPUT_DIR"
echo ""
echo "To merge into blog.ts, run:"
echo "  bash scripts/merge-articles.sh"
