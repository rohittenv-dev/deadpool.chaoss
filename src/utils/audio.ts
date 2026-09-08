let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function toggleAudio(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  
  if (soundEnabled && !audioCtx) {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    } catch {
      // Graceful fallback
    }
  }
  
  if (soundEnabled && audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  return soundEnabled;
}

function getContext(): AudioContext | null {
  if (!soundEnabled) return null;
  if (!audioCtx) {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    } catch {
      return null;
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound() {
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}

export function playPunchSound() {
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.2);

  // Add noise burst
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start();

  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

export function playPopSound() {
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.09);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.09);
}

export function playBoingSound() {
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(250, now + 0.3);
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(now + 0.3);
}

export function playRecordScratchSound() {
  const ctx = getContext();
  if (!ctx) return;
  const bufferSize = ctx.sampleRate * 0.25;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.sin(i / 10);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2500, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.25);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start();
}

export function playVictorySound() {
  const ctx = getContext();
  if (!ctx) return;
  const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
  const now = ctx.currentTime;
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, now + idx * 0.1);
    gain.gain.setValueAtTime(0.12, now + idx * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.1);
    osc.stop(now + idx * 0.1 + 0.2);
  });
}

export function playFailSound() {
  const ctx = getContext();
  if (!ctx) return;
  const notes = [440, 415.3, 392, 349.23];
  const now = ctx.currentTime;
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now + idx * 0.18);
    gain.gain.setValueAtTime(0.15, now + idx * 0.18);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + idx * 0.18);
    osc.stop(now + idx * 0.18 + 0.25);
  });
}

export function playChaosSound(level = 1) {
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  const now = ctx.currentTime;
  const baseFreq = 200 + level * 70;
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.linearRampToValueAtTime(baseFreq * 2.5, now + 0.15);
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.35);
  gain.gain.setValueAtTime(0.25 + Math.min(level * 0.05, 0.3), now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(now + 0.35);
}

export function playTacoCrunchSound() {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // 2 mini burst crunches
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(120 + i * 80, now + i * 0.05);
    gain.gain.setValueAtTime(0.18, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.05);
  }
}

export function playPhoneRingSound() {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // Standard dual-frequency phone ring tone: 440Hz and 480Hz
  [440, 480].forEach(freq => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.setValueAtTime(0.1, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  });
}

