import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';

export default function TrackSearchresult({ track,chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    
  return (
    <Card className="m-2">
      <Card.Body className="d-flex align-items-center" style={{cursor: 'pointer'}} onClick={handlePlay}>
        <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
        <div style={{ marginLeft: '10px' }}>
          <div>{track.title}</div>
          <div style={{ color: '#8b9399' }}>{track.artist}</div> {/* Using color for muted effect */}
        </div>
      </Card.Body>
    </Card>
  )
}
