const fs = require('fs');
const path = require('path');

// Output file path
const outDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'academic_spotlight_soundtrack.wav');

// Audio Format Specs
const sampleRate = 44100;
const durationSeconds = 58;
const totalSamples = Math.floor(sampleRate * durationSeconds);
const numChannels = 2; // Stereo

// Float audio buffers
const leftChannel = new Float32Array(totalSamples);
const rightChannel = new Float32Array(totalSamples);

// Note frequencies
const N = {
  D2: 73.42, F2: 87.31, G2: 98.00, A2: 110.00, Bb2: 116.54, C3: 130.81,
  D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, B3: 246.94, C4: 261.63,
  D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, C5: 523.25,
  D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
};

// Acoustic Piano / Pluck generator (Additive harmonic synthesis with physical strike envelope)
function addPianoPluck(freq, startSec, durationSec, velocity, pan = 0.0) {
  const startSample = Math.floor(startSec * sampleRate);
  const numSamples = Math.floor(durationSec * sampleRate);

  // Harmonics weighting for acoustic piano timbre
  const harmonics = [
    { mult: 1.0, amp: 1.00, decay: 1.0 },
    { mult: 2.0, amp: 0.65, decay: 1.4 },
    { mult: 3.0, amp: 0.35, decay: 2.0 },
    { mult: 4.0, amp: 0.20, decay: 2.8 },
    { mult: 5.0, amp: 0.12, decay: 3.6 },
    { mult: 6.0, amp: 0.06, decay: 4.5 },
  ];

  const leftGain = Math.cos((pan + 1) * Math.PI / 4) * velocity * 0.25;
  const rightGain = Math.sin((pan + 1) * Math.PI / 4) * velocity * 0.25;

  for (let i = 0; i < numSamples; i++) {
    const targetIdx = startSample + i;
    if (targetIdx >= totalSamples) break;

    const t = i / sampleRate;
    // Hammer strike impulse + natural body resonance
    const attack = Math.min(1.0, i / (sampleRate * 0.006)); // 6ms sharp acoustic hammer attack

    let sampleVal = 0;
    for (let h = 0; h < harmonics.length; h++) {
      const harm = harmonics[h];
      const hFreq = freq * harm.mult;
      if (hFreq > sampleRate / 2) continue;

      const decayFactor = Math.exp(-t * (1.8 * harm.decay));
      sampleVal += Math.sin(2 * Math.PI * hFreq * t) * harm.amp * decayFactor;
    }

    const finalSample = sampleVal * attack;
    leftChannel[targetIdx] += finalSample * leftGain;
    rightChannel[targetIdx] += finalSample * rightGain;
  }
}

// Lush Warm String / Cello Ensemble generator
function addStringSwell(freqs, startSec, durationSec, velocity, pan = 0.0) {
  const startSample = Math.floor(startSec * sampleRate);
  const numSamples = Math.floor(durationSec * sampleRate);

  const attackSamples = Math.floor(sampleRate * 0.8); // 800ms slow cinematic swell
  const releaseSamples = Math.floor(sampleRate * 1.0); // 1s smooth release

  const leftGain = Math.cos((pan + 1) * Math.PI / 4) * velocity * 0.08;
  const rightGain = Math.sin((pan + 1) * Math.PI / 4) * velocity * 0.08;

  for (let i = 0; i < numSamples; i++) {
    const targetIdx = startSample + i;
    if (targetIdx >= totalSamples) break;

    const t = i / sampleRate;

    // Amplitude envelope
    let env = 1.0;
    if (i < attackSamples) {
      env = i / attackSamples;
    } else if (i > numSamples - releaseSamples) {
      env = (numSamples - i) / releaseSamples;
    }

    // Subtle 4.5Hz vibrato
    const vibrato = 1.0 + 0.003 * Math.sin(2 * Math.PI * 4.5 * t);

    let sum = 0;
    for (let f = 0; f < freqs.length; f++) {
      const baseF = freqs[f] * vibrato;
      // Warm sawtooth / bowed string approximation with 5 harmonics
      sum += Math.sin(2 * Math.PI * baseF * t) * 0.7;
      sum += Math.sin(2 * Math.PI * baseF * 2 * t) * 0.35;
      sum += Math.sin(2 * Math.PI * baseF * 3 * t) * 0.18;
      sum += Math.sin(2 * Math.PI * baseF * 4 * t) * 0.08;
    }

    const val = sum * env;
    leftChannel[targetIdx] += val * leftGain;
    rightChannel[targetIdx] += val * rightGain;
  }
}

// Subtle Cinematic Acoustic Heartbeat / Low Pulse
function addSubPulse(startSec, velocity) {
  const startSample = Math.floor(startSec * sampleRate);
  const numSamples = Math.floor(sampleRate * 0.4);

  for (let i = 0; i < numSamples; i++) {
    const targetIdx = startSample + i;
    if (targetIdx >= totalSamples) break;

    const t = i / sampleRate;
    const pitch = 70 * Math.exp(-t * 12) + 38; // pitch drop 70Hz -> 38Hz
    const env = Math.exp(-t * 9) * velocity * 0.22;
    const val = Math.sin(2 * Math.PI * pitch * t) * env;

    leftChannel[targetIdx] += val;
    rightChannel[targetIdx] += val;
  }
}

// Soft Acoustic Shimmer Hat
function addShimmer(startSec, velocity) {
  const startSample = Math.floor(startSec * sampleRate);
  const numSamples = Math.floor(sampleRate * 0.08);

  for (let i = 0; i < numSamples; i++) {
    const targetIdx = startSample + i;
    if (targetIdx >= totalSamples) break;

    const t = i / sampleRate;
    const env = Math.exp(-t * 60) * velocity * 0.05;
    // High frequency acoustic metallic ring
    const val = (Math.sin(2 * Math.PI * 4800 * t) + Math.sin(2 * Math.PI * 7200 * t)) * env;

    leftChannel[targetIdx] += val * 0.7;
    rightChannel[targetIdx] += val * 1.0;
  }
}

console.log('Composing 58-second cinematic musical score...');

// ==========================================
// SCENE 1: ACADEMIC FOUNDATIONS (0s - 12s)
// Progression: Dm9 -> Bbmaj7 -> Gm9 -> Asus4
// ==========================================
const bpm = 96;
const beat = 60 / bpm; // ~0.625s per beat
const measure = beat * 4; // 2.5s per measure

// Measures 0-4 (0.0s to 10.0s)
const s1Chords = [
  { root: N.D2, pad: [N.D3, N.F3, N.A3, N.C4], arp: [N.D4, N.F4, N.A4, N.C5, N.A4, N.F4] },
  { root: N.Bb2, pad: [N.Bb3, N.D4, N.F4, N.A4], arp: [N.D4, N.F4, N.Bb4, N.D5, N.Bb4, N.F4] },
  { root: N.G2, pad: [N.G3, N.Bb3, N.D4, N.F4], arp: [N.D4, N.G4, N.Bb4, N.D5, N.Bb4, N.G4] },
  { root: N.A2, pad: [N.A3, N.D4, N.E4, N.A4], arp: [N.E4, N.A4, N.D5, N.E5, N.D5, N.A4] },
  { root: N.D2, pad: [N.D3, N.F3, N.A3, N.D4], arp: [N.F4, N.A4, N.D5, N.F5, N.D5, N.A4] }
];

for (let m = 0; m < s1Chords.length; m++) {
  const mTime = m * measure;
  const c = s1Chords[m];

  // String swell on each chord
  addStringSwell(c.pad, mTime, measure * 1.1, 0.85);

  // Bass notes
  addPianoPluck(c.root, mTime, measure * 0.8, 0.9, -0.2);
  addPianoPluck(c.root, mTime + beat * 2, measure * 0.5, 0.7, -0.2);

  // Arpeggios across the measure
  for (let s = 0; s < 8; s++) {
    const stepTime = mTime + (s * beat * 0.5);
    const note = c.arp[s % c.arp.length];
    const pan = ((s % 2 === 0 ? -1 : 1) * 0.35);
    addPianoPluck(note, stepTime, 1.4, s === 0 ? 0.95 : 0.72, pan);

    // Rhythm pulse
    if (s === 0) addSubPulse(stepTime, 0.9);
    if (s % 2 === 0 && s !== 0) addShimmer(stepTime, 0.6);
  }
}

// ==========================================
// SCENE 2: SOUTHAMPTON UK (12s - 28s)
// Microelectronics: Fmaj7 -> C -> Dm -> Bbmaj7
// ==========================================
const s2StartTime = 12.0;
const s2Chords = [
  { root: N.F2, pad: [N.F3, N.A3, N.C4, N.E4], arp: [N.C4, N.E4, N.A4, N.C5, N.E5, N.C5] },
  { root: N.C3, pad: [N.C3, N.E3, N.G3, N.C4], arp: [N.E4, N.G4, N.C5, N.E5, N.G4, N.E4] },
  { root: N.D2, pad: [N.D3, N.F3, N.A3, N.D4], arp: [N.F4, N.A4, N.D5, N.F5, N.D5, N.A4] },
  { root: N.Bb2, pad: [N.Bb3, N.D4, N.F4, N.A4], arp: [N.D4, N.F4, N.Bb4, N.D5, N.F5, N.D5] },
  { root: N.F2, pad: [N.F3, N.A3, N.C4, N.F4], arp: [N.A4, N.C5, N.F5, N.A5, N.F5, N.C5] },
  { root: N.C3, pad: [N.C4, N.E4, N.G4, N.C5], arp: [N.G4, N.C5, N.E5, N.G5, N.E5, N.C5] }
];

for (let m = 0; m < s2Chords.length; m++) {
  const mTime = s2StartTime + (m * measure);
  if (mTime >= 28.0) break;
  const c = s2Chords[m];

  addStringSwell(c.pad, mTime, measure * 1.15, 0.95);
  addPianoPluck(c.root, mTime, measure * 0.8, 0.95, -0.2);
  addPianoPluck(c.root, mTime + beat * 2, measure * 0.5, 0.75, -0.2);

  for (let s = 0; s < 8; s++) {
    const stepTime = mTime + (s * beat * 0.5);
    const note = c.arp[s % c.arp.length];
    const pan = ((s % 2 === 0 ? 0.35 : -0.35));
    addPianoPluck(note, stepTime, 1.2, s === 0 ? 1.0 : 0.78, pan);

    if (s === 0) addSubPulse(stepTime, 1.0);
    if (s % 2 === 0) addShimmer(stepTime, 0.75);
  }
}

// ==========================================
// SCENE 3: PESHAWAR UNIVERSITY DISTINCTION (28s - 43s)
// Triumphant 2nd Position: Bb -> C -> Dm -> F
// ==========================================
const s3StartTime = 28.0;
const s3Chords = [
  { root: N.Bb2, pad: [N.Bb3, N.D4, N.F4, N.A4], arp: [N.F4, N.A4, N.D5, N.F5, N.A5, N.F5] },
  { root: N.C3, pad: [N.C4, N.E4, N.G4, N.C5], arp: [N.G4, N.C5, N.E5, N.G5, N.E5, N.C5] },
  { root: N.D2, pad: [N.D3, N.F3, N.A3, N.D4], arp: [N.A4, N.D5, N.F5, N.A5, N.F5, N.D5] },
  { root: N.F2, pad: [N.F3, N.A3, N.C4, N.F4], arp: [N.C4, N.F4, N.A4, N.C5, N.F5, N.C5] },
  { root: N.Bb2, pad: [N.Bb3, N.D4, N.F4, N.Bb4], arp: [N.D4, N.F4, N.Bb4, N.D5, N.F5, N.D5] },
  { root: N.C3, pad: [N.C4, N.E4, N.G4, N.C5], arp: [N.E4, N.G4, N.C5, N.E5, N.G5, N.E5] }
];

for (let m = 0; m < s3Chords.length; m++) {
  const mTime = s3StartTime + (m * measure);
  if (mTime >= 43.0) break;
  const c = s3Chords[m];

  addStringSwell(c.pad, mTime, measure * 1.2, 1.05);
  addPianoPluck(c.root, mTime, measure * 0.8, 1.0, -0.2);

  for (let s = 0; s < 8; s++) {
    const stepTime = mTime + (s * beat * 0.5);
    const note = c.arp[s % c.arp.length];
    addPianoPluck(note, stepTime, 1.3, s === 0 ? 1.05 : 0.82, (s % 2 === 0 ? -0.3 : 0.3));

    if (s === 0) addSubPulse(stepTime, 1.05);
    if (s % 2 === 0) addShimmer(stepTime, 0.8);
  }
}

// ==========================================
// SCENE 4: NEW LEADERSHIP OPPORTUNITIES (43s - 58s)
// Executive Resolution: G -> C -> Bb -> D
// ==========================================
const s4StartTime = 43.0;
const s4Chords = [
  { root: N.G2, pad: [N.G3, N.B3, N.D4, N.G4], arp: [N.D4, N.G4, N.B3, N.D5, N.G5, N.D5] },
  { root: N.C3, pad: [N.C4, N.E4, N.G4, N.C5], arp: [N.E4, N.G4, N.C5, N.E5, N.G5, N.E5] },
  { root: N.Bb2, pad: [N.Bb3, N.D4, N.F4, N.A4], arp: [N.D4, N.F4, N.Bb4, N.D5, N.F5, N.D5] },
  { root: N.D2, pad: [N.D3, N.A3, N.D4, N.F4], arp: [N.D4, N.A4, N.D5, N.F5, N.A5, N.D5] },
  { root: N.D2, pad: [N.D3, N.F3, N.A3, N.D4], arp: [N.F4, N.A4, N.D5, N.F5, N.A5, N.D5] },
  { root: N.D2, pad: [N.D3, N.A3, N.D4, N.F4], arp: [N.D4, N.F4, N.A4, N.D5] }
];

for (let m = 0; m < s4Chords.length; m++) {
  const mTime = s4StartTime + (m * measure);
  if (mTime >= 57.5) break;
  const c = s4Chords[m];

  // Warm crescendo towards final chord
  const isFinal = m >= s4Chords.length - 2;
  addStringSwell(c.pad, mTime, isFinal ? measure * 2.0 : measure * 1.2, isFinal ? 1.15 : 1.0);
  addPianoPluck(c.root, mTime, isFinal ? measure * 1.5 : measure * 0.8, 1.05, -0.2);

  for (let s = 0; s < 8; s++) {
    const stepTime = mTime + (s * beat * 0.5);
    if (stepTime >= 57.5) break;
    const note = c.arp[s % c.arp.length];
    addPianoPluck(note, stepTime, 1.5, isFinal ? 0.9 : 0.85, (s % 2 === 0 ? 0.3 : -0.3));

    if (s === 0) addSubPulse(stepTime, isFinal ? 1.1 : 1.0);
    if (s % 2 === 0) addShimmer(stepTime, 0.85);
  }
}

// ==========================================
// STEREO CONVOLUTION / REVERB SIMULATION
// ==========================================
console.log('Applying stereo concert hall acoustics & mastering...');
const delayLeft = Math.floor(sampleRate * 0.28);
const delayRight = Math.floor(sampleRate * 0.38);
const feedback = 0.22;

for (let i = 0; i < totalSamples; i++) {
  if (i >= delayLeft) {
    leftChannel[i] += leftChannel[i - delayLeft] * feedback;
  }
  if (i >= delayRight) {
    rightChannel[i] += rightChannel[i - delayRight] * feedback;
  }
}

// Peak Normalization to -0.5 dB
let maxPeak = 0;
for (let i = 0; i < totalSamples; i++) {
  const absL = Math.abs(leftChannel[i]);
  const absR = Math.abs(rightChannel[i]);
  if (absL > maxPeak) maxPeak = absL;
  if (absR > maxPeak) maxPeak = absR;
}

const targetPeak = 0.92;
const normGain = maxPeak > 0 ? targetPeak / maxPeak : 1.0;

// Fade out over last 2 seconds
const fadeStartSample = Math.floor((durationSeconds - 2.0) * sampleRate);
const fadeLength = totalSamples - fadeStartSample;

for (let i = 0; i < totalSamples; i++) {
  let fade = 1.0;
  if (i >= fadeStartSample) {
    fade = 1.0 - ((i - fadeStartSample) / fadeLength);
  }
  leftChannel[i] = leftChannel[i] * normGain * fade;
  rightChannel[i] = rightChannel[i] * normGain * fade;
}

// ==========================================
// WRITE 16-BIT STEREO PCM WAV FILE
// ==========================================
const bytesPerSample = 2; // 16-bit
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const headerSize = 44;
const buffer = Buffer.alloc(headerSize + dataSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

// fmt chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // fmt chunk size
buffer.writeUInt16LE(1, 20); // PCM format
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // bits per sample

// data chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Write interleaved 16-bit PCM samples
let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  // Clamp between -1.0 and 1.0
  const l = Math.max(-1.0, Math.min(1.0, leftChannel[i]));
  const r = Math.max(-1.0, Math.min(1.0, rightChannel[i]));

  const intL = l < 0 ? Math.floor(l * 32768) : Math.floor(l * 32767);
  const intR = r < 0 ? Math.floor(r * 32768) : Math.floor(r * 32767);

  buffer.writeInt16LE(intL, offset);
  buffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

fs.writeFileSync(outPath, buffer);
console.log(`Successfully generated master soundtrack: ${outPath} (${(buffer.length / (1024 * 1024)).toFixed(2)} MB)`);
