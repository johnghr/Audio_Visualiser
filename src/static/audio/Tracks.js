import React from 'react';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer.jsx'
import song_2 from './song_2.mp3'
import song_3 from './song_3.mp3'
import song_4 from './song_4.mp3'
import song_5 from './song_5.mp3'
import song_6 from './song_6.mp3'
import song_7 from './song_7.mp3'
import song_8 from './song_8.mp3'

const Tracks = ({ toggleTrack }) => {

    const tracks = [
        {
          title: 'song_2',
          audioSrc: song_2
        },
        {
            title: 'song_3',
            audioSrc: song_3
        },
        {
            title: 'song_4',
            audioSrc: song_4
        },
        {
            title: 'song_5',
            audioSrc: song_5
        },
        {
            title: 'song_6',
            audioSrc: song_6
        },
        {
            title: 'song_7',
            audioSrc: song_7
        },
        {
            title: 'song_8',
            audioSrc: song_8
        },

    ]

    return(
        <AudioPlayer toggleTrack={toggleTrack} tracks={tracks}></AudioPlayer>
    )

}

export default Tracks;