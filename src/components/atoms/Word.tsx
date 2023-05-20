import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import styled from "styled-components";
import {RiPlayFill, RiPauseMiniFill} from 'react-icons/ri'
import {useRef, useState} from "react";
import {searchFormatter} from "../../helpers/helpers.ts";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`

const WordInfo = styled.span`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;



  & h1 {
    margin: 0;
    font-size: 46px;
    text-transform: capitalize;
  }

  & h4 {
    margin: 0;
    font-weight: 400;
    color: var(--purple);
  }


  @media (max-width: 768px) {
    width: 100%;
    
    & h1 {
      width: 250px;
      font-size: 36px;
      flex-wrap: wrap;
    }
  }
`

const PlayButton = styled.button`
  padding: 15px 15px 10px;

  background-color: var(--light-purple);
  color: var(--purple);
  font-size: 30px;

  border: none;
  border-radius: 50%;

  cursor: pointer;
`

const DisabledPlayBtn = styled.div`
  user-select: none;
  border: none;
  font-size: 30px;
  border-radius: 50%;
  background-color: var(--light-gray);
  padding: 15px 15px 10px;

  color: var(--dark-gray);
`

function Word() {
    const [isPlay, setIsPlay] = useState<boolean>(false)
    const {words, error} = useSelector((state: RootState) => state.words);
    //Audio Controls
    const audioRef = useRef<HTMLAudioElement>(null);

    const audiourl = (audioName: string): string => `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioName[0]}/${audioName}.mp3`

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlay(true)
        }
    };
    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlay(false)
        }
    };
    const handleAudioEnded = () => {
        setIsPlay(false);
    };


    return (
        <>
            {words.length
                ? <Wrapper>
                    <WordInfo>
                        <h1>{
                            searchFormatter(words[0])
                        }</h1>
                        <h4>{words[0].hwi.prs && <>/{words[0].hwi.prs[0].mw}/</>}</h4>
                    </WordInfo>
                    <div>
                        {words[0].hwi.prs
                            ?
                            <>
                                {words[0].hwi.prs.map((m) => {
                                    if(m.sound) {
                                        return(
                                        <audio ref={audioRef} src={audiourl(m.sound.audio)}
                                               onEnded={handleAudioEnded}
                                               key={m.sound.audio}
                                        ></audio>
                                        )
                                    }
                                }) }

                                <PlayButton onClick={!isPlay ? playAudio : pauseAudio}>
                                    {!isPlay
                                        ?
                                        <RiPlayFill/>
                                        :
                                        <RiPauseMiniFill/>}
                                </PlayButton>
                            </>
                            :
                            <DisabledPlayBtn>
                            <RiPlayFill/>
                            </DisabledPlayBtn>
                        }

                    </div>
                </Wrapper>
                : <>{error}</>
            }

        </>
    )
}

export default Word;