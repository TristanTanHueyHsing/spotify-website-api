import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

if(!accessToken) return null
  return (<SpotifyPlayer
  token={accessToken}
  showSaveIcon
  callback={state => {
    if(!state.isPlaying) setPlay(false)
  }}
  play={play}
  uris={trackUri ? [trackUri] : []}
  styles={{
    bgColor: 'lightgrey', // Background color
    color: 'black', // Text color
    sliderColor: '#1cb954', // Slider color
    trackArtistColor: 'black', // Track artist color
    trackNameColor: 'black', // Track name color
}}
  />
  )
}
