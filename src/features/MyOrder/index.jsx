import { useState } from "react";
import { useEffect } from "react";
import OrderBanner from './components/OrderBanner';
import OrderTable from './components/OrderContent';
function handleMyOrder() {
    return(
    <><OrderBanner /><div>
            <OrderTable />
        </div></>
    
    )
}
export default handleMyOrder