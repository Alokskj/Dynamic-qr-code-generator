import { QrCodePreview } from "@/components/QrCodePreview";
import React from "react";
import { Navigate, useLocation} from "react-router-dom";

const PreviewPage = () => {
    const location = useLocation();
    const imageUrl = location.state.imageUrl;
    // if(!imageUrl){
    //     return <Navigate to='/' />
    // }
  return <div className="flex justify-center items-center min-h-screen"><QrCodePreview imageUrl={imageUrl} /></div>;
};

export default PreviewPage;
