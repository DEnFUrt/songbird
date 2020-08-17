import React, {useRef} from 'react';
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';

import './player.scss';

const Player = ({src, roundEnded}) => {
  
  const refContainer = useRef();
  
  if ( roundEnded ) {
    refContainer.current.audio.current.pause();
  }

  return (
    <AudioPlayer 
      ref={refContainer}
      showSkipControls={false}
      showJumpControls={false}
      autoPlayAfterSrcChange={false}
      customControlsSection={
        [
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
          RHAP_UI.ADDITIONAL_CONTROLS,
        ]
      }
      customProgressBarSection={
        [
          RHAP_UI.PROGRESS_BAR,
        ]
      }
      customAdditionalControls={[]}
      layout="horizontal-reverse"
      src={src}
    />
  )  
};

export default Player;