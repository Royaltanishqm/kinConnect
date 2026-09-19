// Mock Data for KinConnect: The Intergenerational Family Bridge

export const INITIAL_FAMILY_MEMBERS = [
  {
    id: 'rahul',
    name: 'Rahul',
    relation: 'Son',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'At work in Seattle',
    lastActive: '12m ago'
  },
  {
    id: 'priya',
    name: 'Priya',
    relation: 'Daughter-in-Law',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'Gardening with kids',
    lastActive: '34m ago'
  },
  {
    id: 'riya',
    name: 'Riya',
    relation: 'Granddaughter (10 yrs)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'School science project',
    lastActive: '1h ago'
  },
  {
    id: 'arjun',
    name: 'Arjun',
    relation: 'Grandson (14 yrs)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'Soccer practice',
    lastActive: '2h ago'
  }
];

export const INITIAL_SENIOR_MESSAGES = [
  {
    id: 'msg-1',
    author: 'Grandma Eleanor',
    timestamp: '10:15 AM Today',
    rawVoiceTranscript: "Oh hello dear... I was just looking at the backyard roses you planted last spring Rahul... they're blooming so beautifully today. How is little Riya's science project going? Give everyone my love and call me whenever you get a free minute, no rush sweetheart.",
    intent: 'Checking on family & requesting gentle call',
    intentCategory: 'Family Care & Gentle Check-in',
    polished_message_for_family: "The backyard roses Rahul planted are in full bloom today! Grandma is asking how Riya's science project went, sends her warmest love to everyone, and would love a quick phone call whenever someone has a free moment.",
    summary_for_senior: "Sent to Rahul, Priya & Riya: You shared that the roses are blooming, asked about Riya's project, and sent your love.",
    reactions: [
      { sender: 'Rahul', emoji: '❤️', text: 'Will call at 6:00 PM Mom!' },
      { sender: 'Riya', emoji: '🌸', text: 'Love you Dadi!' }
    ],
    audioDuration: '24s'
  }
];

export const INITIAL_FAMILY_UPDATES = [
  {
    id: 'upd-1',
    author: 'Riya',
    authorRelation: 'Granddaughter',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    timestamp: '9:30 AM',
    rawText: 'OMG DADI LOOK! We won 1st place in regional robotics science fair!! 🤖🥇 check the trophy!! so hyped rn',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    photoAlt: 'Riya proudly holding her first-place science fair trophy with her robotics robot',
    normalizedStory: 'Your granddaughter Riya won 1st place in her school robotics science fair today! She is holding a shiny golden trophy and is overjoyed to share this moment with you.',
    audioReadyText: 'Your granddaughter Riya won first place in her school science fair today. She is holding a big gold trophy and wanted you to be the very first person to know.'
  },
  {
    id: 'upd-2',
    author: 'Rahul',
    authorRelation: 'Son',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: '8:15 AM',
    rawText: 'Morning Ma! Wrapped up morning keynote at Seattle tech expo, grabbed some blueberry scones that reminded me of your Sunday bakes ☕🥯',
    photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    photoAlt: 'Warm cup of coffee and fresh blueberry scones on a cafe table',
    normalizedStory: 'Your son Rahul finished his morning presentation in Seattle. He stopped for warm blueberry scones and says they reminded him of your delicious Sunday baking.',
    audioReadyText: 'Your son Rahul had a successful presentation in Seattle this morning. He enjoyed a warm blueberry scone and said it made him think of your Sunday morning baking.'
  }
];

export const SAMPLE_SENIOR_PRESETS = [
  {
    label: "Ask about Riya's science project",
    transcript: "Hello sweetheart, I'm just sitting here thinking about Riya's science competition. Did she present her robot today? Let me know how it went and please give her a big hug from Grandma."
  },
  {
    label: "Share favorite Sunday recipe",
    transcript: "Rahul beta, I found my old handwritten recipe book with your favorite cardamom tea cake. Remind me to tell Priya the secret ingredient when we speak tonight, it needs three pods of fresh cardamom."
  },
  {
    label: "Request evening phone call",
    transcript: "Hi everyone, I hope your workday went smoothly. I would love to hear your voices tonight around tea time if you have five quiet minutes. No rush, only when you are completely free."
  },
  {
    label: "Send warm daily blessing",
    transcript: "Good morning my lovely family. May your day be filled with peace and sweet smiles. Take good care of your health and remember to drink plenty of water."
  }
];
