import React, { useState, useEffect, useRef } from 'react';
import { 
  Hash, Volume2, Plus, Settings, Mic, MicOff, Headphones, 
  Smile, Paperclip, Send, Search, Bell, Pin, Users, MessageSquare, 
  ChevronDown, ChevronRight, Circle, Check, X, LogOut, ShieldCheck,
  Radio, Sparkles, Gamepad2, Music, Code, HelpCircle, UserPlus, Image,
  Flame, Heart, ThumbsUp, Laugh, Palette, Wand2, PenTool, CheckSquare,
  BarChart2, Play, Pause, VolumeX, Zap, RefreshCw, Eraser, Trophy,
  Volume1, RadioReceiver, Sliders, PlayCircle, StopCircle, Sticker,
  BadgeCheck, ExternalLink, Sparkle, Compass, Megaphone, Video, Monitor,
  Gift, AtSign, MessageCircle, MoreVertical, EyeOff, RadioTower, SparkleIcon,
  Crown, UserCheck, ShieldAlert, FileText, CornerUpLeft, Trash2, Edit3
} from 'lucide-react';

// --- THEMES PRESETS ---
const PRESET_THEMES = [
  { id: 'dark', name: 'Discord Dark', bg: '#1e1f22', cardBg: '#2b2d31', mainBg: '#313338', accent: '#5865f2', text: '#f3f4f6' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon', bg: '#0d0221', cardBg: '#190938', mainBg: '#260c52', accent: '#ff007f', text: '#00f6ff' },
  { id: 'sunset', name: 'Sunset Warmth', bg: '#231526', cardBg: '#3b1d36', mainBg: '#4a243e', accent: '#ff6b6b', text: '#fcd5ce' },
  { id: 'emerald', name: 'Emerald Forest', bg: '#062016', cardBg: '#0b3323', mainBg: '#11422f', accent: '#10b981', text: '#e6f4ea' },
  { id: 'midnight', name: 'OLED Pure Black', bg: '#000000', cardBg: '#0a0a0a', mainBg: '#121212', accent: '#3b82f6', text: '#ffffff' },
  { id: 'light', name: 'Discord Light', bg: '#e3e5e8', cardBg: '#f2f3f5', mainBg: '#ffffff', accent: '#5865f2', text: '#2e3338' },
];

// --- FRIENDS LIST MOCK DATA ---
const INITIAL_FRIENDS = [
  { id: 'f1', name: 'Sophia_R', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', status: 'online', activity: 'Dessine sur Figma', statusType: 'online' },
  { id: 'f2', name: 'CyberSam', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80', status: 'dnd', activity: 'VS Code - index.tsx', statusType: 'dnd' },
  { id: 'f3', name: 'Lucas_Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', status: 'idle', activity: 'Inactif depuis 15m', statusType: 'idle' },
  { id: 'f4', name: 'Elena_Gamer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', status: 'offline', activity: 'Hors ligne', statusType: 'offline' }
];

// --- SERVERS & CHANNELS MOCK DATA ---
const INITIAL_SERVERS = [
  {
    id: 's1',
    name: 'NOVA Central',
    icon: '⚡',
    boostLevel: 2,
    boosts: 14,
    categories: [
      {
        id: 'cat-spark',
        name: 'EXCLUSIVITÉS NOVA 🚀',
        channels: [
          { id: 'c-spark-ai', name: 'spark-ai', type: 'ai', topic: 'Assistant IA NOVA - Réponses directes' },
          { id: 'c-board', name: 'board-creatif', type: 'draw', topic: 'Tableau blanc interactif' },
          { id: 'c-arcade', name: 'arcade-zone', type: 'arcade', topic: 'Mini-jeux arcade & concours de frappe !' }
        ]
      },
      {
        id: 'cat-general',
        name: 'SALONS TEXTUELS',
        channels: [
          { id: 'c-general', name: 'général', type: 'text', topic: 'Salon principal de discussion' },
          { id: 'c-announcements', name: 'annonces', type: 'announcement', topic: 'Nouveautés et mises à jour officielles' },
          { id: 'c-forum', name: 'forum-entraide', type: 'forum', topic: 'Discussions sous forme de threads et sujets' }
        ]
      },
      {
        id: 'cat-voice',
        name: 'SALONS VOCAUX & STAGE',
        channels: [
          { id: 'v-lounge', name: 'Salon Communautaire', type: 'voice', users: ['AlexDev', 'Sophia_R'] },
          { id: 'v-stage', name: 'Conférence Stage 🎙️', type: 'stage', users: ['CyberSam'] },
          { id: 'v-lofi', name: 'Lofi Ambient Zone 🎵', type: 'voice', users: ['SoundBot'] }
        ]
      }
    ]
  },
  {
    id: 's2',
    name: 'Gaming Universe',
    icon: '🎮',
    boostLevel: 1,
    boosts: 4,
    categories: [
      {
        id: 'cat-g1',
        name: 'JEUX VIDEO',
        channels: [
          { id: 'c-valorant', name: 'valorant', type: 'text', topic: 'LFG et clips Valorant' },
          { id: 'v-gaming', name: 'Escouade Vocal', type: 'voice', users: [] }
        ]
      }
    ]
  }
];

const INITIAL_MESSAGES = {
  'c-spark-ai': [
    {
      id: 'm-ai-1',
      user: { name: 'NOVA Spark AI', avatar: '✨', isBot: true, role: 'IA System' },
      timestamp: 'Aujourd\'hui',
      content: 'Bonjour ! Je suis Spark, l\'IA intégrée à NOVA. Demandez-moi de rédiger du code, d\'expliquer un sujet ou d\'inventer une histoire !',
      reactions: { '⚡': 9, '🤖': 12 },
      pinned: true
    }
  ],
  'c-announcements': [
    {
      id: 'm-ann-1',
      user: { name: 'NOVA System', avatar: '⚡', isBot: true, role: 'Officiel' },
      timestamp: 'Aujourd\'hui à 10:00',
      content: '📢 **Mise à jour NOVA v3.0** : Les DMs complets, la grille vidéo vocale, le forum et les commandes slash `/` sont désormais disponibles !',
      reactions: { '🚀': 24, '🎉': 31 },
      pinned: true
    }
  ],
  'c-general': [
    {
      id: 'm-2',
      user: { name: 'Sophia_R', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', status: 'online', role: 'Mod' },
      timestamp: 'Hier à 18:42',
      content: 'Avez-vous testé le mode dactylographie et la grille vidéo dans NOVA ? C\'est génial pour collaborer !',
      reactions: { '👍': 5, '🎵': 4 }
    }
  ],
  'dm-f1': [
    {
      id: 'm-dm-1',
      user: { name: 'Sophia_R', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
      timestamp: 'Aujourd\'hui à 14:15',
      content: 'Salut ! Tu es dispo pour tester le salon vidéo sur NOVA ?'
    }
  ]
};

const MEMBERS_LIST = [
  { id: 'u1', name: 'Spark AI', avatar: '✨', status: 'online', role: 'Admin', isBot: true, customStatus: 'Répond à vos requêtes', richActivity: 'Analyse du réseau', badges: ['🤖 BOT', '⚡ OFFICIEL'], bio: 'Assistant virtuel autonome alimenté par les modèles NOVA.' },
  { id: 'u2', name: 'Sophia_R', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', status: 'online', role: 'Mod', customStatus: 'En train de dessiner 🎨', richActivity: 'Écoute Spotify - Synthwave', badges: ['🏆 TOP CREATOR', '👑 MOD'], bio: 'Designer UI/UX & passionnée d\'illustration numérique.' },
  { id: 'u3', name: 'AlexDev', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', status: 'online', role: 'Membre', customStatus: 'React & Tailwind ✨', richActivity: 'Joue à Cyberpunk 2077', badges: ['💻 CODEUR', '⚡ VIP'], bio: 'Développeur Fullstack React / Node.js.' },
  { id: 'u4', name: 'CyberSam', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80', status: 'dnd', role: 'Membre', customStatus: 'Focus Mode', richActivity: 'VS Code - index.tsx', badges: ['🔥 EARLY MEMBER'], bio: 'Gamer et enthousiaste de cybersécurité.' },
];

export default function App() {
  // Navigation Mode: 'server' or 'dms'
  const [navMode, setNavMode] = useState('server'); 
  const [activeDmFriendId, setActiveDmFriendId] = useState('f1');
  const [friendsTab, setFriendsTab] = useState('online'); // 'online' | 'all' | 'pending' | 'blocked' | 'add'

  // Server & Channel State
  const [servers, setServers] = useState(INITIAL_SERVERS);
  const [activeServerId, setActiveServerId] = useState('s1');
  const [activeChannelId, setActiveChannelId] = useState('c-spark-ai');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [showMembersSidebar, setShowMembersSidebar] = useState(true);
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [showPinnedModal, setShowPinnedModal] = useState(false);
  const [showServerSettingsModal, setShowServerSettingsModal] = useState(false);
  const [showNitroModal, setShowNitroModal] = useState(false);

  // Profile Card Modal State
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);

  // User Settings & Theme State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState(PRESET_THEMES[0]);
  const [customAccent, setCustomAccent] = useState('#5865f2');
  const [bgType, setBgType] = useState('solid'); 
  const [customBgUrl, setCustomBgUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
  const [bgBlur, setBgBlur] = useState(0);
  const [bgOpacity, setBgOpacity] = useState(80);

  // User Level & XP State
  const [userXp, setUserXp] = useState(120);
  const [userLevel, setUserLevel] = useState(3);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [username] = useState('AlexDev');
  const [userStatus, setUserStatus] = useState('online');
  const [customStatusText, setCustomStatusText] = useState('Coding sur NOVA ⚡');

  // Chat & Messaging State
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [messageInput, setMessageInput] = useState('');
  const [aiIsThinking, setAiIsThinking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);

  // Voice & Video State
  const [activeVoiceChannel, setActiveVoiceChannel] = useState(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showVoiceGridOverlay, setShowVoiceGridOverlay] = useState(false);
  const [selectedVoiceEffect, setSelectedVoiceEffect] = useState('Clean');
  const [lastTriggeredSound, setLastTriggeredSound] = useState(null);
  const [activeSoundscape, setActiveSoundscape] = useState(null);
  const [soundscapePlaying, setSoundscapePlaying] = useState(false);

  // Voice Recording & Draw State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#5865f2');

  // Arcade Typer Game State
  const [arcadeTargetWord, setArcadeTargetWord] = useState('CYBERNETIQUE');
  const [arcadeInput, setArcadeInput] = useState('');
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeStreak, setArcadeStreak] = useState(0);

  // Forum State
  const [forumPosts, setForumPosts] = useState([
    { id: 'fp-1', title: 'Comment configurer l\'IA Spark ?', author: 'Sophia_R', replies: 8, tags: ['Tuto', 'IA'], date: 'Il y a 2h' },
    { id: 'fp-2', title: 'Partagez vos thèmes préférés !', author: 'AlexDev', replies: 15, tags: ['Design', 'NOVA'], date: 'Il y a 5h' }
  ]);
  const [newForumTitle, setNewForumTitle] = useState('');

  // Widgets & Custom Emojis State
  const [pollVotes, setPollVotes] = useState({ optionA: 14, optionB: 8 });
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const [customEmojiIcon, setCustomEmojiIcon] = useState('🚀');
  const [customEmojis, setCustomEmojis] = useState(['🔥', '⚡', '🤖', '🎮', '💎', '🎉', '💜']);

  const chatBottomRef = useRef(null);
  const ARCADE_WORDS = ['REACT', 'DISCORD', 'NOVA', 'CYBERPUNK', 'JAVASCRIPT', 'TAILWIND', 'INTERNET', 'INTERFACE', 'SYNTHWAVE', 'COMMUNAUTE'];

  const currentServer = servers.find(s => s.id === activeServerId) || servers[0];
  const allChannels = currentServer.categories.flatMap(c => c.channels);
  const currentChannel = allChannels.find(c => c.id === activeChannelId) || allChannels[0];

  const currentChannelKey = navMode === 'dms' ? `dm-${activeDmFriendId}` : activeChannelId;

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChannelKey]);

  const addXp = (amount) => {
    setUserXp(prev => {
      const nextXp = prev + amount;
      if (nextXp >= userLevel * 100) {
        setUserLevel(lvl => lvl + 1);
        setShowXpPopup(true);
        setTimeout(() => setShowXpPopup(false), 2500);
      }
      return nextXp;
    });
  };

  const handleArcadeSubmit = (e) => {
    e.preventDefault();
    if (arcadeInput.trim().toUpperCase() === arcadeTargetWord) {
      setArcadeScore(prev => prev + (100 * (arcadeStreak + 1)));
      setArcadeStreak(prev => prev + 1);
      addXp(50);
      setArcadeTargetWord(ARCADE_WORDS[Math.floor(Math.random() * ARCADE_WORDS.length)]);
      setArcadeInput('');
    } else {
      setArcadeStreak(0);
      setArcadeInput('');
    }
  };

  const playSoundboard = (soundName) => {
    setLastTriggeredSound(soundName);
    setTimeout(() => setLastTriggeredSound(null), 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    let contentToSend = messageInput;

    // Handle Slash commands
    if (messageInput.startsWith('/shrug')) {
      contentToSend = '¯\\_(ツ)_/¯';
    } else if (messageInput.startsWith('/tableflip')) {
      contentToSend = '(╯°□°）╯︵ ┻━┻';
    } else if (messageInput.startsWith('/poll ')) {
      contentToSend = `📊 **SONDAGE :** ${messageInput.replace('/poll ', '')}`;
    }

    const newMessage = {
      id: `m-${Date.now()}`,
      user: { name: username, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', status: userStatus, role: 'VIP' },
      timestamp: `Aujourd'hui à ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      content: replyToMessage ? `> *@${replyToMessage.user.name}*: ${replyToMessage.content.slice(0, 30)}...\n${contentToSend}` : contentToSend,
      reactions: {},
      pinned: false
    };

    setMessages(prev => ({
      ...prev,
      [currentChannelKey]: [...(prev[currentChannelKey] || []), newMessage]
    }));

    setMessageInput('');
    setReplyToMessage(null);
    setShowSlashMenu(false);
    addXp(30);

    if (navMode === 'server' && currentChannel?.type === 'ai') {
      setAiIsThinking(true);
      setTimeout(() => {
        const aiResponses = [
          `💡 [NOVA Spark AI] J'ai analysé votre message ! En tant qu'assistant de NOVA, je suis là pour répondre à vos questions sur le code, les serveurs ou la personnalisation.`,
          `🤖 [NOVA Spark AI] Excellente remarque ! Saviez-vous que vous pouvez passer en mode grille vidéo dans les salons vocaux ou utiliser des fonds animés ?`,
          `✨ [Spark AI] Tout fonctionne parfaitement. Besoin d'un exemple React ou d'une commande personnalisée ?`
        ];
        const randomResp = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage = {
          id: `m-ai-${Date.now()}`,
          user: { name: 'Spark AI', avatar: '✨', isBot: true, role: 'IA System' },
          timestamp: `Aujourd'hui à ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          content: randomResp,
          reactions: { '⚡': 3, '🧠': 2 }
        };

        setMessages(prev => ({
          ...prev,
          [currentChannelKey]: [...(prev[currentChannelKey] || []), aiMessage]
        }));
        setAiIsThinking(false);
      }, 1100);
    }
  };

  const handleAddReaction = (msgId, emoji) => {
    setMessages(prev => {
      const channelMsgs = prev[currentChannelKey] || [];
      const updated = channelMsgs.map(m => {
        if (m.id === msgId) {
          const count = (m.reactions?.[emoji] || 0) + 1;
          return { ...m, reactions: { ...m.reactions, [emoji]: count } };
        }
        return m;
      });
      return { ...prev, [currentChannelKey]: updated };
    });
  };

  const togglePinMessage = (msgId) => {
    setMessages(prev => {
      const channelMsgs = prev[currentChannelKey] || [];
      const updated = channelMsgs.map(m => {
        if (m.id === msgId) {
          return { ...m, pinned: !m.pinned };
        }
        return m;
      });
      return { ...prev, [currentChannelKey]: updated };
    });
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const currentMessages = (messages[currentChannelKey] || []).filter(msg => 
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedMessagesList = (messages[currentChannelKey] || []).filter(m => m.pinned);

  return (
    <div 
      className="flex h-screen w-screen font-sans overflow-hidden select-none transition-colors duration-300 relative"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Background Customizations */}
      {bgType === 'image' && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300"
          style={{ backgroundImage: `url(${customBgUrl})`, filter: `blur(${bgBlur}px)` }}
        />
      )}
      {bgType === 'image' && (
        <div className="absolute inset-0 z-0 bg-black transition-opacity" style={{ opacity: bgOpacity / 100 }} />
      )}
      {bgType === 'gradient' && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-80" />
      )}

      {/* ========================================================= */}
      {/* 1. LEFTMOST SIDEBAR - DM / SERVERS SWITCHER               */}
      {/* ========================================================= */}
      <aside className="w-18 bg-black/45 border-r border-white/5 py-3 flex flex-col items-center space-y-3 shrink-0 z-10 backdrop-blur-md">
        {/* Direct Messages Home Button (Discord Style Logo) */}
        <div className="relative group flex items-center justify-center w-full">
          <div className={`absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200 ${navMode === 'dms' ? 'h-10' : 'h-0 group-hover:h-5'}`} />
          <button
            onClick={() => setNavMode('dms')}
            className={`w-12 h-12 rounded-[24px] group-hover:rounded-[16px] flex items-center justify-center transition-all duration-200 shadow-md ${
              navMode === 'dms' ? 'rounded-[16px] text-white' : 'bg-white/10 hover:bg-white/20 text-gray-200'
            }`}
            style={{ backgroundColor: navMode === 'dms' ? customAccent : undefined }}
            title="Messages Privés & Amis"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        </div>

        <div className="w-8 h-[2px] bg-white/10 rounded-full my-1" />

        {/* Server List */}
        <div className="flex-1 w-full space-y-2 overflow-y-auto no-scrollbar flex flex-col items-center">
          {servers.map((server) => {
            const isActive = navMode === 'server' && server.id === activeServerId;
            return (
              <div key={server.id} className="relative group flex items-center justify-center w-full">
                <div className={`absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200 ${isActive ? 'h-10' : 'h-0 group-hover:h-5'}`} />
                <button
                  onClick={() => {
                    setNavMode('server');
                    setActiveServerId(server.id);
                  }}
                  className={`w-12 h-12 rounded-[24px] group-hover:rounded-[16px] flex items-center justify-center text-xl font-bold transition-all duration-200 shadow ${
                    isActive ? 'rounded-[16px] text-white' : 'bg-white/10 hover:bg-white/20 text-gray-200'
                  }`}
                  style={{ backgroundColor: isActive ? customAccent : undefined }}
                  title={server.name}
                >
                  {server.icon}
                </button>
              </div>
            );
          })}

          <button 
            onClick={() => {
              const name = prompt('Nom du nouveau serveur :');
              if (name) {
                const newS = { id: `s-${Date.now()}`, name, icon: name.charAt(0).toUpperCase(), boostLevel: 0, boosts: 0, categories: [] };
                setServers(p => [...p, newS]);
              }
            }}
            className="w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-white/10 hover:bg-green-500 text-green-400 hover:text-white flex items-center justify-center transition-all"
            title="Ajouter un serveur"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setShowNitroModal(true)}
            className="w-12 h-12 rounded-[24px] hover:rounded-[16px] bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center transition-all shadow-lg hover:scale-105"
            title="NOVA Nitro Hub"
          >
            <Gift className="w-6 h-6" />
          </button>
        </div>

        {/* Level Badge & Status */}
        <div onClick={() => setShowSettingsModal(true)} className="relative cursor-pointer group p-1" title="Niveau & Paramètres">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-lg border border-white/20" style={{ backgroundColor: customAccent }}>
            Lvl {userLevel}
          </div>
          {showXpPopup && (
            <div className="absolute -top-8 left-12 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xl animate-bounce whitespace-nowrap z-50">
              +30 XP !
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. SECOND SIDEBAR - CHANNELS OR DMS LIST                  */}
      {/* ========================================================= */}
      <aside 
        className="w-60 flex flex-col shrink-0 border-r border-white/5 z-10 backdrop-blur-md"
        style={{ backgroundColor: bgType === 'solid' ? theme.cardBg : 'rgba(25, 27, 32, 0.75)' }}
      >
        {navMode === 'dms' ? (
          /* DM SIDEBAR HEADER & LIST */
          <div className="flex flex-col flex-1">
            <div className="h-12 border-b border-white/5 px-3 flex items-center justify-center">
              <button 
                onClick={() => setFriendsTab('add')}
                className="w-full bg-black/40 hover:bg-black/60 text-gray-300 text-xs py-1.5 px-3 rounded flex items-center justify-between"
              >
                <span>Trouver ou lancer une discussion</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" /> Messages Privés
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
              {INITIAL_FRIENDS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveDmFriendId(f.id)}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-md text-xs transition-all ${
                    activeDmFriendId === f.id ? 'bg-white/15 text-white font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`}
                >
                  <div className="relative">
                    <img src={f.avatar} className="w-8 h-8 rounded-full object-cover" />
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black ${
                      f.status === 'online' ? 'bg-green-500' : f.status === 'dnd' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                  </div>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="truncate text-white font-semibold">{f.name}</span>
                    <span className="truncate text-[10px] text-gray-400">{f.activity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* SERVER CHANNELS LIST */
          <div className="flex flex-col flex-1 min-h-0">
            <div 
              onClick={() => setShowServerDropdown(!showServerDropdown)}
              className="h-12 border-b border-white/5 px-4 flex items-center justify-between font-bold text-white shadow-sm cursor-pointer hover:bg-white/5 transition-colors relative"
            >
              <span className="truncate flex items-center gap-1.5">
                <Zap className="w-4 h-4" style={{ color: customAccent }} />
                {currentServer.name}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Server Dropdown Popup */}
            {showServerDropdown && (
              <div className="absolute top-14 left-20 w-56 bg-[#111214] border border-white/10 rounded-lg shadow-2xl p-1.5 z-50 text-xs space-y-1">
                <button 
                  onClick={() => { setShowServerSettingsModal(true); setShowServerDropdown(false); }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-indigo-600 text-white flex items-center justify-between"
                >
                  <span>Paramètres du Serveur</span>
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => { setShowNitroModal(true); setShowServerDropdown(false); }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-pink-600 text-white flex items-center justify-between"
                >
                  <span>Boost de Serveur (Niv {currentServer.boostLevel})</span>
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            )}

            {/* Channels List */}
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 no-scrollbar">
              {currentServer.categories.map((cat) => (
                <div key={cat.id} className="space-y-0.5">
                  <div 
                    onClick={() => setCollapsedCategories(p => ({ ...p, [cat.id]: !p[cat.id] }))}
                    className="flex items-center text-[11px] font-bold text-gray-400 hover:text-gray-200 px-1 py-1 cursor-pointer tracking-wider"
                  >
                    {collapsedCategories[cat.id] ? <ChevronRight className="w-3.5 h-3.5 mr-1" /> : <ChevronDown className="w-3.5 h-3.5 mr-1" />}
                    <span>{cat.name}</span>
                  </div>

                  {!collapsedCategories[cat.id] && cat.channels.map((ch) => {
                    const isActive = ch.id === activeChannelId;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          if (ch.type === 'voice' || ch.type === 'stage') setActiveVoiceChannel(ch);
                          else setActiveChannelId(ch.id);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-all ${
                          isActive ? 'text-white font-medium shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                        }`}
                        style={{ backgroundColor: isActive ? customAccent : undefined }}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          {ch.type === 'ai' && <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />}
                          {ch.type === 'draw' && <PenTool className="w-4 h-4 text-pink-400 shrink-0" />}
                          {ch.type === 'arcade' && <Gamepad2 className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />}
                          {ch.type === 'text' && <Hash className="w-4 h-4 opacity-70 shrink-0" />}
                          {ch.type === 'announcement' && <Megaphone className="w-4 h-4 text-indigo-400 shrink-0" />}
                          {ch.type === 'forum' && <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {ch.type === 'voice' && <Volume2 className="w-4 h-4 text-green-400 shrink-0" />}
                          {ch.type === 'stage' && <RadioTower className="w-4 h-4 text-purple-400 shrink-0" />}
                          <span className="truncate">{ch.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Voice Control Bar */}
        {activeVoiceChannel && (
          <div className="p-3 bg-black/40 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-green-400 font-bold">
              <span className="flex items-center gap-1.5 truncate">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span className="truncate">{activeVoiceChannel.name}</span>
              </span>
              <button onClick={() => setActiveVoiceChannel(null)} className="text-red-400 hover:text-red-300">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Micro, Casque, Caméra, Screen share Controls */}
            <div className="flex items-center justify-between bg-white/5 p-1.5 rounded-lg">
              <button 
                onClick={() => setIsMicMuted(!isMicMuted)} 
                className={`p-1.5 rounded ${isMicMuted ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-gray-300'}`}
                title={isMicMuted ? "Activer Micro" : "Couper Micro"}
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsDeafened(!isDeafened)} 
                className={`p-1.5 rounded ${isDeafened ? 'bg-red-500 text-white' : 'hover:bg-white/10 text-gray-300'}`}
                title="Sourdine"
              >
                <Headphones className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsVideoOn(!isVideoOn)} 
                className={`p-1.5 rounded ${isVideoOn ? 'bg-green-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
                title="Activer Caméra"
              >
                <Video className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsScreenSharing(!isScreenSharing)} 
                className={`p-1.5 rounded ${isScreenSharing ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 text-gray-300'}`}
                title="Partager Écran"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowVoiceGridOverlay(!showVoiceGridOverlay)}
                className="p-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                title="Ouvrir Grille Vidéo"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>

            {/* Soundboard Quick Grid */}
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Soundboard</span>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { name: 'Airhorn', icon: '📢' },
                  { name: 'Victory', icon: '🎺' },
                  { name: 'GG', icon: '🎮' },
                  { name: 'Quack', icon: '🦆' }
                ].map(s => (
                  <button key={s.name} onClick={() => playSoundboard(s.name)} className="bg-white/5 hover:bg-white/15 text-[10px] p-1 rounded text-center">
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ambient Soundscapes Player Panel */}
        <div className="p-2 border-t border-white/5 bg-black/20">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Ambiance Soundscape</span>
            <Music className="w-3 h-3 text-indigo-400" />
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'lofi', label: '🎧 Lofi' },
              { id: 'rain', label: '🌧️ Pluie' },
              { id: 'coffee', label: '☕ Café' },
              { id: 'space', label: '🌌 Espace' }
            ].map(snd => (
              <button
                key={snd.id}
                onClick={() => {
                  if (activeSoundscape === snd.id) setSoundscapePlaying(!soundscapePlaying);
                  else { setActiveSoundscape(snd.id); setSoundscapePlaying(true); }
                }}
                className={`text-[10px] p-1.5 rounded transition-all truncate text-center ${
                  activeSoundscape === snd.id && soundscapePlaying 
                    ? 'bg-indigo-600 text-white font-bold animate-pulse' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom User Controls Bar */}
        <div className="h-14 bg-black/30 px-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer p-1 rounded hover:bg-white/5" onClick={() => setShowSettingsModal(true)}>
            <div className="relative">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: customAccent }}>
                {username.charAt(0)}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black" />
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-xs font-semibold text-white truncate">{username}</span>
              <span className="text-[10px] text-gray-400">Niv {userLevel} ({userXp} XP)</span>
            </div>
          </div>
          <button onClick={() => setShowSettingsModal(true)} className="p-1.5 text-gray-400 hover:text-white">
            <Palette className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT VIEW                                      */}
      {/* ========================================================= */}
      <main 
        className="flex-1 flex flex-col z-10 relative overflow-hidden backdrop-blur-sm"
        style={{ backgroundColor: bgType === 'solid' ? theme.mainBg : 'rgba(30, 32, 38, 0.70)' }}
      >
        {/* Header Bar */}
        <header className="h-12 border-b border-white/5 px-4 flex items-center justify-between shrink-0 bg-black/10">
          <div className="flex items-center space-x-2">
            {navMode === 'dms' ? (
              <div className="flex items-center space-x-2">
                <AtSign className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-white text-sm">
                  {INITIAL_FRIENDS.find(f => f.id === activeDmFriendId)?.name}
                </h3>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {currentChannel?.type === 'ai' && <Sparkles className="w-5 h-5 text-amber-400" />}
                {currentChannel?.type === 'draw' && <PenTool className="w-5 h-5 text-pink-400" />}
                {currentChannel?.type === 'arcade' && <Gamepad2 className="w-5 h-5 text-cyan-400" />}
                {currentChannel?.type === 'text' && <Hash className="w-5 h-5 text-gray-400" />}
                {currentChannel?.type === 'announcement' && <Megaphone className="w-5 h-5 text-indigo-400" />}
                {currentChannel?.type === 'forum' && <MessageCircle className="w-5 h-5 text-emerald-400" />}
                <h3 className="font-bold text-white text-sm">{currentChannel?.name}</h3>
                <span className="text-xs text-gray-400 border-l border-white/10 pl-2 hidden md:inline">
                  {currentChannel?.topic}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Search Input Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 text-xs text-white px-2.5 py-1 rounded-md pl-7 w-32 focus:w-48 transition-all focus:outline-none border border-white/10"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2" />
            </div>

            <button onClick={() => setShowPinnedModal(!showPinnedModal)} className="text-gray-400 hover:text-white p-1" title="Messages Épinglés">
              <Pin className="w-4 h-4" />
            </button>
            <button onClick={() => setShowMembersSidebar(!showMembersSidebar)} className="text-gray-400 hover:text-white p-1">
              <Users className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* VOICE GRID OVERLAY OVERRIDE */}
        {showVoiceGridOverlay || (activeVoiceChannel && currentChannel?.type === 'voice') ? (
          <div className="flex-1 bg-black/80 p-6 flex flex-col justify-between items-center relative">
            <div className="w-full flex justify-between items-center text-white">
              <span className="text-sm font-bold flex items-center gap-2">
                <Radio className="w-4 h-4 text-green-400 animate-pulse" /> Salon Vocal : {activeVoiceChannel?.name || 'Vocal'}
              </span>
              <button onClick={() => setShowVoiceGridOverlay(false)} className="bg-white/10 px-3 py-1 rounded text-xs">Fermer la vue</button>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-3xl my-auto">
              <div className="bg-[#18191c] rounded-2xl h-48 border-2 border-green-500 flex flex-col items-center justify-center relative shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-2xl text-white">
                  {username.charAt(0)}
                </div>
                <span className="mt-2 text-sm font-bold text-white">{username} (Vous)</span>
                {isMicMuted && <span className="absolute top-3 right-3 bg-red-500 p-1 rounded-full text-white"><MicOff className="w-4 h-4" /></span>}
              </div>

              <div className="bg-[#18191c] rounded-2xl h-48 border border-white/10 flex flex-col items-center justify-center relative">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" className="w-20 h-20 rounded-full object-cover" />
                <span className="mt-2 text-sm font-bold text-white">Sophia_R</span>
              </div>
            </div>

            <div className="flex space-x-4 bg-black/60 p-3 rounded-full border border-white/10">
              <button onClick={() => setIsMicMuted(!isMicMuted)} className={`p-3 rounded-full ${isMicMuted ? 'bg-red-500' : 'bg-white/10'}`}>
                {isMicMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
              </button>
              <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-3 rounded-full ${isVideoOn ? 'bg-green-600' : 'bg-white/10'}`}>
                <Video className="w-5 h-5 text-white" />
              </button>
              <button onClick={() => setActiveVoiceChannel(null)} className="p-3 rounded-full bg-red-600 hover:bg-red-500 text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : currentChannel?.type === 'forum' ? (
          /* FORUM VIEW */
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-black/30 p-4 rounded-xl border border-white/10 space-y-3">
              <h3 className="font-bold text-white text-base">Créer un nouveau sujet de discussion</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Titre du sujet..." 
                  value={newForumTitle}
                  onChange={(e) => setNewForumTitle(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-white flex-1 focus:outline-none"
                />
                <button 
                  onClick={() => {
                    if (newForumTitle) {
                      setForumPosts(p => [{ id: `fp-${Date.now()}`, title: newForumTitle, author: username, replies: 0, tags: ['Discussion'], date: 'À l\'instant' }, ...p]);
                      setNewForumTitle('');
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded"
                >
                  Publier
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {forumPosts.map(post => (
                <div key={post.id} className="bg-black/20 hover:bg-black/40 p-4 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm">{post.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>Par {post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    <span>{post.replies} réponses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : currentChannel?.type === 'arcade' ? (
          /* ARCADE VIEW */
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            <div className="bg-black/40 border border-cyan-500/30 p-8 rounded-2xl max-w-lg w-full text-center space-y-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-amber-400" /> NOVA Arcade Typer
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2.5 py-1 rounded-full font-bold">
                  Série : {arcadeStreak}x
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-gray-400">Tapez le mot le plus vite possible :</span>
                <div className="text-3xl font-black text-white tracking-widest bg-black/60 py-3 rounded-lg border border-white/10 font-mono">
                  {arcadeTargetWord}
                </div>
              </div>

              <form onSubmit={handleArcadeSubmit} className="space-y-3">
                <input
                  type="text"
                  value={arcadeInput}
                  onChange={(e) => setArcadeInput(e.target.value)}
                  placeholder="Tapez ici..."
                  autoFocus
                  className="w-full bg-black/50 border-2 border-cyan-500/50 rounded-lg px-4 py-2.5 text-center text-lg text-white font-bold focus:outline-none focus:border-cyan-400"
                />
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 rounded-lg shadow-lg">
                  Valider (+50 XP)
                </button>
              </form>

              <div className="border-t border-white/10 pt-4 flex justify-around text-xs text-gray-300">
                <div>Score Total: <span className="font-bold text-amber-400">{arcadeScore} pts</span></div>
                <div>Niveau XP: <span className="font-bold text-indigo-400">Lvl {userLevel}</span></div>
              </div>
            </div>
          </div>
        ) : currentChannel?.type === 'draw' ? (
          /* CANVAS VIEW */
          <div className="flex-1 flex flex-col p-4 space-y-3">
            <div className="flex items-center justify-between bg-black/30 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-300">Couleur:</span>
                {['#5865f2', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#ffffff'].map(c => (
                  <button key={c} onClick={() => setDrawColor(c)} className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                ))}
              </div>
              <button onClick={clearCanvas} className="flex items-center space-x-1 bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded">
                <Eraser className="w-3.5 h-3.5" />
                <span>Effacer Tout</span>
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="flex-1 bg-black/40 rounded-lg border border-white/10 cursor-crosshair w-full"
            />
          </div>
        ) : (
          /* REGULAR CHAT FEED */
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
            {currentMessages.map((msg) => (
              <div key={msg.id} className="group flex space-x-3 hover:bg-white/5 -mx-4 px-4 py-1.5 rounded transition-colors relative">
                <div className="shrink-0 cursor-pointer" onClick={() => {
                  const foundUser = MEMBERS_LIST.find(m => m.name === msg.user.name);
                  if (foundUser) setSelectedProfileUser(foundUser);
                }}>
                  {msg.user.isBot ? (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {msg.user.avatar}
                    </div>
                  ) : (
                    <img src={msg.user.avatar} className="w-9 h-9 rounded-full object-cover border border-white/10 hover:scale-105 transition-transform" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span 
                      onClick={() => {
                        const foundUser = MEMBERS_LIST.find(m => m.name === msg.user.name);
                        if (foundUser) setSelectedProfileUser(foundUser);
                      }}
                      className="font-semibold text-white text-sm hover:underline cursor-pointer"
                    >
                      {msg.user.name}
                    </span>
                    {msg.user.isBot && <span className="bg-indigo-600 text-white text-[9px] font-bold px-1 rounded">BOT</span>}
                    <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                    {msg.pinned && <Pin className="w-3 h-3 text-amber-400" />}
                  </div>

                  <p className="text-gray-200 text-sm mt-0.5 whitespace-pre-wrap">{msg.content}</p>

                  {/* Message Reactions display */}
                  {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {Object.entries(msg.reactions).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          onClick={() => handleAddReaction(msg.id, emoji)}
                          className="bg-white/10 hover:bg-white/20 text-xs px-2 py-0.5 rounded-full flex items-center space-x-1 border border-white/5"
                        >
                          <span>{emoji}</span>
                          <span className="text-gray-300 font-bold">{count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover Quick Actions Bar */}
                <div className="absolute right-4 -top-3 hidden group-hover:flex items-center bg-[#2b2d31] border border-white/10 rounded-md p-1 shadow-lg space-x-1 z-20">
                  <button onClick={() => handleAddReaction(msg.id, '❤️')} className="p-1 hover:bg-white/10 rounded text-xs">❤️</button>
                  <button onClick={() => handleAddReaction(msg.id, '🔥')} className="p-1 hover:bg-white/10 rounded text-xs">🔥</button>
                  <button onClick={() => setReplyToMessage(msg)} className="p-1 hover:bg-white/10 rounded text-xs text-gray-300" title="Répondre">
                    <CornerUpLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => togglePinMessage(msg.id)} className="p-1 hover:bg-white/10 rounded text-xs text-gray-300" title="Épingler">
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {aiIsThinking && (
              <div className="flex items-center space-x-2 text-amber-400 text-xs animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>NOVA Spark AI réfléchit...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
        )}

        {/* Reply Indicator Preview */}
        {replyToMessage && (
          <div className="bg-black/40 px-4 py-1.5 flex items-center justify-between border-t border-white/5 text-xs text-gray-300">
            <span className="truncate">En réponse à <strong className="text-white">@{replyToMessage.user.name}</strong></span>
            <button onClick={() => setReplyToMessage(null)} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Message Input & Slash Menu */}
        {currentChannel?.type !== 'draw' && currentChannel?.type !== 'arcade' && (
          <form onSubmit={handleSendMessage} className="p-4 pt-0 space-y-2 relative">
            {/* Slash Command Suggestions */}
            {messageInput.startsWith('/') && (
              <div className="absolute bottom-16 left-4 bg-[#111214] border border-white/10 rounded-lg p-2 shadow-2xl z-50 w-64 space-y-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Commandes Slash</div>
                {[
                  { cmd: '/shrug', desc: '¯\\_(ツ)_/¯' },
                  { cmd: '/tableflip', desc: '(╯°□°）╯︵ ┻━┻' },
                  { cmd: '/poll [Question]', desc: 'Créer un sondage' }
                ].map(c => (
                  <button
                    type="button"
                    key={c.cmd}
                    onClick={() => setMessageInput(c.cmd + ' ')}
                    className="w-full text-left text-xs p-1.5 hover:bg-indigo-600 rounded text-white flex justify-between"
                  >
                    <span className="font-bold">{c.cmd}</span>
                    <span className="text-gray-400 text-[10px]">{c.desc}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-1 px-1">
              {customEmojis.map(emoji => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setMessageInput(prev => prev + ' ' + emoji)}
                  className="text-sm p-1 rounded hover:bg-white/10 active:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="bg-black/30 rounded-lg px-4 py-2.5 flex items-center space-x-3 border border-white/5">
              <button type="button" className="text-gray-400 hover:text-white p-1" title="Ajouter un fichier">
                <Plus className="w-4 h-4" />
              </button>

              <input 
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={navMode === 'dms' ? "Envoyer un message privé..." : `Envoyer dans #${currentChannel?.name}`}
                className="bg-transparent text-sm text-white focus:outline-none flex-1 placeholder-gray-500"
              />

              <button 
                type="button"
                onClick={() => {
                  setIsRecordingAudio(!isRecordingAudio);
                  if (!isRecordingAudio) setMessageInput('🎤 [Message Vocal - 0:04]');
                }}
                className={`p-1.5 rounded ${isRecordingAudio ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white'}`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button type="submit" className="p-1.5 rounded text-white" style={{ backgroundColor: customAccent }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </main>

      {/* ========================================================= */}
      {/* 4. RIGHTMOST SIDEBAR - MEMBERS LIST                       */}
      {/* ========================================================= */}
      {showMembersSidebar && (
        <aside 
          className="w-56 border-l border-white/5 p-3 space-y-4 shrink-0 hidden lg:flex flex-col"
          style={{ backgroundColor: bgType === 'solid' ? theme.cardBg : 'rgba(25, 27, 32, 0.75)' }}
        >
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Membres — {MEMBERS_LIST.length}</div>
          <div className="space-y-1">
            {MEMBERS_LIST.map((m) => (
              <div 
                key={m.id} 
                onClick={() => setSelectedProfileUser(m)}
                className="flex items-center space-x-2.5 p-1 rounded hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    {m.avatar.startsWith('http') ? <img src={m.avatar} className="w-8 h-8 rounded-full object-cover" /> : m.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black ${
                    m.status === 'online' ? 'bg-green-500' : m.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-white truncate flex items-center gap-1">
                    <span>{m.name}</span>
                    {m.isBot && <BadgeCheck className="w-3 h-3 text-amber-400 inline" />}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">{m.richActivity || m.customStatus}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* ========================================================= */}
      {/* 5. MODALS & POPUPS                                        */}
      {/* ========================================================= */}
      
      {/* PINNED MESSAGES MODAL */}
      {showPinnedModal && (
        <div className="fixed top-14 right-16 w-80 bg-[#1e1f22] border border-white/10 rounded-xl p-4 shadow-2xl z-50 text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="font-bold text-white flex items-center gap-1.5"><Pin className="w-4 h-4 text-amber-400" /> Messages Épinglés</span>
            <button onClick={() => setShowPinnedModal(false)} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {pinnedMessagesList.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Aucun message épinglé.</p>
            ) : (
              pinnedMessagesList.map(pm => (
                <div key={pm.id} className="bg-black/30 p-2 rounded border border-white/5 space-y-1">
                  <span className="font-bold text-indigo-400">{pm.user.name}</span>
                  <p className="text-white">{pm.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* NITRO & SERVER BOOST MODAL */}
      {showNitroModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 w-full max-w-md rounded-2xl p-6 border border-pink-500/30 shadow-2xl space-y-6 text-white text-center">
            <div className="flex justify-end">
              <button onClick={() => setShowNitroModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 mx-auto flex items-center justify-center shadow-lg animate-pulse">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">NOVA Nitro & Server Boost</h2>
              <p className="text-xs text-pink-200 mt-1">Débloquez des émojis personnalisés, la qualité vidéo HD et des thèmes exclusifs !</p>
            </div>
            <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-green-400 font-bold"><Check className="w-4 h-4" /> Qualité d'enregistrement audio 384 kbps</div>
              <div className="flex items-center gap-2 text-green-400 font-bold"><Check className="w-4 h-4" /> Fonds d'écran personnalisés sans limite</div>
              <div className="flex items-center gap-2 text-green-400 font-bold"><Check className="w-4 h-4" /> Badge exclusif sur votre profil</div>
            </div>
            <button onClick={() => setShowNitroModal(false)} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 font-bold py-3 rounded-xl shadow-xl">
              Obtenir Nitro pour 9.99€ / mois
            </button>
          </div>
        </div>
      )}

      {/* USER PROFILE CARD MODAL */}
      {selectedProfileUser && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#18191c] w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <div className="h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
              <button onClick={() => setSelectedProfileUser(null)} className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 relative -top-10 flex justify-between items-end">
              <div className="w-20 h-20 rounded-full border-4 border-[#18191c] overflow-hidden bg-indigo-500 flex items-center justify-center text-2xl text-white font-bold shadow-xl">
                {selectedProfileUser.avatar.startsWith('http') ? <img src={selectedProfileUser.avatar} className="w-full h-full object-cover" /> : selectedProfileUser.avatar}
              </div>
            </div>
            <div className="px-5 pb-6 space-y-4 -mt-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">{selectedProfileUser.name}</h3>
                <p className="text-xs text-gray-400">{selectedProfileUser.role}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">À propos</span>
                <p className="text-xs text-gray-300">{selectedProfileUser.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#1e1f22] w-full max-w-lg rounded-xl overflow-hidden border border-white/10 shadow-2xl space-y-4">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold text-white text-lg flex items-center gap-2"><Palette className="w-5 h-5 text-indigo-400" /> Paramètres NOVA</h2>
              <button onClick={() => setShowSettingsModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">Thèmes Prédéfinis</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t); setCustomAccent(t.accent); }}
                      className={`p-3 rounded-lg border text-left text-xs font-bold transition-all ${
                        theme.id === t.id ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-white/10 hover:border-white/30'
                      }`}
                      style={{ backgroundColor: t.bg, color: t.text }}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/10 flex justify-end">
              <button onClick={() => setShowSettingsModal(false)} className="px-4 py-2 rounded-lg text-white font-bold text-xs" style={{ backgroundColor: customAccent }}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}