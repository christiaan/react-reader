import React, { Component } from "react";
import FileReaderInput from "react-file-reader-input";
import { ReactReader } from "./modules";
import {
  Container,
  ReaderContainer,
  FontSizeButton,
  GlobalStyle
} from "./Components";
import SpeechSynth from "./SpeechSynth";

const synth = new SpeechSynth(global.speechSynthesis);
const storage = global.localStorage || null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:
        storage && storage.getItem("epub-location")
          ? storage.getItem("epub-location")
          : 0,
      localFile: props.localFile,
      localName: props.localName,
      largeText: false
    };
    this.rendition = null;
  }

  onLocationChanged = location => {
    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem("epub-location", this.state.location);
      }
    );
  };

  wordSelected = event => {
    synth.getVoices().then(voices => {
      synth.speak(event.word, {
        voice: voices.find(voice => voice.lang.replace("_", "-") === "nl-NL")
      });
    });
  };

  onToggleFontSize = () => {
    const nextState = !this.state.largeText;
    this.setState(
      {
        largeText: nextState
      },
      () => {
        this.rendition.themes.fontSize(this.state.largeText ? "140%" : "100%");
      }
    );
  };

  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    const { largeText } = this.state;
    this.rendition = rendition;
    rendition.themes.fontSize(largeText ? "140%" : "100%");
  };

  handleChangeFile = (event, results) => {
    if (results.length > 0) {
      const [e, file] = results[0];
      if (file.type !== "application/epub+zip") {
        return alert("Unsupported type");
      }
      this.setState({
        localFile: e.target.result,
        localName: file.name,
        location: null
      });
    }
  };

  render() {
    const { location, localFile, localName } = this.state;

    if (!localFile) {
      return <div>No epub selected</div>;
    }

    return (
      <Container>
        <GlobalStyle />
        <ReaderContainer>
          <ReactReader
            url={localFile}
            title={localName}
            location={location}
            locationChanged={this.onLocationChanged}
            getRendition={this.getRendition}
            wordSelected={this.wordSelected}
          />
        </ReaderContainer>
      </Container>
    );
  }
}

export default App;
