import { CustomButton } from "../components/primaryButtons"
import { useNavigate } from "react-router-dom"

function OrderSuccess() { 
    const navigate = useNavigate()

    return (
        <div>
            <p>Mark</p>
            <h1>Order Placed</h1>
            <p>we will connect you when we confirm</p>

            <CustomButton 
            title="Back to Menu"
            onPress={() => navigate("/menu")}
            />
        </div>
    )

}
export default OrderSuccess