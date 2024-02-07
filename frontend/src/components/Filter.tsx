// Filter.tsx
import React from "react";
import { Offcanvas } from "react-bootstrap";
import { currencyFormat } from "../services/currencyFormater";

interface FilterProps {
    show: boolean;
    setShow: Function;
    setSearchQuery: Function;
    setSelectedTitles: React.Dispatch<React.SetStateAction<string[]>>;
    selectedTitles: string[];
    // setSelectedOrigins: React.Dispatch<React.SetStateAction<string[]>>;
    // selectedOrigins: string[];
    // setSelectedAlcohol: React.Dispatch<React.SetStateAction<string[]>>;
    // selectedAlcohol: string[];
    setSelectedPrice: React.Dispatch<React.SetStateAction<number[]>>;
    selectedPrice: number[];
    titleOptions: string[];
    // originOptions: string[];
    // alcoholOptions: string[];
    priceOptions: number[];
    handleClose: Function;
    setPriceOptions: Function;
    handleRangeChange: Function;
}

const Filter: React.FC<FilterProps> = ({
    show,
    setShow,
    setSearchQuery,
    setSelectedTitles,
    selectedTitles,
    // setSelectedOrigins,
    // selectedOrigins,
    // setSelectedAlcohol,
    // selectedAlcohol,
    setSelectedPrice,
    selectedPrice,
    titleOptions,
    // originOptions,
    // alcoholOptions,
    priceOptions,
    handleClose,
    setPriceOptions,
    handleRangeChange
}) => {
    const handleFilterApply = () => {
        // Perform actions when the filter is applied
        setShow(false);
    };

    const handleFilterReset = () => {
        // Reset all filter options
        setSearchQuery("");
        setSelectedTitles([]);

        setSelectedPrice([]);
    };

    // let handleRangeChange = (index: number, newValue: number) => {
    //     setPriceOptions((prevValues: any) => {
    //         let newValues = [...prevValues];
    //         newValues[index] = newValue;
    //         return newValues;
    //     })
    // }

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className={`filter-modal ${show ? "show" : ""}`}>
                    <div className="filter-content">
                        <div className="filter-header">

                        </div>
                        <div className="filter-body">
                            <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#titleCollapse" aria-expanded="false" aria-controls="titleCollapse"><h5>Product Name <i className="fa-solid fa-caret-down"></i></h5>
                            </button>
                            <div className="collapse" id="titleCollapse">
                                <div className="card card-body">
                                    <div className="form-check">
                                        {titleOptions.map((option) => (
                                            <div key={option}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`${option}`}
                                                    checked={selectedTitles.includes(option)}
                                                    onChange={() =>
                                                        setSelectedTitles((prev) =>
                                                            prev.includes(option)
                                                                ? prev.filter((v) => v !== option)
                                                                : [...prev, option]
                                                        )
                                                    }
                                                />
                                                <label htmlFor={`title-${option}`}>{option}</label>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className="btn filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#priceCollapse" aria-expanded="false" aria-controls="priceCollapse">
                                    <h5>Price <i className="fa-solid fa-caret-down"></i></h5>
                                </button>
                                <div className="collapse" id="priceCollapse">
                                    <div className="card card-body">
                                        <div className="form-check">
                                            <label
                                                htmlFor="priceRange"
                                                className="form-label">Show products up to:</label>
                                            <div>
                                                <input type="range" className="form-range"
                                                    min={Math.min(...selectedPrice)}
                                                    max={Math.max(...selectedPrice)}
                                                    id="priceRange"
                                                    value={selectedPrice[0]} onChange={(e) => handleRangeChange(0, Number(e.target.value))} />
                                            </div>
                                            <div className="rangeLabels">
                                                <span id="minPrice">{currencyFormat(Math.min(...selectedPrice))}</span>
                                                <span id="rangeValue"><b>{currencyFormat(selectedPrice[0])}</b></span>
                                                <span id="maxPrice">{currencyFormat(Math.max(...selectedPrice))}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="filter-footer mt-2">
                            <button className="btn btn-dark" onClick={handleFilterReset}>Reset</button>
                            <button className="btn btn-dark ms-2 " onClick={handleFilterApply}>Apply</button>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas >
    );
};

export default Filter;
