import { FunctionComponent } from "react";

interface QuantityProps {
    quantity?: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const Quantity: FunctionComponent<QuantityProps> = ({ quantity, onDecrement, onIncrement }) => {

    return (
        <>
            <button className="btn" onClick={onDecrement}>-</button>
            <span>{quantity}</span>
            <button className="btn" onClick={onIncrement}>+</button>
        </>
    )
}

export default Quantity;