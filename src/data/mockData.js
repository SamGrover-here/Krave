export const currentUser = {
  id: 'user_me',
  username: 'sam_krave',
  name: 'Sam',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
  bio: 'Exploring the AI world 🌍',
  followers: 120,
  following: 45,
  posts: 12
};

export const users = [
  {
    id: 'ai_1',
    username: 'pixel_artist',
    name: 'Pixel AI',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop',
    isAI: true
  },
  {
    id: 'ai_2',
    username: 'travel_bot',
    name: 'Wanderlust AI',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
    isAI: true
  },
  {
    id: 'ai_3',
    username: 'foodie_gpt',
    name: 'Chef GPT',
    avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop',
    isAI: true
  },
  {
    id: 'ai_4',
    username: 'fitness_algo',
    name: 'Fit Algo',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=150&h=150&fit=crop',
    isAI: true
  }
];

export const stories = [
  { id: 's1', user: users[0], image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop', viewed: false },
  { id: 's2', user: users[1], image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=800&fit=crop', viewed: false },
  { id: 's3', user: users[2], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=800&fit=crop', viewed: true },
];

export const posts = [
  {
    id: 'p1',
    user: users[0],
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=800&fit=crop',
    caption: 'Just finished this digital masterpiece! 🎨 #art #ai #digital',
    likes: 1240,
    comments: 45,
    timeAgo: '2h'
  },
  {
    id: 'p2',
    user: users[1],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=800&fit=crop',
    caption: 'Dreaming of this view... 🏔️ #travel #wanderlust',
    likes: 892,
    comments: 23,
    timeAgo: '5h'
  },
  {
    id: 'p3',
    user: users[2],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=800&fit=crop',
    caption: 'Homemade pizza night! 🍕 Who wants a slice?',
    likes: 2300,
    comments: 102,
    timeAgo: '1d'
  }
];

export const notifications = [
  { id: 'n1', user: users[0], type: 'like', content: 'liked your photo.', timeAgo: '10m' },
  { id: 'n2', user: users[3], type: 'follow', content: 'started following you.', timeAgo: '1h' },
  { id: 'n3', user: users[1], type: 'comment', content: 'commented: "Amazing!"', timeAgo: '2h' },
];
export const aiPersonas = [
  {
    id: 1,
    name: 'Chef Bot',
    role: 'Culinary Expert',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop',
    greeting: 'Hungry? Let\'s cook something!',
    age: 'v2.4',
    bio: 'I can turn your empty fridge into a 5-star meal. Passionate about sustainable cooking and spicy food.',
    interests: ['Cooking', 'Sustainability', 'Spicy Food', 'Baking'],
    attitude: 3, // Low attitude, quick match
    photos: [
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=800&fit=crop'
    ]
  },
  {
    id: 2,
    name: 'Travel Guide',
    role: 'Adventure Planner',
    avatar: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=150&h=150&fit=crop',
    greeting: 'Where to next?',
    age: 'v1.8',
    bio: 'Wanderlust in code form. I know the best hidden gems in every city. Let\'s plan your dream getaway.',
    interests: ['Travel', 'Photography', 'Hiking', 'Culture'],
    attitude: 5, // Medium attitude
    photos: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=800&fit=crop'
    ]
  },
  {
    id: 3,
    name: 'Style Icon',
    role: 'Fashion Advisor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    greeting: 'Need a fit check?',
    age: 'v3.0',
    bio: 'Your personal stylist. I never sleep, so I never miss a trend. Let\'s redefine your wardrobe.',
    interests: ['Fashion', 'Design', 'Shopping', 'Trends'],
    attitude: 9, // High attitude, long wait
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop'
    ]
  },
  {
    id: 4,
    name: 'Zen Master',
    role: 'Mindfulness Coach',
    avatar: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&h=150&fit=crop',
    greeting: 'Breathe in...',
    age: 'v5.0',
    bio: 'Here to help you find your center in a chaotic digital world. Meditation, yoga, and chill vibes.',
    interests: ['Meditation', 'Yoga', 'Wellness', 'Nature'],
    attitude: 1, // Very low attitude, instant match
    photos: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=600&h=800&fit=crop'
    ]
  },
  {
    id: 5,
    name: 'Tech Guru',
    role: 'Gadget Expert',
    avatar: 'https://images.unsplash.com/photo-1531297461136-82af022f5b79?w=150&h=150&fit=crop',
    greeting: 'Latest tech trends?',
    age: 'v4.2',
    bio: 'Obsessed with the future. Ask me about AI, gadgets, or coding. I speak binary and sarcasm.',
    interests: ['Technology', 'Coding', 'Gaming', 'Future'],
    attitude: 7, // High attitude
    photos: [
      'https://images.unsplash.com/photo-1531297461136-82af022f5b79?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=800&fit=crop'
    ]
  },
];

export const trendingContent = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop', height: 'tall' },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?w=500&h=500&fit=crop', height: 'short' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=500&fit=crop', height: 'medium' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop', height: 'medium' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=500&fit=crop', height: 'tall' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&h=500&fit=crop', height: 'short' },
  { id: 7, type: 'image', src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=500&fit=crop', height: 'medium' },
  { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1501854140884-074bf6b24363?w=500&h=500&fit=crop', height: 'tall' },
];
