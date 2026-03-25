export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "dev-culture" | "behind-the-design" | "merch-drops" | "tech-humor";
  date: string;
  readTime: number;
  featured?: boolean;
  relatedProducts?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-developers-wear-their-code",
    title: "Why Developers Wear Their Code",
    excerpt: "The rise of developer merch culture — from conference swag to statement pieces that flex your stack.",
    content: `There's something deeply satisfying about wearing a shirt that only other developers understand. It's a secret handshake you can see from across the room.

## The Evolution of Dev Merch

Developer merchandise has come a long way from the free conference t-shirt stuffed in the back of your closet. What started as promotional swag has evolved into a full-blown subculture of wearable code humor.

The best dev shirts work on multiple levels. Take "I'm Absolutely Right" — to a normal person, it's a confidence statement. To a CSS developer, it's \`position: absolute; right: 0;\` and that dual meaning is what makes it perfect.

## Why We Wear What We Wear

Developers are problem solvers by nature. We spend our days translating complex logic into clean, elegant solutions. Naturally, we appreciate the same craft in our clothing — a joke that compiles on multiple levels, a reference that passes every edge case.

It's also tribal. Wearing a "Got Tokens?" shirt at a tech meetup is an instant conversation starter. You're signaling that you're not just in tech — you're *in* tech. You know what context windows are. You've hit rate limits at 3 AM.

## The $20 Philosophy

Every NERDMERCH tee is $20. Not because we're cutting corners — because we believe great design shouldn't cost $35+ just because it has a clever pun. Premium cotton, direct-to-garment printing, no markup games. The value is in the design, not the price tag.

Wear what you build. Build what you believe. And if someone asks about your shirt, you've already won.`,
    category: "dev-culture",
    date: "2026-03-20",
    readTime: 4,
    featured: true,
    relatedProducts: ["im-absolutely-right", "got-tokens", "fuck-it-ship-it"],
  },
  {
    slug: "designing-the-sudo-sandwich",
    title: "Designing the Sudo Sandwich",
    excerpt: "How we turned a classic xkcd reference into one of our best-selling tees — and why simplicity wins.",
    content: `Some jokes are timeless. The "sudo make me a sandwich" bit has been circulating since xkcd published it in 2008, and it still gets a laugh every time.

## The Original Joke

For the uninitiated: in Unix/Linux, \`sudo\` gives you superuser privileges. The joke goes:

\`\`\`
$ make me a sandwich
> What? Make it yourself.
$ sudo make me a sandwich
> Okay.
\`\`\`

It's perfect because it's accurate. \`sudo\` really does make the computer do what you want. And the humor scales — the more you know about permissions, the funnier it gets.

## Design Philosophy

When approaching this design, we had one rule: don't over-design it. The joke is already perfect. Our job was to present it in a way that feels premium without diluting the punchline.

Black tee. Clean monospace font. Terminal-style formatting. That's it. No gradients, no illustrations, no "clever" additions. The design *is* the text.

## Why It Works

The best merch designs are the ones that let the joke breathe. When you see someone wearing this shirt, you either get it immediately or you don't — and both reactions are correct. That's the mark of a good inside joke.

This design has been our consistent top-3 seller since launch. Sometimes the classics really are classic for a reason.`,
    category: "behind-the-design",
    date: "2026-03-15",
    readTime: 3,
    relatedProducts: ["sudo-sandwich", "rm-rf-danger", "bash-sleep-run"],
  },
  {
    slug: "ai-merch-culture-is-here",
    title: "AI Merch Culture Is Here",
    excerpt: "From 'Got Tokens?' to 'Trained On Deez Nuts' — how AI culture created an entirely new genre of tech humor.",
    content: `Two years ago, nobody outside of ML research knew what a "token" was. Now your non-technical friends are hitting context limits on ChatGPT and complaining about hallucinations at dinner.

## A New Vocabulary

AI has introduced an entirely new lexicon into mainstream culture. Tokens, prompts, fine-tuning, hallucinations, context windows, agents — these were niche ML terms that are now household words.

And where there's new vocabulary, there's new humor. "Got Tokens?" works because it's a parody format everyone recognizes ("Got Milk?") applied to a concept that's now universal. Six months ago it would've needed explaining. Today it gets knowing nods.

## The Spicier Side

Then there's the stuff that pushes boundaries. "I Fine-Tuned Your Mom" and "Trained On Deez Nuts" take AI terminology and slam it into juvenile humor formats — and that collision is what makes them funny. It's not sophisticated. It's not trying to be. It's a dataset joke wearing a "your mom" joke's clothing.

## Why AI Humor Hits Different

Traditional dev humor is built on shared suffering — merge conflicts, dependency hell, production outages at 2 AM. AI humor adds a new dimension: existential uncertainty. We're simultaneously building these systems and being replaced by them. That tension produces comedy gold.

When someone wears a "Sam Altman Owes Me Money" shirt, they're making a joke about training data — but also a genuine commentary about the economics of AI. The best merch lives in that space between humor and truth.`,
    category: "dev-culture",
    date: "2026-03-10",
    readTime: 4,
    featured: true,
    relatedProducts: ["got-tokens", "sam-altman-owes-me", "fine-tuned-mom", "trained-deez-nuts"],
  },
  {
    slug: "spring-2026-drop-preview",
    title: "Spring 2026 Drop Preview",
    excerpt: "New designs incoming — here's a sneak peek at what's dropping this spring.",
    content: `We've been cooking. The next batch of NERDMERCH designs leans harder into the intersection of developer life and internet culture, and we think you're going to love them.

## What's Coming

Without giving too much away, here's what to expect:

**More AI Culture** — The AI space moves fast, and the jokes move faster. We've got new designs that reference the latest discourse around agents, vibe coding, and the eternal "is my job safe?" question.

**Developer Lifestyle** — Beyond code jokes, we're exploring the *lifestyle* of being a developer. The coffee addiction. The mechanical keyboard obsession. The "works on my machine" energy that permeates everything we do.

**Collaboration Designs** — We're experimenting with community-submitted concepts. Some of the best joke ideas come from Twitter threads and Reddit comments, and we want to give those ideas the premium treatment they deserve.

## The Process

Every design starts as a text concept. We evaluate jokes on three criteria:

1. **Is it funny to insiders?** — The core audience has to laugh.
2. **Is it intriguing to outsiders?** — Even if they don't fully get it, it should make them curious.
3. **Does it work on a shirt?** — Not every good joke translates to wearable format. Brevity matters.

Designs that pass all three get the NERDMERCH treatment: clean typography, premium print, black cotton canvas.

## Stay Tuned

Follow us on socials for first looks at new drops. Every design is $20, every drop is limited thought, and first-run buyers get bragging rights forever.`,
    category: "merch-drops",
    date: "2026-03-05",
    readTime: 3,
    relatedProducts: ["vibe-coded", "talk-to-my-agent", "dangerously-skip-permissions"],
  },
  {
    slug: "the-art-of-the-double-meaning",
    title: "The Art of the Double Meaning",
    excerpt: "Why the best tech shirts work on two levels — and how we design for that sweet spot between innocent and spicy.",
    content: `The best NERDMERCH designs are the ones your manager can see on a Zoom call but your dev friends will smirk at. That dual-read is an art form.

## Innocent Until Proven Nerdy

Take "Got Root?" — to anyone outside of tech, it sounds like a gardening question. To a sysadmin, it's asking about superuser access. And to someone with a juvenile sense of humor... well, you get it. Three audiences, three reactions, one shirt.

"Fully Penetration Tested" follows the same formula. In security, it's a standard audit certification. Out of context, it's... something else entirely. The plausible deniability is built into the design.

## The Design Constraint

Creating double-meaning shirts has a specific design constraint: the presentation has to be completely straight-faced. The moment you add a wink or a nudge to the design, you kill the dual-read. The humor comes from the *viewer's* interpretation, not the designer's commentary.

That's why our spicy designs use the same clean, minimal treatment as everything else. Black tee. Clean type. No visual gags. The text does all the work.

## Walking the Line

There's a balance to maintain. We want designs that are clever, not crude. The joke should make you think before you laugh. "My Safe Word Is Ctrl+C" works because it's genuinely funny on the tech level — Ctrl+C kills a running process — and the innuendo is secondary.

If the spicy reading is the *only* reading, it's not a NERDMERCH design. It's just a rude shirt. The tech layer has to be real.`,
    category: "behind-the-design",
    date: "2026-02-28",
    readTime: 4,
    relatedProducts: ["got-root", "penetration-tested", "safe-word-ctrl-c", "show-me-backend"],
  },
  {
    slug: "git-jokes-that-never-get-old",
    title: "Git Jokes That Never Get Old",
    excerpt: "From force pushes to merge conflicts — why git humor is the backbone of developer comedy.",
    content: `Every developer has a git horror story. That's what makes git jokes universal — they're not just funny, they're therapy.

## The Shared Trauma

\`\`\`
git push --force
\`\`\`

Those three words can make a senior developer flinch. We've all been there. We've all done it. Some of us have done it to main on a Friday afternoon. The "Push It" and "F*ck It, Ship It" designs tap directly into this shared trauma.

## Why Git Humor Works

Git is one of the few tools that every developer uses, regardless of language, framework, or specialization. A React developer and a Rust developer might not share much common ground — but they both know the pain of a merge conflict.

That universality makes git jokes the lowest-common-denominator of dev humor (in the best way). "I Only Commit With Git" doesn't need any specialized knowledge beyond basic version control. It works for a bootcamp student and a staff engineer equally.

## The Relationship Angle

The overlap between git terminology and relationship language is a goldmine:
- **Commit** — dedication
- **Push** / **Pull** — dynamics
- **Fork** — well...
- **Merge conflicts** — disagreements
- **Rebase** — rewriting history

"DTF (Down To Fork)" and "I Only Commit With Git" both exploit this overlap. The joke writes itself when the technical term already has a colloquial meaning.

## Our Favorites

If we had to pick a desert-island git shirt, it'd be "I Merge Without Conflicts" with the subtitle "Said no one ever." It's aspirational, self-deprecating, and universally relatable. Perfect dev energy.`,
    category: "tech-humor",
    date: "2026-02-20",
    readTime: 5,
    featured: true,
    relatedProducts: ["merge-no-conflicts", "push-it", "fork-it", "only-commit-git", "dtf-down-to-fork"],
  },
];

export const blogCategories = [
  { slug: "all", name: "All Posts", count: blogPosts.length },
  { slug: "dev-culture", name: "Dev Culture", count: blogPosts.filter(p => p.category === "dev-culture").length },
  { slug: "behind-the-design", name: "Behind the Design", count: blogPosts.filter(p => p.category === "behind-the-design").length },
  { slug: "merch-drops", name: "Merch Drops", count: blogPosts.filter(p => p.category === "merch-drops").length },
  { slug: "tech-humor", name: "Tech Humor", count: blogPosts.filter(p => p.category === "tech-humor").length },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(p => p.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return blogPosts;
  return blogPosts.filter(p => p.category === category);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
