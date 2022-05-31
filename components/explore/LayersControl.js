import React from "react";

export default class LayersControl extends React.Component {

    constructor(props) {
        super(props);
        this.clickLayerButton = this.clickLayerButton.bind(this)



    }

    clickLayerButton (e) {
        let layerName = e.target.id;
        this.props.updateMapLayer(layerName)
    }

    getMapLayerButtons = () => {
        let buttons = this.props.allLayers.map((layerName) => {
            return (<>
                <div key={layerName} className={'lc-section'}>
                <button key = {layerName} id={layerName} onClick={this.clickLayerButton}>
                    {layerName}
                </button>
            </div>
            <hr/>
                </> )
        })
        return buttons
    }

    onReset = () => {
        this.props.updateMapLayer(null)

    }





    render () {
        return (
            <>
            <div className={'layersControl-container'}>
                <div className={'searchby-section lc-section'}>
                        <p>Historical Maps</p>
                        <button className={'close-filter-btn'} onClick={this.props.closeLayersControl}>X</button>
                </div>
                <hr/>
                {this.getMapLayerButtons()}

                <div className={'reset-section lc-section'}>
                        <button className={'reset-btn'} onClick = {this.onReset}> Reset Maps </button>
                </div>

            </div>
            <div className={'arrow-down'} style={{left:'9.5%'}}/>

            </>
        )
    }
}