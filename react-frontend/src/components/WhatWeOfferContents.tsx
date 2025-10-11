import { mdiBullhorn } from "@mdi/js";
import Icon from "@mdi/react";

const WhatWeOfferContents = () => {
    return (
        <div className='p-2'>
            <div className="flex-1 text-xl">
                <div className="text-4xl text-center">What We Offer</div>

                <ul className="list-disc ml-8 mt-4">
                    <li>Professional development at reasonable cost</li>
                    <li>Web application development</li>
                    <li>Web development</li>
                    <li>Hosting options</li>
                    <li>Desktop application development for Windows, Macintosh, Linux</li>
                    <li>Flexible collaboration</li>
                </ul>

                <div className="flex items-center ml-2 mt-4">
                    <Icon path={mdiBullhorn} className="mt-2 text-[#3db6b4] rounded-full transition-colors" size={1.5} /> <span className="mt-2 ml-2 text-3xl font-bold">Coming Soon!</span>
                </div>
                <div className="ml-3 mt-1">
                    <strong><em>Prism</em> by CastoWare</strong>
                </div>
                <div className="ml-5 text-sm">
                    Beginning development in Q4 2025, <em>Prism</em> will address long-standing gaps in the US healthcare provider data with an innovative approach to accuracy and timeliness.
                </div>
            </div>


        </div>
    );
};

export default WhatWeOfferContents;
