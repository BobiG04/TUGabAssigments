import GridSquare from '../elements/GridSquare.jsx';

const GridRow = (gridRowName) => {
    return (
        <div id={gridRowName}>
            <GridSquare/><GridSquare/><GridSquare/>
        </div>
    );
};

export default GridRow;