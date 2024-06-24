import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ListGroup } from 'react-bootstrap';

export default function SavedTracks() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const snapshot = await db.collection('tracks').get();
                const tracksData = snapshot.docs.map(doc => doc.data());
                setTracks(tracksData);
            } catch (error) {
                console.error('Error fetching tracks from Firestore: ', error);
            }
        };

        fetchTracks();
    }, []);

    return (
        <ListGroup>
            {tracks.map((track, index) => (
                <ListGroup.Item key={index}>
                    <div>
                        <img src={track.albumUrl} alt="Album Art" style={{ height: '64px', width: '64px' }} />
                        <div>{track.title}</div>
                        <div>{track.artist}</div>
                        <div>{track.lyrics}</div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
