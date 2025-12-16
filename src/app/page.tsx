
import Header from "./_features/header";

import ImageAnalysis from "./imageAnalysis/page";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-start">
       <Header/>
       <ImageAnalysis/>
      
    </div>
  );
}
