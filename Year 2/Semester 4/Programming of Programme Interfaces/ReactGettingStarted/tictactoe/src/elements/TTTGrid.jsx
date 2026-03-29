import Image from '../images/grid.png';
import GridSquare from './GridSquare';

const TTTGrid = (gridID) => {
    const GridImgStyle = {
        position: "absolute",
        zIndex: "-1",
        display: "flex",
        justifyContent: "center",
        width: "99%",
        marginTop: "36px"
    };
    const GridStyle = {
        textAlign: "center",
        display: "block",
        flexDirection: "column",
        flexWrap: "wrap"
    };
    return (
        <>
            <div style={GridStyle} id={gridID}>
                <div style={GridImgStyle}>
                    <img src={Image} />
                </div>
                <GridSquare/>
            </div>
        </>
    );
}

export default TTTGrid;