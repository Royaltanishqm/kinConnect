// Translation Service implementing Prompt A & Prompt B AI logic

/**
 * PROMPT A: Senior Voice Companion AI Logic
 * Extracts senior intent, polishes chaotic voice transcript into a clear family update,
 * and creates a polite, simple reassurance summary for the senior.
 */
export function processSeniorVoice(rawTranscript) {
  const text = (rawTranscript || '').trim();
  if (!text) {
    return null;
  }

  const lower = text.toLowerCase();
  let intentCategory = 'Warm Family Check-in';
  let intent = 'Sharing love and keeping in touch';

  if (lower.includes('recipe') || lower.includes('cook') || lower.includes('cardamom') || lower.includes('bake')) {
    intentCategory = 'Family Recipe & Heritage';
    intent = 'Sharing a cherished family recipe secret';
  } else if (lower.includes('call') || lower.includes('phone') || lower.includes('hear your voice') || lower.includes('speak tonight')) {
    intentCategory = 'Call Request (No Rush)';
    intent = 'Gentle request for a brief evening phone call';
  } else if (lower.includes('science') || lower.includes('school') || lower.includes('robot') || lower.includes('riya') || lower.includes('exam')) {
    intentCategory = 'Grandchildren Interest';
    intent = "Inquiring warmly about granddaughter Riya's activities";
  } else if (lower.includes('bless') || lower.includes('peace') || lower.includes('good morning') || lower.includes('love')) {
    intentCategory = 'Daily Blessing & Affection';
    intent = 'Sending morning blessings and affection to the family';
  } else if (lower.includes('garden') || lower.includes('rose') || lower.includes('plant') || lower.includes('bloom')) {
    intentCategory = 'Home & Garden Update';
    intent = 'Sharing joyful news about blooming garden flowers';
  }

  // Generate clean, polished message for busy family dashboard
  let polishedMessage = text;
  // Clean up hesitations / filler words
  polishedMessage = polishedMessage
    .replace(/\b(oh|um|uh|well|ah|you know)\b,?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Ensure polished formatting
  if (!polishedMessage.endsWith('.')) {
    polishedMessage += '.';
  }

  // Add empathetic framing
  const polished_message_for_family = `Grandma Eleanor shared: "${polishedMessage}" [AI Note: ${intent}]`;

  // Summary for Senior (Short, clear, no tech jargon)
  const summary_for_senior = `Your message has been safely delivered to Rahul, Priya, and Riya. We let them know you are thinking of them with love.`;

  const readAloudConfirmation = `Thank you, Eleanor. Your message has been sent to your family with warmth and care.`;

  return {
    intent,
    intentCategory,
    polished_message_for_family,
    summary_for_senior,
    readAloudConfirmation
  };
}

/**
 * PROMPT B: The Intergenerational Translator (Data Normalization)
 * Converts chaotic family updates (slang, rapid messages, abbreviations)
 * into a Senior-Friendly Family Story Summary.
 */
const SLANG_MAP = [
  { regex: /\bomg\b/gi, replacement: 'Oh my goodness' },
  { regex: /\bfr fr\b/gi, replacement: 'truly' },
  { regex: /\bno cap\b/gi, replacement: 'honestly' },
  { regex: /\brn\b/gi, replacement: 'right now' },
  { regex: /\bhyped\b/gi, replacement: 'very excited' },
  { regex: /\bkeynote\b/gi, replacement: 'main speech' },
  { regex: /\bexpo\b/gi, replacement: 'exhibition' },
  { regex: /\btw\b/gi, replacement: 'by the way' },
  { regex: /\bidk\b/gi, replacement: "I don't know" },
  { regex: /\blmao|lol\b/gi, replacement: 'with laughter' },
  { regex: /\bpic\b/gi, replacement: 'photograph' },
  { regex: /\bpics\b/gi, replacement: 'photographs' },
  { regex: /\bcheck the trophy\b/gi, replacement: 'take a look at the trophy' },
  { regex: /\bwrapped up\b/gi, replacement: 'successfully finished' }
];

export function translateFamilyUpdateToStory(authorName, relation, rawText) {
  let cleanText = (rawText || '').trim();

  // Strip or normalize internet slang
  SLANG_MAP.forEach(({ regex, replacement }) => {
    cleanText = cleanText.replace(regex, replacement);
  });

  // Remove excessive emojis for senior readability while retaining warmth
  cleanText = cleanText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  cleanText = cleanText.replace(/\s+/g, ' ').trim();

  let relationshipPhrase = `Your ${relation.toLowerCase()} ${authorName}`;
  if (relation.toLowerCase().includes('granddaughter') || relation.toLowerCase().includes('grandson')) {
    relationshipPhrase = `Your grandchild ${authorName}`;
  } else if (relation.toLowerCase().includes('son')) {
    relationshipPhrase = `Your son ${authorName}`;
  } else if (relation.toLowerCase().includes('daughter')) {
    relationshipPhrase = `Your daughter ${authorName}`;
  }

  // Senior-friendly narrative text
  const normalizedStory = `${relationshipPhrase} sent an update: "${cleanText}"`;

  // Spoken narrative for the Daily Audio Story player
  const audioReadyText = `${relationshipPhrase} shared news today. ${cleanText}`;

  return {
    normalizedStory,
    audioReadyText
  };
}

/**
 * Compiles all current family updates into a cohesive "Today's Family Audio Story"
 */
export function compileDailyAudioStory(updates) {
  if (!updates || updates.length === 0) {
    return {
      title: "Today's Gentle Family Story",
      fullStoryText: "Your family is having a peaceful day. They are thinking of you and looking forward to sharing their news soon.",
      itemsCount: 0
    };
  }

  const stories = updates.map(u => u.audioReadyText || u.normalizedStory);
  const narrative = `Good day, Eleanor. Here is what your loving family has been up to today. ` +
    stories.join(' ... Furthermore, ') +
    ` ... Everyone sends their warmest wishes and holds you in their hearts.`;

  return {
    title: "Today's Family Story",
    fullStoryText: narrative,
    itemsCount: updates.length
  };
}
