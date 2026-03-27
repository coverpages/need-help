import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEELINGS = [
  { label: 'Overwhelmed', emoji: '😵', color: '#FFB5C8', textColor: '#7D2245' },
  { label: 'Frustrated',  emoji: '😤', color: '#FFD6A5', textColor: '#7D4A00' },
  { label: 'Exhausted',   emoji: '😴', color: '#C3F0CA', textColor: '#1A5C2A' },
  { label: 'Anxious',     emoji: '😰', color: '#BDE0FE', textColor: '#1A3D6E' },
  { label: "I'm doing okay", emoji: '🙂', color: '#D4F1F4', textColor: '#145C63' },
]

const SITUATIONS = [
  { label: 'Kid throwing a tantrum',          emoji: '😭' },
  { label: 'Not listening',                   emoji: '🙉' },
  { label: 'Siblings fighting',               emoji: '👊' },
  { label: 'Sleep issues',                    emoji: '😪' },
  { label: 'Feeling disconnected from my child', emoji: '💔' },
  { label: 'Something else',                  emoji: '🤷' },
]

const TIPS_MAP = {
  'Overwhelmed': {
    'Kid throwing a tantrum': [
      '🌬️ Take 5 deep breaths together — your calm is their anchor',
      "🗣️ Name the emotion out loud: \"You're really upset right now, and that's okay\"",
      '🛋️ Give them a safe, quiet space to cool down without pressure',
    ],
    'Not listening': [
      '👁️ Get down to their eye level and speak softly — connection before direction',
      '📋 Use short, clear instructions — s�ht instructions one at a time, not a list',
      '⚖️ Pick your battles — not everything needs a response when you\'re at capacity',
    ],
    'Siblings fighting': [
      '✋ Calmly separate them before trying to mediate — space first',
      '❤️ Validate each child\'s feelings separately, one at a time',
      '🕊️ It\'s okay to step away for a moment to reset yourself first',
    ],
    'Sleep issues': [
      '🌙 A predictable routine (bath → book → bed) signals sleep time to their brain',
      '🔊 White noise or soft music can help settle an overtired child',
      '🤝 You\'re not alone — sleep struggles are one of parenting\'s hardest parts',
    ],
    'Feeling disconnected from my child': [
      '⏱️ Try 10 minutes of undivided, phone-free play — let them lead',
      '👀 Full presence (eye contact + listening) matters more than big gestures',
      '💬 Connection before correction — reconnect first, address behavior after',
    ],
    'Something else': [
      '🌱 Take it one breath at a time — you don\'t have to solve it all right now',
      '📞 Reach out to someone you trust — a friend, a partner, anyone',
      '💪 You\'re doing better than you think. Asking for help is strength.',
    ],
  },

  'Frustrated': {
    'Kid throwing a tantrum': [
      '😌 Stay calm — your calm genuinely is contagious to them',
      '🚫 Avoid negotiating during a meltdown — wait for the storm to pass',
      "❤️ Validate first: \"I see you're really upset. I'm here.\"",
    ],
    'Not listening': [
      '🤫 Try whispering instead of raising your voice — it\'s surprisingly effective',
      '✌️ Give them two choices so they feel some sense of control',
      '📚 Natural consequences often teach more than lectures',
    ],
    'Siblings fighting': [
      '⚖️ Avoid taking sides — focus on feelings, not who started it',
      '💬 Teach "I feel" statements: "I feel sad when you take my toy"',
      '🌟 Notice and celebrate cooperation whenever you spot it',
    ],
    'Sleep issues': [
      '⏰ Consistency is everything — same time, same routine, every night',
      '🍽️ Check for hunger or overstimulation before assuming it\'s behavioral',
      '💛 It\'s completely okay to feel frustrated — this is genuinely hard',
    ],
    'Feeling disconnected from my child': [
      '🔍 Frustration can sometimes signal we need more connection, not more discipline',
      '😄 Try a spontaneous hug or a silly moment to break the tension',
      '❓ Ask about their day with curiosity, not interrogation',
    ],
    'Something else': [
      '🏷️ Pause and name your own emotion first — that awareness is half the work',
      '⏸️ Give yourself 60 seconds to step away and breathe — it counts',
      '💛 You\'re not a bad parent for feeling frustrated. Frustration means you care.',
    ],
  },

  'Exhausted': {
    'Kid throwing a tantrum': [
      '📉 Lower the bar today — survival mode is completely valid',
      '🧘 A calm, quiet corner can help de-escalate without much from you',
      '✅ You don\'t have to fix everything right now. Just get through this moment.',
    ],
    'Not listening': [
      '1️⃣ Simplify everything — one instruction at a time, short and clear',
      '😂 Try a silly voice or a funny face — humor often works better than firmness',
      '😴 Even 10 minutes of rest when they\'re occupied helps you reset',
    ],
    'Siblings fighting': [
      '👤 Give each child a few minutes of one-on-one time, even briefly',
      '📜 A simple household peace rule ("We use kind words") can reduce your refereeing',
      '🤝 Ask your partner or support network for backup — you\'re allowed to need it',
    ],
    'Sleep issues': [
      '🌜 Try a consistent wind-down routine: dim lights → bath → book → bed',
      '🔊 White noise can work wonders for an overtired child',
      '🙌 It\'s okay to ask for help — sleep deprivation affects everything',
    ],
    'Feeling disconnected from my child': [
      '🤏 Even small moments count — a hug, eye contact, a shared laugh',
      '📖 Reading together is low-energy, high-connection — great for exhausted days',
      '💛 Tired parents love deeply too. Be as gentle with yourself as you are with them.',
    ],
    'Something else': [
      '💤 Rest is not a luxury right now — it\'s how you keep going',
      '📞 Ask someone you trust for relief today, even for an hour',
      '🌟 You are carrying so much. It is okay — necessary even — to ask for help.',
    ],
  },

  'Anxious': {
    'Kid throwing a tantrum': [
      '🦶 Ground yourself first — feet flat on the floor, 4 slow breaths',
      '📘 Tantrums are developmentally normal, not a sign you\'re doing it wrong',
      '⏳ This moment will pass. You\'ve gotten through hard moments before.',
    ],
    'Not listening': [
      '🔍 Anxiety makes small things feel huge — notice that and name it to yourself',
      '🎯 Focus on just one thing right now instead of the whole picture',
      '💡 Your child is still learning, not defying you — their brain is developing',
    ],
    'Siblings fighting': [
      '📊 Sibling conflict is completely normal — you don\'t have to solve it all',
      '🪞 Modeling calm conflict resolution teaches them more than intervening every time',
      '👀 It\'s okay to observe before jumping in — give it 60 seconds first',
    ],
    'Sleep issues': [
      '📵 Limit screens before bed for everyone — it makes a real difference',
      '📓 Writing your worries down before bed can help clear mental space',
      '🏥 If sleep anxiety is persistent, talking to your doctor is a great next step',
    ],
    'Feeling disconnected from my child': [
      '💛 Anxiety can make connection harder — be patient and kind with yourself about it',
      '🤏 Start small: a hug, a smile, eye contact. Small moments add up.',
      '❤️ You noticing the disconnect is itself a sign of how deeply you care',
    ],
    'Something else': [
      '🖐️ Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you feel, 3 you hear...',
      '🧑‍⚕️ Consider reaching out to a therapist or a parent support group — it helps',
      '💪 Your feelings are valid. You don\'t have to white-knuckle this alone.',
    ],
  },

  "I'm doing okay": {
    default: [
      '🌟 You\'re doing great — keep checking in with yourself like this',
      '🤝 Share what\'s working with other parents — your experience can light the way',
      '🎉 Celebrate the small wins today. They matter more than you realize.',
    ],
  },
}

function getTips(feeling, situation) {
  if (feeling === "I'm doing okay") {
    return TIPS_MAP["I'm doing okay"].default
  }
  const feelingTips = TIPS_MAP[feeling]
  if (feelingTips && feelingTips[situation]) {
    return feelingTips[situation]
  }
  return [
    '🌱 Take it one breath at a time',
    '💛 You\'re doing better than you know',
    '📞 Reach out to someone you trust — you don\'t have to do this alone',
  ]
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  app: {
    minHeight: '100dvh',
    background: 'linear-gradient(160deg, #FFF1E6 0%, #FDE8D8 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 0 env(safe-area-inset-bottom, 16px)',
  },
  header: {
    width: '100%',
    background: 'linear-gradient(135deg, #F4845F 0%, #F5A97F 100%)',
    padding: '20px 20px 24px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(244,132,95,0.25)',
  },
  appTitle: {
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: '6px',
  },
  screenTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#fff',
    lineHeight: '1.3',
    maxWidth: '320px',
    margin: '0 auto',
  },
  content: {
    width: '100%',
    maxWidth: '480px',
    padding: '24px 16px 32px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    animation: 'slideUp 0.3s ease-out',
  },
  feelingBtn: (color, textColor, selected) => ({
    width: '100%',
    padding: '18px 20px',
    borderRadius: '20px',
    background: selected ? color : '#fff',
    border: `2.5px solid ${selected ? textColor : color}`,
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '17px',
    fontWeight: '700',
    color: selected ? textColor : '#3D2B1F',
    boxShadow: selected
      ? `0 4px 16px ${color}80`
      : '0 2px 8px rgba(0,0,0,0.06)',
    transform: selected ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
  }),
  emojiCircle: (color) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    flexShrink: 0,
  }),
  situationBtn: (selected) => ({
    width: '100%',
    padding: '16px 18px',
    borderRadius: '18px',
    background: selected ? '#F4845F' : '#fff',
    border: `2.5px solid ${selected ? '#F4845F' : '#F5D5C5'}`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: selected ? '#fff' : '#3D2B1F',
    boxShadow: selected
      ? '0 4px 16px rgba(244,132,95,0.35)'
      : '0 2px 8px rgba(0,0,0,0.05)',
    transform: selected ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    textAlign: 'left',
  }),
  situationEmoji: {
    fontSize: '22px',
    flexShrink: 0,
  },
  textarea: {
    width: '100%',
    borderRadius: '16px',
    border: '2px solid #F5D5C5',
    background: '#fff',
    padding: '14px 16px',
    fontSize: '15px',
    color: '#3D2B1F',
    resize: 'none',
    lineHeight: '1.5',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  textareaLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#A0745A',
    marginBottom: '6px',
    display: 'block',
  },
  nextBtn: {
    width: '100%',
    padding: '18px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #F4845F 0%, #F5A97F 100%)',
    color: '#fff',
    fontSize: '17px',
    fontWeight: '800',
    letterSpacing: '0.3px',
    boxShadow: '0 6px 20px rgba(244,132,95,0.4)',
    transition: 'all 0.15s ease',
    marginTop: '8px',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: '#A0745A',
    fontSize: '14px',
    fontWeight: '600',
    padding: '8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginBottom: '-4px',
  },
  tipCard: (i) => ({
    width: '100%',
    padding: '18px 20px',
    borderRadius: '20px',
    background: '#fff',
    border: '2px solid #F5D5C5',
    fontSize: '15px',
    fontWeight: '500',
    color: '#3D2B1F',
    lineHeight: '1.55',
    boxShadow: '0 4px 16px rgba(244,132,95,0.1)',
    animation: `slideUp 0.35s ease-out ${i * 0.1}s both`,
  }),
  summaryPill: (color, textColor) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '30px',
    background: color,
    color: textColor,
    fontSize: '13px',
    fontWeight: '700',
  }),
  summaryRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '4px',
  },
  divider: {
    width: '100%',
    height: '1px',
    background: '#F5D5C5',
    margin: '8px 0',
  },
  sectionLabel: {
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#C08060',
    marginBottom: '4px',
  },
  resetBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '20px',
    background: 'transparent',
    border: '2.5px solid #F4845F',
    color: '#F4845F',
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '8px',
    transition: 'all 0.15s ease',
  },
  progressDots: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    padding: '12px 0 0',
  },
  dot: (active) => ({
    width: active ? '20px' : '8px',
    height: '8px',
    borderRadius: '4px',
    background: active ? '#fff' : 'rgba(255,255,255,0.45)',
    transition: 'all 0.25s ease',
  }),
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function Screen1({ onSelect, selectedFeeling, note, onNoteChange }) {
  return (
    <>
      <div style={s.header}>
        <div style={s.appTitle}>Parenting Support</div>
        <div style={s.screenTitle}>How are you feeling right now?</div>
        <div style={s.progressDots}>
          <div style={s.dot(true)} />
          <div style={s.dot(false)} />
          <div style={s.dot(false)} />
        </div>
      </div>
      <div style={s.content}>
        {FEELINGS.map((f) => (
          <button
            key={f.label}
            style={s.feelingBtn(f.color, f.textColor, selectedFeeling === f.label)}
            onClick={() => onSelect(f.label)}
          >
            <div style={s.emojiCircle(f.color)}>{f.emoji}</div>
            {f.label}
          </button>
        ))}
        <div style={{ marginTop: '8px' }}>
          <span style={s.textareaLabel}>Want to share more? (optional)</span>
          <textarea
            style={s.textarea}
            rows={3}
            placeholder="Write anything on your mind..."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#F4845F' }}
            onBlur={(e) => { e.target.style.borderColor = '#F5D5C5' }}
          />
        </div>
      </div>
    </>
  )
}

function Screen2({ feeling, onSelect, selectedSituation, onBack, note, onNoteChange }) {
  return (
    <>
      <div style={s.header}>
        <div style={s.appTitle}>Parenting Support</div>
        <div style={s.screenTitle}>What's going on?</div>
        <div style={s.progressDots}>
          <div style={s.dot(false)} />
          <div style={s.dot(true)} />
          <div style={s.dot(false)} />
        </div>
      </div>
      <div style={s.content}>
        <button style={s.backBtn} onClick={onBack}>← Back</button>
        {SITUATIONS.map((sit) => (
          <button
            key={sit.label}
            style={s.situationBtn(selectedSituation === sit.label)}
            onClick={() => onSelect(sit.label)}
          >
            <span style={s.situationEmoji}>{sit.emoji}</span>
            {sit.label}
          </button>
        ))}
        <div style={{ marginTop: '8px' }}>
          <span style={s.textareaLabel}>Want to share more? (optional)</span>
          <textarea
            style={s.textarea}
            rows={3}
            placeholder="Describe what's happening..."
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#F4845F' }}
            onBlur={(e) => { e.target.style.borderColor = '#F5D5C5' }}
          />
        </div>
      </div>
    </>
  )
}

function Screen3({ feeling, situation, tips, note1, note2, onReset }) {
  const feelingData = FEELINGS.find(f => f.label === feeling)

  return (
    <>
      <div style={s.header}>
        <div style={s.appTitle}>Parenting Support</div>
        <div style={s.screenTitle}>Here's what might help 💛</div>
        <div style={s.progressDots}>
          <div style={s.dot(false)} />
          <div style={s.dot(false)} />
          <div style={s.dot(true)} />
        </div>
      </div>
      <div style={s.content}>
        <div style={s.summaryRow}>
          {feelingData && (
            <div style={s.summaryPill(feelingData.color, feelingData.textColor)}>
              {feelingData.emoji} {feeling}
            </div>
          )}
          {situation && feeling !== "I'm doing okay" && (
            <div style={s.summaryPill('#F5EAE0', '#7D4A1A')}>
              {SITUATIONS.find(s => s.label === situation)?.emoji} {situation}
            </div>
          )}
        </div>

        <div style={s.divider} />
        <div style={s.sectionLabel}>Tips for you</div>

        {tips.map((tip, i) => (
          <div key={i} style={s.tipCard(i)}>
            {tip}
          </div>
        ))}

        y(note1 || note2) && (
          <>
            <div style={s.divider} />
            <div style={s.sectionLabel}>Your notes</div>
            {note1 && (
              <div style={{ ...s.tipCard(tips.length), background: '#FFF8F2', borderColor: '#F5D5C5', fontStyle: 'italic', color: '#7D5A48', fontSize: '14px' }}>
                💬 {note1}
              </div>
            )}
            {note2 && (
              <div style={{ ...s.tipCard(tips.length + 1), background: '#FFF8F2', borderColor: '#F5D5C5', fontStyle: 'italic', color: '#7D5A48', fontSize: '14px' }}>
                💬 {note2}
              </div>
            )}
          </>
        )}

        <div style={{ ...s.tipCard(tips.length + 2), background: 'linear-gradient(135deg, #FFF1E6, #FDE8D8)', borderColor: '#F5C8A8', textAlign: 'center', fontWeight: '600', color: '#C06030' }}>
          🤍 You reached out. That takes courage. You're doing a great job.
        </div>

        <button
          style={s.resetBtn}
          onClick={onReset}
          onMouseEnter={(e) => { e.target.style.background = '#F4845F'; e.target.style.color = '#fff' }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#F4845F' }}
        >
          ↺ Start over
        </button>
      </div>
    </>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState(1)
  const [feeling, setFeeling] = useState(null)
  const [situation, setSituation] = useState(null)
  const [note1, setNote1] = useState('')
  const [note2, setNote2] = useState('')

  const handleFeelingSelect = (f) => {
    setFeeling(f)
    // "I'm doing okay" can skip to tips directly or go to Screen 2 for context
    setScreen(2)
  }

  const handleSituationSelect = (sit) => {
    setSituation(sit)
    setScreen(3)
  }

  const handleReset = () => {
    setScreen(1)
    setFeeling(null)
    setSituation(null)
    setNote1('')
    setNote2('')
  }

  const tips = feeling ? getTips(feeling, situation) : []

  return (
    <div style={s.app}>
      {screen === 1 && (
        <Screen1
          onSelect={handleFeelingSelect}
          selectedFeeling={feeling}
          note={note1}
          onNoteChange={setNote1}
        />
      )}
      {screen === 2 && (
        <Screen2
          feeling={feeling}
          onSelect={handleSituationSelect}
          selectedSituation={situation}
          onBack={() => setScreen(1)}
          note={note2}
          onNoteChange={setNote2}
        />
      )}
      {screen === 3 && (
        <Screen3
          feeling={feeling}
          situation={situation}
          tips={tips}
          note1={note1}
          note2={note2}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
