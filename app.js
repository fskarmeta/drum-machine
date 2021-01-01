const sounds = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    file: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const DrumMachine = () => {
  const [id, setId] = React.useState("Sound Display");

  function getSongId(songId) {
    setId(songId);
  }

  return (
    <section id="drum-machine">
      <div id="display">
        <h1 id="display-text">{id}</h1>
      </div>
      <div id="pads">
        {sounds.map((sound) => (
          <DrumBtn key={sound.id} sound={sound} getSongId={getSongId} />
        ))}
      </div>
    </section>
  );
};

const DrumBtn = ({ sound, getSongId }) => {
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  });

  const keyPress = (e) => {
    if (e.keyCode === sound.keyCode) {
      playSound();
      getSongId(sound.id);
    }
  };

  const playSound = (songId) => {
    getSongId(songId);
    const tag = document.getElementById(sound.key);
    setOn(true);
    setTimeout(() => setOn(false), 100);
    tag.currentTime = 0;
    tag.play();
  };

  return (
    <div
      onClick={() => playSound(sound.id)}
      className={`drum-pad ${on && "on"}`}
      id={sound.id}
    >
      <span className="pad-text">{sound.key}</span>
      <audio className="clip" id={sound.key} src={sound.file} />
    </div>
  );
};
