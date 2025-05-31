import GridRow from './GridRow';
import Image from '../images/grid.png';

const TTTGrid = (gridID) => {
    const GridImgStyle = {
        position: "absolute",
        zIndex: "-1",
        display: "flex",
        alignSelf: "center"
    };
    const GridStyle = {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center"
    };
    return (
        <>
            <div style={GridStyle} id={gridID}>
                <img style={GridImgStyle} src={Image} />
                <GridRow gridRowName="Row1"/>
                <GridRow gridRowName="Row2"/>
                <GridRow gridRowName="Row3"/>
            </div>
        </>
    );
}

export default TTTGrid;