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
    this.setState({
      largeText: nextState
    });
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
    const { location, localFile, localName, largeText } = this.state;

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
            fontSize={largeText ? "140%" : "100%"}
            locationChanged={this.onLocationChanged}
            wordSelected={this.wordSelected}
          />
        </ReaderContainer>
      </Container>
    );
  }
}

export default App;
