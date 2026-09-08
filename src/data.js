export const DIMENSIONS = [
  {
    id: 'intellectual',
    name: 'Intellectual',
    color: '#EBCA19',
    text: '#253540',
    description:
      'Recognizing creative abilities and finding ways to expand knowledge and skills',
    examples:
      'Pursue new interests, learn new skills, disconnect from electronic devices.',
  },
  {
    id: 'career',
    name: 'Career',
    color: '#A3CD3B',
    text: '#253540',
    description:
      "Creating personal satisfaction and enrichment from one's work",
    examples:
      'Pursue meaningful work, develop positive relationships with co-workers, uphold boundaries.',
  },
  {
    id: 'physical',
    name: 'Physical',
    color: '#2CB34D',
    text: '#253540',
    description:
      'Recognizing the need for physical activity, healthy foods, and sleep',
    examples:
      'Eat regular meals, sleep 7+ hours per night, exercise, get health checkups.',
  },
  {
    id: 'social',
    name: 'Social',
    color: '#13B3BF',
    text: '#253540',
    description:
      'Developing a sense of connection, belonging, and a well-developed support system',
    examples:
      'Make time for family/friends, ask for support, join community activities, engage in person.',
  },
  {
    id: 'spiritual',
    name: 'Spiritual',
    color: '#992473',
    text: '#ffffff',
    description: 'Expanding a sense of purpose and meaning in life',
    examples:
      'Engage in self-reflection, spend time in nature, meditation, prayer, worship, exploring spiritual connections.',
  },
  {
    id: 'emotional',
    name: 'Emotional',
    color: '#2F1957',
    text: '#ffffff',
    description:
      'Coping effectively with life and creating satisfying relationships',
    examples:
      'Celebrate accomplishments, express emotions in a healthy way, journal, practice gratitude.',
  },
  {
    id: 'environmental',
    name: 'Environmental',
    color: '#E84026',
    text: '#ffffff',
    description:
      'Occupying pleasant, stimulating environments that support wellbeing',
    examples:
      'De-clutter home spaces, recycle, work to understand your impact on the environment.',
  },
  {
    id: 'financial',
    name: 'Financial',
    color: '#F7921E',
    text: '#253540',
    description:
      'Feeling satisfied with current and future financial situations',
    examples:
      'Keep a budget, spend within your means, make short and long term financial goals.',
  },
]

export const PLANNER_ORDER = [
  'physical',
  'emotional',
  'spiritual',
  'career',
  'social',
  'intellectual',
  'environmental',
  'financial',
]

export const ADDITIONAL_EXAMPLES = [
  'Write in a journal',
  'Volunteer for a cause meaningful to you',
  'Make a gratitude list',
  'Take a fresh air break',
  'Meditate or listen to a guided visualization',
  'Cuddle with pets',
  'Take a nap',
  'Practice yoga',
  'Listen to music',
  'Create: draw, paint, color',
  'Take photos',
  'Go for a nature walk',
  'Seek spiritual counsel',
  'Try a new hobby',
  'Forage for flowers or herbs',
  'Turn off electronic devices for 4 hours',
  'Dance',
  'Browse books at the library',
  'Join a support group',
  'Work in a garden',
  'Drink tea',
  'Participate in cultural celebrations',
  'Tell a story',
  'Read a book for pleasure',
  'Lay in the grass',
  'Eat nourishing foods',
]

export const EMERGENCY_TOOLS = [
  {
    id: 'relaxation',
    name: 'Relaxation/Staying Calm',
    prompt:
      'Which activities help you to relax? Which activities make you more agitated or frustrated?',
  },
  {
    id: 'selfTalk',
    name: 'Self-Talk',
    prompt:
      'Helpful self-talk may include “I am safe, I can do this.” Harmful self-talk may include “I can’t handle this, I knew this would happen, I deserve this bad thing that is happening.”',
  },
  {
    id: 'socialSupport',
    name: 'Social Support',
    prompt:
      'Which family members and friends can you reach out to for help or support? Which people should you avoid during times of stress? Be honest about who helps and who drains your energy.',
  },
  {
    id: 'mood',
    name: 'Mood',
    prompt:
      'Which activities support a positive mood? What should you avoid when times get tough?',
  },
  {
    id: 'resilience',
    name: 'Resilience',
    prompt:
      'What, or who, helps you get through difficult times? What helps you bounce back? Conversely, what or who feeds negativity for you?',
  },
]

export const HELPFUL_EXAMPLES = [
  'Deep breathing',
  'Stretching',
  'Meditation',
  'Listening to music',
  'Exercising',
  'Reading',
  'Going for a walk',
  'Taking a bath',
  'Socializing with friends',
  'Sitting outside',
  'Engaging in a hobby',
]

export const HARMFUL_EXAMPLES = [
  'Acting aggressively',
  'Overeating',
  'Drinking alcohol',
  'Smoking',
  'Pacing',
  'Biting your fingernails',
  'Taking drugs',
  'Skipping meals',
  'Withdrawing from family/friends',
  'Dangerous driving',
]

export const SMART = [
  {
    letter: 'S',
    word: 'Specific',
    color: '#1BD746',
    note: 'Plan effectively with specific targets in mind.',
  },
  {
    letter: 'M',
    word: 'Measurable',
    color: '#940405',
    note: 'Track your progress and re-evaluate along the way.',
  },
  {
    letter: 'A',
    word: 'Attainable',
    color: '#35BBD3',
    note: 'Set realistic goals that are challenging but achievable.',
  },
  {
    letter: 'R',
    word: 'Relevant',
    color: '#97ADFF',
    note: 'Ensure the goal serves a relevant purpose.',
  },
  {
    letter: 'T',
    word: 'Time Bound',
    color: '#FD883E',
    note: 'Specify a deadline, monitor progress, and re-evaluate.',
  },
]

export const STEPS = [
  { id: 'evaluate', number: 1, label: 'Evaluate' },
  { id: 'needs', number: 2, label: 'Needs' },
  { id: 'daily', number: 3, label: 'Daily Plan' },
  { id: 'emergency-needs', number: 4, label: 'Emergency Needs' },
  { id: 'emergency-plan', number: 5, label: 'Emergency Plan' },
  { id: 'goals', number: 6, label: 'Goals' },
]

export const COPY = {
  whatIs:
    'Self-care is defined as the daily process of being aware of and attending to one’s basic physiological and emotional needs, including the shaping of one’s daily routine, relationships, and environment as needed to promote self-care.',
  noOneSize:
    'When it comes to self-care plans, there is no one-size-fits-all option. We all have different needs, strengths, and limitations. The following is a six-step process that will help you build a plan that’s just right for you.',
  step1:
    'Examining your own habits is an important first step in developing a self-care plan.',
  step2:
    'When considering what it takes to be well, we need to have both daily and emergency self-care strategies. Remember that self-care extends far beyond your basic physical needs: consider each dimension of wellness.',
  step2Reflect:
    'What are you doing to support your overall well-being on a day-to-day basis? Do you engage in self-care practices now? Are you more active in some areas of self-care than others? Begin to reflect on these questions — we will use them for filling in our self-care planners.',
  step3Intro:
    'We will begin by focusing on our daily self-care. Take a moment to consider what you value and need in your everyday life (daily self-care needs).',
  dailyPrompt: 'List your favorite practices for each category. Examples are listed as a guide:',
  step4Intro:
    'When you are faced with a crisis or stressful life event, you likely won’t have time to create a coping strategy. Think about your current coping strategies, both helpful and harmful. Where are your strengths? What negative strategies do you want to eliminate? What improvements do you want to make to how you manage stress?',
  step4Reflect:
    'Reflecting on tools and strategies in the event of a crisis or distressing event allows you to have something ready when you need it. Fill in this chart to help you understand your helpful and harmful coping strategies.',
  helpfulPrompt:
    'List your top five positive coping strategies or self-care practices for when you are in crisis or are experiencing a significant amount of stress.',
  harmfulPrompt:
    'List five practices, people, places, or things to avoid during times of crisis or stress. This will serve as a helpful reminder to keep you on track.',
  step6Intro:
    'The next step in self-care planning is to set some specific goals to improve your daily and emergency self-care. Here are some questions to think about: What areas of self-care do I need to improve on? Where are my gaps? Where are my strengths? What harmful strategies do I want to eliminate? What goals can I set to help me utilize the strategies in my self-care planner?',
  smartIntro:
    'When setting your goals, think about how you can make them S.M.A.R.T. (Specific, Measurable, Achievable, Relevant or Realistic and Time-Bound). For example, “at least twice a month for the next 6 months, I will go for a nature walk” or “Each week, I will utilize at least two of my favorite daily self-care activities.”',
  finalStep:
    'Now that you’ve created your self-care plan, look at it regularly. Throughout the workshop series, we will be adding helpful strategies and tools to your toolkit. Make a commitment to yourself and practice your self-care routine as often as possible. Reference this plan often so that you can update it with what works and does not work for you.',
  onesheetIntro:
    'This one-sheet self-care planner includes the daily self-care plan, the emergency self-care plan, and a space for your goals so that you can have everything in one place to reference. Print it to have at your desk, in your wallet, etc.',
}

export function dimById(id) {
  return DIMENSIONS.find((d) => d.id === id)
}

export function orderedDimensions(startId) {
  const list = PLANNER_ORDER.map(dimById)
  if (!startId) return list
  const i = list.findIndex((d) => d.id === startId)
  if (i < 0) return list
  return [...list.slice(i), ...list.slice(0, i)]
}
