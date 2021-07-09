// Creates analyser & has methods to get data, bass, beats etc... ideally
// TODO switch source method
class Analyser {
  
  // set id to null & if it's set on instigation run soundcloud not local
  constructor(dataSize = 512, trackID = null) {
    this.audio_ctx = new AudioContext();

    this.useMic = false;
    this.track_id = trackID;
    if (this.track_id === null) {
      this.useMic = true
    } else {
      this.track = this._createTrack();
    }
    
    this.dataSize = dataSize;
    this.data = new Uint8Array(this.dataSize);
    this.frequencies = [];
    
    this.analyser_node = this._createAnalyserNode();

    this.source = this._getSource();

  }

  getFrequencies() {
		return this.data.slice(0, this.dataSize/3);
	}
  
  // TODO add if mic or if music
  _getSource() {
    // pipe in analysing to getUserMedia
    if (this.useMic) {
      return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => this.audio_ctx.createMediaStreamSource(stream))
        .then(source => {
          source.connect(this.analyser_node);
          return source;
        });
    } else {
      
      return new Promise((resolve, reject) => {
        resolve(this.audio_ctx.createMediaElementSource(this.track));
      }).then(source => {
          source.connect(this.analyser_node).connect(this.audio_ctx.destination);
          return source;
      });
      
    } 
    
  }
  
  // create an analyser node
  _createAnalyserNode() {
    return new AnalyserNode(this.audio_ctx, {
      fftSize: this.dataSize*2,
      maxDecibels: -25,
      minDecibels: -60,
      smoothingTimeConstant: 0.5,
    })
  }
  
  getData() {
    this.analyser_node.getByteFrequencyData(this.data);
  }

  _createTrack() {
    this.audio = new Audio(this.source);
    this.audio.crossOrigin = "anonymous";
    // track id is null use local track
    if (this.track_id === '/beast.mp3') {
      this.audio.src = '/beast.mp3';
    } else { // use sound cloud
      this.client_id = 'z8LRYFPM4UK5MMLaBe9vixfph5kqNA25';
      this.audio.src = `https://api.soundcloud.com/tracks/${this.track_id}/stream?client_id=${this.client_id}`;
    }
    return this.audio;
  }
  
  run() {
		// check if context is in suspended state (autoplay policy)
		if (this.audio_ctx.state === 'suspended') {
			this.audio_ctx.resume();
		}
    if (!this.useMic) {
      this.track.play()
    }
    this.source.then(this.getData());
  }
  
  disconnect() {
    if (!this.useMic) {
      this.track.pause();
    }
    this.analyser_node.disconnect();
  }
}

export default Analyser;