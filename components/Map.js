import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});
    //Transform the search results into a latitude logitude object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    //Center of all the locations
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/neetphyboots/cks4e3cqt7krx17o5bokh3rnl'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p role="img"
                            onClick={() => setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce'
                            aria-label='push-pin'
                        >📌</p>

                    </Marker>
                    {/* Popup onClick of a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            longitude={result.long}
                            latitude={result.lat}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
