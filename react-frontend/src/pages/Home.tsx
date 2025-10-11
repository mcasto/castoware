import HeaderComponent from "../components/HeaderComponent"
import HeaderImage from "../components/HeaderImage"
import WhatWeOfferContents from "../components/WhatWeOfferContents"
import WhatWeOfferImage from "../components/WhatWeOfferImage"
import ContactUs from "../components/ContactUs"

function Home() {
    return (
        <>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row ">
                    <div className="w-full md:w-1/2">
                        <HeaderComponent />
                    </div>

                    <div className="hidden md:block md:w-1/2">
                        <HeaderImage />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-5">
                <div className="flex flex-col md:flex-row ">
                    <div className="w-full md:w-1/2">
                        <WhatWeOfferImage />
                    </div>

                    <div className="hidden md:block md:w-1/2">
                        <WhatWeOfferContents />
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <ContactUs />
            </div>
        </>
    )
}

export default Home
