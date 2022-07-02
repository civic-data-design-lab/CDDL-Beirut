import React, {useRef} from 'react';
import mapboxGl from "mapbox-gl";
import mapboxGL from "mapbox-gl/dist/mapbox-gl-unminified";
import Dialogue from "../contribution/general/Dialogue";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;




export default class App extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            activeLayer: null,
            showMapCard: this.props.showMapCard,
            width: window.innerWidth,
            height: window.innerHeight,
            coord: this.props.coords,
            geoLocateDialog : null,
            geoLocateTitle : null,
            geoLocateLoader : false,
            readZoom: this.props.mapZoom,
            markerRadius: this.getMarkerRadius()
            //mapZoom: this.props.mapZoom

        }

        this.mapContainer = React.createRef();
        this.mappedMarkers = [];
        this.colorMap = {
            "architectural": '#91B0D1',
            "cuisine": '#DFBA96',
            "decorative": '#88A384' ,
            "fashion": "#DEC2B4",
            "functional": "#72A1AB",
            "furniture": "#9F8278",
            "textiles": "#EACC74",
            "none": "#c9bba6"
        }
        this.clickMarker = this.clickMarker.bind(this)

    }

    getMarkerRadius = (currentZoom) => {
        let markerRadius
            if (currentZoom<12.5) {
                markerRadius = 2
            } else if (currentZoom<13) {
                markerRadius = 4
            } else if (currentZoom<13.5) {
                markerRadius = 5
            } else if (currentZoom<13.75) {
                markerRadius = 6
            }
            else if (currentZoom<14) {
                markerRadius = 7
            } else {
                markerRadius = 7.5;
            }
            return markerRadius
    }


    handleResize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })


        console.log("width is now ", window.innerWidth)

        if (window.innerWidth > 991) {
            this.props.setMapZoom(13.5)
        } else if (window.innerWidth>688) {
            this.props.setMapZoom(12.5)
        } else {
            this.props.setMapZoom(11.5)
        }


    }


    handleClickZoomIn = () => {
        map.current.zoomIn({duration: 1000});
    }

    handleClickZoomOut = () => {
        map.current.zoomOut({duration: 1000});
    }

    handleGeolocate = () => {
        const success = (position) => {
            this.setState({
                geoLocateDialog:null,
                geoLocateTitle: null,
                geoLocateLoader:false
            });
            map.current.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 20
            })
        }

        const error = () => {
        this.setState({
            geoLocateTitle: 'We couldn\'t find you!',
            geoLocateDialog:'There was an error. Please make sure location services and access are enabled in your system\'s and browser\'s settings.',
            geoLocateLoader:false
        });
        }

        if(!navigator.geolocation) {
        this.setState({
            geoLocateTitle: 'Geolocation is not supported!',
            geoLocateDialog:'Please make sure location services and access are enabled in your system\'s and browser\'s settings.',
            geoLocateLoader:false});
      } else {
        this.setState({
            geoLocateTitle: 'Geolocation in process',
            geoLocateDialog:'Loading...',
            geoLocateLoader:true
        });
        console.log('state ', this.state.geoLocateDialog)
        navigator.geolocation.getCurrentPosition(success, error);

      }
    }




    clickMarker (e) {
        let el = e.target;
        this.props.openMapCard(el.id, el.type);
    }

    hoverMarker(e) {
        let el = e.target;
        // console.log(el.craft)
        el.classList.add('hoverMarker');
        el.classList.add(`hoverMarker--${el.craft.toLowerCase()}`);

        //console.log(`hoverMarker--${el.craft}`)
    }

    leaveMarker(e) {
        let el = e.target;
        el.classList.remove('hoverMarker');
        el.classList.remove(`hoverMarker--${el.craft.toLowerCase()}`);

        //console.log('exit')
    }


    componentDidMount() {

        window.addEventListener('resize', this.handleResize);
        //window.addEventListener("orientationchange", this.handleResize);

        //console.log('map.js ', this.props.filterSearchData)


        mapboxGl.accessToken = ACCESS_TOKEN;

        console.log("printing plgin status ", mapboxGl.getRTLTextPluginStatus())


        if (mapboxGL.getRTLTextPluginStatus() !== 'loaded' && mapboxGL.getRTLTextPluginStatus() !== 'deferred') {
            console.log('here')
            if (mapboxGl.getRTLTextPluginStatus() === 'unavailable'){
                console.log('here again')
                mapboxGl.setRTLTextPlugin(
                'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
                null,
                true // Lazy load the plugin
            );
            }
        }



        console.log("printing plgin status ", mapboxGl.getRTLTextPluginStatus())







        map.current = new mapboxGl.Map({
           container: this.mapContainer.current,
           style: 'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit', // style URL
           center: this.props.coords, // [35.510, 33.893894], // starting position [lng, lat]
           zoom: this.props.mapZoom //13.25, // starting zoom

           //maxBounds: [[35.383297650238326, 33.83527318407196], [35.629842811007315, 33.928357422091395]]
       });



        // add all potential layers as a source

        map.current.on('load', () => {

            for (const [key, value] of Object.entries(this.props.allLayers)) {
                const checkSourceAdded = map.current.getSource(`${value[0]}`);
                if (!checkSourceAdded) {
                    map.current.addSource(value[0], {
                        'type': 'raster',
                        'url': `mapbox://mitcivicdata.${value[2]}`
                    });
                }
                map.current.addLayer({
                    'id': value[0],
                    'source': value[0],
                    'type': 'raster',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint':{
                        'raster-opacity': 0.7
                    }
                });
            }

        map.current.getStyle().layers.forEach((layer) => {
            if (layer.layout && layer.layout['text-field']) {
                map.current.setLayoutProperty(layer.id, 'text-field', [
                    'get',
                    `name_${this.props.i18n.language}`
                ]);
            }
        });

        });

        map.current.on('zoom', () => {
            const currentZoom = map.current.getZoom();
            console.log('current zoom ', currentZoom);
            const markerRadius = this.getMarkerRadius(currentZoom)

            this.setState({
                readZoom: currentZoom,
                markerRadius: markerRadius
            })

        });




       if (!this.props.workshops) {
            return;}

       for (const workshop of this.props.workshops) {
            // console.log(workshop)
            if (workshop.ID === "7445078809") {
                console.log(workshop)
            }
            const el = document.createElement('div');

            if (workshop.craft_discipline_category.length >1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius*2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius*2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (workshop.craft_discipline_category.length<1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = workshop.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }


            el.className = 'marker';
            el.style.width = `${this.state.markerRadius*2}px`;
            el.style.height = `${this.state.markerRadius*2}px`;
            el.style.borderRadius = '50%';
            el.id = workshop.ID;
            el.craft = workshop.craft_discipline_category[0] || 'none';
            el.onclick = this.clickMarker;
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = 'workshop';

            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                return;
            }

            const {lng, lat} = workshop.location.geo;
            if (lat && lng && workshop.images.length>0) {
                el.lng = lng;
                el.lat = lat;
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker);
            }
        }

       for (const archive of this.props.archives) {
           // console.log(archive)

           if (archive.ID === "8788699349") {
               console.log(archive)
           }
            const el = document.createElement('div');
            const craft = archive.craft_discipline_category[0];

            if (archive.craft_discipline_category.length > 1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius*2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `7.5px`;
                secondCraft.style.height = '15px';
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (archive.craft_discipline_category.length<1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = archive.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }



            el.className = 'marker';
            el.style.width = `${this.state.markerRadius*2}px`;
            el.style.height = `${this.state.markerRadius*2}px`;
            // el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = archive.ID;
            el.craft = archive.craft_discipline_category[0] || "none";
            el.onClick=()=>this.clickMarker(el);
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = 'archive'

            if (archive.ID === "A397612231") {
                console.warn(`${archive.ID} is ignored`);
                return;
            }
            if (!archive.primary_location['geo']) {
                console.warn(`${archive.ID} has no geo location`);
                return;
            }

            const {lng, lat} = archive.primary_location['geo'];
            if (lat && lng && archive.images.length>0) {
                el.lng = lng;
                el.lat = lat;
                let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                this.mappedMarkers.push(marker)
            }
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       //  console.log("print language in map ", this.props.i18n.language)
       //  console.log("detected map layer ", this.props.mapLayer)
       //  console.log("state ", this.props.mapZoom, prevProps.mapZoom);
       //  console.log("state ", this.props.coords, prevProps.coords);
        // console.log("props ", this.props.mapZoom, prevProps.mapZoom);
        // console.log('is mapcard showing or not ', this.props.showMapCard)
        // console.log('compare zooms ', this.props.mapZoom, prevProps.mapZoom)
        if (this.props.mapZoom !== prevProps.mapZoom ) {
            // console.log('is zoom the same')
            if (this.props.showMapCard===false) {
                console.log('zoom')
                map.current.flyTo({
                    center: [35.510, 33.893894],
                    zoom: this.props.mapZoom,
                    speed: 0.5, // make the flying slow
                    essential: true
                })
            }
        }

        // console.log("zoom diff ", prevState.readZoom, this.state.readZoom)

        if (prevState.readZoom !== this.state.readZoom){
            console.log("changed zoom")
        }

        map.current.getStyle().layers.forEach((layer) => {
            if (layer.layout && layer.layout['text-field']) {
                map.current.setLayoutProperty(layer.id, 'text-field', [
                    'get',
                    `name_${this.props.i18n.language}`
                ]);
            }
        });






        if (this.props.coords && (prevProps.coords !== this.props.coords)) {
            if (this.props.coords[0] !== 35.510 && this.props.coords[1] !== 33.893894) {
                map.current.flyTo({
                    center: this.props.coords,
                    zoom: 16,
                    offset: (687<this.state.width && this.state.width<992)?[0, this.state.height*0.30]:[0,0],
                    bearing: 0,
                    speed: 0.5, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
                    essential: true
                })
            } else if (this.props.coords[0] === 35.510 && this.props.coords[1] === 33.893894) {
                map.current.flyTo({
                    center: this.props.coords,
                    zoom: 13.25,
                    bearing: 0,
                    speed: 0.5, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
                    essential: true
                })
            }
        }




         // change visibility of layer
        if (this.props.mapLayer) {
            if (this.state.activeLayer) {
                map.current.setLayoutProperty(this.state.activeLayer, 'visibility', 'none');
                map.current.setLayoutProperty(this.props.mapLayer, 'visibility', 'visible');
                this.setState({activeLayer:this.props.mapLayer})
            } else {
                // console.log('hi')
                map.current.setLayoutProperty(this.props.mapLayer, 'visibility', 'visible');
                this.setState({activeLayer:this.props.mapLayer})}
        } else if (this.state.activeLayer) {
                map.current.setLayoutProperty(this.state.activeLayer, 'visibility', 'none');
                this.setState({activeLayer:this.state.activeLayer})
        }


         // load workshop markers
        //console.log(this.props);
        if (!this.props.workshops) {
            return;}

        if (this.mappedMarkers) {
            this.mappedMarkers.forEach((marker) => marker.remove());
        }


        for (const workshop of this.props.workshops) {
            const el = document.createElement('div');

            if (workshop.ID === "7445078809") {
                console.log("update ", workshop);
            }

            if (workshop.craft_discipline_category.length >1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius*2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[workshop.craft_discipline_category[1].toLowerCase()]}`;
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius*2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (workshop.craft_discipline_category.length<1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = workshop.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }

            el.className = 'marker';
            el.style.width = `${this.state.markerRadius*2}px`;
            el.style.height = `${this.state.markerRadius*2}px`;
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = workshop.ID;
            el.craft = workshop.craft_discipline_category[0] || 'none';
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type = 'workshop';


            if (!workshop.location.geo) {
                console.warn(`${workshop.ID} has no geo location`);
                continue;
            }



            const craftType = workshop.craft_discipline_category;
            const {lng, lat} = workshop.location.geo;
            const indices = craftType.map((craft)=>{return this.props.filterSearchData['filteredCraftsParent'].indexOf(craft)});
            const start = this.props.filterSearchData['startYearParent'];
            const end = this.props.filterSearchData['endYearParent'];
            let withinInterval = null;

            if (workshop.year_established == null) {
                if (start <= 2010 && end >= 2010 ) {
                    withinInterval = true;
                } else {
                    withinInterval = false;
                }
            } else {
                if (start <= workshop.year_established && workshop.year_established <= end) {
                    withinInterval = true;
                } else {
                    withinInterval = false;
                }
            }

            const noCrafts = (((!workshop.craft_discipline_category || workshop.craft_discipline_category.length<1) && (this.props.filterSearchData['filteredCraftsParent'] && this.props.filterSearchData['filteredCraftsParent'].length<1)) || (this.props.filterSearchData['filteredCraftsParent'] && this.props.filterSearchData['filteredCraftsParent'].length===7))

            if (lat && lng && (indices[0]>-1 || (indices.length>1 && indices[1]>-1) || noCrafts) && withinInterval) {
                if (this.props.filterSearchData['toggleStatusParent'] && workshop.shop_status!=="open") {
                    if (workshop.ID==="7445078809"){
                        console.log('1')
                    }
                    continue;
                }

                let lookup = this.props.filterSearchData['search']
                let shopName = workshop.shop_name['content']
                let shopOrig = workshop.shop_name['content_orig']


                if (workshop.images.length>0 && (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())))) {


                    el.lng = lng;
                    el.lat = lat;
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);
                    //console.log(shopName, shopOrig)
                }

            }

        }

        for (const archive of this.props.archives) {
            const craft = archive.craft_discipline_category[0];
            const el = document.createElement('div');

            if (archive.craft_discipline_category.length >1) {
                el.style.display = 'flex'
                el.style.flexDirection = 'row'
                el.style.justifyItems = 'center'
                el.style.columnGap = '0px';
                el.style.overflow = "hidden";
                const firstCraft = document.createElement('div');
                firstCraft.style.pointerEvents = 'none';
                const secondCraft = document.createElement('div');
                secondCraft.style.pointerEvents = 'none';
                firstCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[0].toLowerCase()]}`;
                firstCraft.style.width = `${this.state.markerRadius}px`;
                firstCraft.style.height = `${this.state.markerRadius*2}px`;
                secondCraft.style.backgroundColor = `${this.colorMap[archive.craft_discipline_category[1].toLowerCase()]}`
                secondCraft.style.width = `${this.state.markerRadius}px`;
                secondCraft.style.height = `${this.state.markerRadius*2}px`;
                el.appendChild(firstCraft);
                el.appendChild(secondCraft);
            } else {
                if (archive.craft_discipline_category.length<1) {
                    el.style.backgroundColor = this.colorMap['none'];
                } else {
                    const craft = archive.craft_discipline_category[0];
                    el.style.backgroundColor = this.colorMap[craft.toLowerCase()];
                }

            }

            el.className = 'marker';
            el.style.width = `${this.state.markerRadius*2}px`;
            el.style.height = `${this.state.markerRadius*2}px`;
            el.style.borderRadius = '50%';
            el.onclick = this.clickMarker;
            el.id = archive.ID;
            el.craft = archive.craft_discipline_category[0] || 'none';
            el.onmouseenter = this.hoverMarker;
            el.onmouseleave = this.leaveMarker;
            el.type="archive";


            if (archive.ID === "A397612231") {
                console.warn(`${archive.ID} is ignored`);
                return;
            }
            if (!archive.primary_location['geo']) {
                console.warn(`${archive.ID} has no geo location`);
                return;
            }

            const craftType = archive.craft_discipline_category;
            const {lng, lat} = archive.primary_location["geo"];
            const indices = craftType.map((craft)=>{return this.props.filterSearchData['filteredCraftsParent'].indexOf(craft)});
            const start = this.props.filterSearchData['startYearParent'];
            const end = this.props.filterSearchData['endYearParent'];
            let withinInterval = null;

            if (archive.primary_year) {
                if (start<=archive.primary_year && archive.primary_year<=end) {
                    withinInterval = true;
                }
            } else if (archive.primary_decade) {
                if (start<=archive.primary_decade[0] && archive.primary_decade[0]<=end) {
                    withinInterval=true
                }
            } else {
                withinInterval=false
            }



            const noCrafts = (((!archive.craft_discipline_category || archive.craft_discipline_category.length<1) && (this.props.filterSearchData['filteredCraftsParent'] && this.props.filterSearchData['filteredCraftsParent'].length<1)) || (this.props.filterSearchData['filteredCraftsParent'] && this.props.filterSearchData['filteredCraftsParent'].length===7))
            if (lng && lat && (indices[0]>-1 || (indices.length>1 && indices[1]>-1) || noCrafts) && withinInterval) {
                if (this.props.filterSearchData['toggleStatusParent']) {
                    continue;
                }

                let lookup = this.props.filterSearchData['search']
                let shopName = archive.shop_name['content']
                let shopOrig = archive.shop_name['content_orig']



                if (archive.images.length>0 && (lookup === "" || (shopName && (shopName.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())) || (shopOrig && (shopOrig.slice(0, lookup.length).toUpperCase() === lookup.toUpperCase())))) {
                    el.lng = lng;
                    el.lat = lat;
                    let marker = new mapboxGl.Marker(el).setLngLat([lng, lat]).addTo(map.current);
                    this.mappedMarkers.push(marker);

                }

            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render() {

        return (
            <>
                {this.state.geoLocateDialog ? <Dialogue
                    title={this.state.geoLocateTitle}
                    content={this.state.geoLocateDialog}
                    accept={false}
                    cancel={false}
                    cardCover={false}
                    loader={this.state.geoLocateLoader}
                    handleClose={()=>{this.setState({
                        geoLocateDialog:null,
                        geoLocateTitle:null,
                        geoLocateLoader:false
                    })}}/> : null}
            <div ref={this.mapContainer} id="map" className={'exploreMap'}/>
                {this.state.width>688 ?
                    <div className={"nav-ctr-container"}>
                        <button className={"nav-ctr-btn zoom-in-btn"} onClick={this.handleClickZoomIn}>
                            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.86719 3.76562V5.46094H0.0703125V3.76562H7.86719ZM4.88281 0.578125V8.85938H3.0625V0.578125H4.88281Z" fill="#471E10"/>
                            </svg>

                        </button>
                        <button className={"nav-ctr-btn zoom-out-btn"} onClick={this.handleClickZoomOut}>
                            <svg width="6" height="2" viewBox="0 0 6 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.03906 0.390625V1.89062H0.90625V0.390625H5.03906Z" fill="#471E10"/>
                            </svg>
                        </button>

                        <button className={"nav-ctr-btn geolocate-btn"} onClick={this.handleGeolocate}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.94 11C20.48 6.83 17.17 3.52 13 3.06V1H11V3.06C6.83 3.52 3.52 6.83 3.06 11H1V13H3.06C3.52 17.17 6.83 20.48 11 20.94V23H13V20.94C17.17 20.48 20.48 17.17 20.94 13H23V11H20.94ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5C8.13 5 5 8.13 5 12Z" fill="#AEAEAE"/>
                            </svg>

                        </button>

                    </div> : null}
            </>



        );
    }

}
