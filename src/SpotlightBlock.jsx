"use client";

import Image from "next/image";
import Link from "next/link";

export default function SpotlightBlock() {
    return (
        <div className="spotlight-block" id="spotlight-template">
            <div className="container">
                <div
                    className="halo-row column-2 block-layout-grid"
                    data-swipe="list"
                    data-dots="false"
                    data-dots-mb="false"
                >
                    <div className="halo-item spotlight--image" id="block-image">
                        <div className="spotlight-item spotlight-item__image">
                            <div className="image-container">
                                <div className="img-box animate-- o-hidden">
                                    <Link
                                        href="/collections/1-1-offer"
                                        className="image-zoom adaptive_height image"
                                        title="صيدلية.كوم"
                                    >
                                        <Image
                                            src="/images/images.jpeg"
                                            alt="Spotlight Banner"
                                            width={1124}
                                            height={360}
                                            className="lazyloaded"
                                            loading="lazy"
                                        />
                                        <span className="data-lazy-loading"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
