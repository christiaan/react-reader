export default class SpeechSynth {
  /**
   * @param {SpeechSynthesis} synth
   */
  constructor(synth) {
    this.synth = synth;
    this.voices = new Promise((resolve, reject) => {
      let voices = this.synth.getVoices();
      if (voices.length > 0) {
        return resolve(voices);
      }

      if (this.synth.onvoiceschanged === undefined) {
        return resolve([]);
      }

      this.synth.onvoiceschanged = () => {
        resolve(this.synth.getVoices());
      };
    });
  }

  /**
   * @return {Promise<array<SpeechSynthesisVoice>>}
   */
  getVoices() {
    return this.voices;
  }

  /**
   * @param {string} text
   * @param {{ voice: SpeechSynthesisVoice, lang: string=, pitch: number=, rate: number=, volume: number= }}
   * @return {Promise<>}
   */
  speak(text, config) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = config.lang ?? config.voice.lang;
    utterance.pitch = config.pitch ?? 1;
    utterance.rate = config.rate ?? 1;
    utterance.voice = config.voice;
    utterance.volume = config.volume ?? 1;

    const promise = new Promise((resolve, reject) => {
      utterance.onend = resolve;
      utterance.onerror = reject;
    });

    if (this.synth.pending || this.synth.speaking) {
      this.synth.cancel();
    }

    this.synth.speak(utterance);

    return promise;
  }
}
