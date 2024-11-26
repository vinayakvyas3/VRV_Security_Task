import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/Dashboard/Dashboard";
import CustomerDetail from "./scenes/CustomerDetail/CustomerDetail";
import ShippingDetails from "./scenes/ShippingDetails/ShippingDetails";
import Contacts from "./scenes/PurchaseOrder/PurchaseOrder";
import DeleteCustomer from "./scenes/deletecustomer/DeleteCutomer"; // Corrected path
import Form from "./scenes/CustomerAddForm";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import ShippingDetailsForm from "./scenes/ShippingDetailsForm/ShippingDetailsForm";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import PurchaseForm from "./scenes/PurchaseOrderAddForm/PurchaseForm";
// import Signup from "./components/Signup";

function App() {
    const [theme, colorMode] = useMode(); // Set the initial color mode to light
    const [isSidebar, setIsSidebar] = useState(true);

    return ( 
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme} >
                <CssBaseline />
                <div className="app" >
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content" >
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/customerdetail" element={<CustomerDetail />} />
                            <Route path="/purchaseorder" element={<Contacts />} />
                            <Route path="/shipping" element={<ShippingDetails />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/pie" element={<Pie />} />
                            <Route path="/line" element={<Line />} />
                            <Route path="/shippingdetail" element={<ShippingDetailsForm />} />
                            <Route path="/purchase" element={<PurchaseForm />} />
                            {/* New Route for DeleteCustomer */}
                            <Route path="/deletecustomer" element={<DeleteCustomer />} /> {/* Corrected path */}
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
