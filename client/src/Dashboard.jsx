import React from 'react'
import { useState, useEffect } from 'react'
import Auth from './Auth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchresult from './TrackSearchresult'
import Player from './Player'
import axios from 'axios'
import { db } from './firebase'; // Import Firestore

const spotifyApi = new SpotifyWebApi({
    clientId: '2e2584ec2e6a42818f61316a505704cc',
})

export default function Dashboard({ code }) {
    const accessToken = Auth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState(null)
    const [lyrics, setLyrics] = useState('')
    const [loading, setLoading] = useState(false)

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if (!playingTrack) return
            axios
                .get("https://main--dynamic-croissant-9a5334.netlify.app/lyrics", {
                    params: {
                        track: playingTrack.title,
                        artist: playingTrack.artist,
                    },
                })
                .then(res => {
                    setLyrics(res.data.lyrics);
                    saveTrackToFirestore(playingTrack, res.data.lyrics);
                })
                .catch(err => {
                    console.error('Error fetching lyrics:', err);
                  });
    }, [playingTrack]); // Only fetch lyrics when playingTrack changes and is not null

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) {
            setSearchResults([])
            return
        }
        if (!accessToken) return

        let cancel = false
        setLoading(true)

        const debounceSearch = setTimeout(() => {
            spotifyApi.searchTracks(search).then(res => {
                if (cancel) return
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
                setLoading(false)
            }).catch(err => {
                console.error('Error searching tracks:', err)
                setLoading(false)
            })
        }, 300) // Adjust debounce delay as needed (300ms as per the video)

        return () => {
            cancel = true
            setLoading(false)
            clearTimeout(debounceSearch)
        }
    }, [search, accessToken])

    const saveTrackToFirestore = async (track, lyrics) => {
        try {
            await db.collection('tracks').add({
                artist: track.artist,
                title: track.title,
                uri: track.uri,
                albumUrl: track.albumUrl,
                lyrics: lyrics
            })
            console.log('Track saved to Firestore')
        } catch (error) {
            console.error('Error saving track to Firestore:', error)
        }
    }

    return (
        <Container className='d-flex flex-column py-2' style={{ height: '100vh' }}>
            <Form.Control
                type="search"
                placeholder="Search Song/Artists"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
                {searchResults.map(track => (
                    <TrackSearchresult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
                {searchResults.length === 0 && (
                    <div className='text-center' style={{ whiteSpace: 'pre' }}>
                        {loading ? 'Loading...' : lyrics}
                    </div>
                )}
            </div>
            <div>
            <Player accessToken={accessToken} trackUri={playingTrack ? playingTrack.uri : null}/>
            </div>
        </Container>
    )
}