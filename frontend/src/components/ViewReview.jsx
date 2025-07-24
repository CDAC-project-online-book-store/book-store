import ProfileIcon from '../assets/icons/profile.svg?react';
import Rating from '../assets/icons/rating.svg?react'

function ViewReview() {
    return (
        <>
            <div className="container-md mt-5" style={{ backgroundColor: "var(--tea-green)", width: 850}}>
                <h2>Reviews</h2>
                {/* Review 1 */}
                <div className="container-md review-card p-3" >

                    <div className="d-flex flex-row mb-2">
                        <ProfileIcon width={25} height={25} stroke="black" fill="none" />
                        <div>Sarah Mitchell</div>
                    </div>

                    <div className='d-flex flex-row mb-2'>
                        <div>
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                        </div>
                        <div className='ms-1 pt-1 review-title'> 
                            Awesome 
                        </div>
                    </div>
                    <div className="review-status">Verified purchase</div>
                    <div>
                        This book pulled me in from the very first chapter. The writing is hauntingly beautiful, and the characters feel incredibly real. I couldn't stop turning the pages, desperate to know how it would all end. A must-read for anyone who loves a mix of mystery and raw human emotion.
                    </div>
                </div>
                <hr />

                {/* Review 2 */}
                <div className="container-md review-card p-3" >

                    <div className="d-flex flex-row mb-2">
                        <ProfileIcon width={25} height={25} stroke="black" fill="none" />
                        <div>Daniel Carter</div>
                    </div>

                    <div className='d-flex flex-row mb-2'>
                        <div>
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                        </div>
                        <div className='ms-1 pt-1 review-title'>
                            Stunning
                        </div>
                    </div>
                    <div className="review-status">Verified purchase</div>
                    <div>
                        An absolutely stunning story that blends history with suspense. The pacing is perfect, and the twists kept me on edge throughout. Easily one of the best books I’ve read this year.
                    </div>

                </div>
                <hr />

                {/* Review 3 */}
                <div className="container-md review-card p-3" >

                    <div className="d-flex flex-row mb-2">
                        <ProfileIcon width={25} height={25} stroke="black" fill="none" />
                        <div>Emily Stone</div>
                    </div>

                    <div className='d-flex flex-row mb-2'>
                        <div>
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="white" />
                        </div>
                        <div className='ms-1 pt-1 review-title'>
                            Thrilling
                        </div>
                    </div>
                    <div className="review-status">Verified purchase</div>
                    <div>
                        A gripping tale with unexpected depth. Emily’s prose is rich and evocative, though some parts felt slightly rushed. Still, a solid read for fans of atmospheric thrillers.
                    </div>

                </div>
                <hr />

                {/* Review 4 */}
                <div className="container-md review-card p-3" >

                    <div className="d-flex flex-row mb-2">
                        <ProfileIcon width={25} height={25} stroke="black" fill="none" />
                        <div>Michael Reynolds</div>
                    </div>

                    <div className='d-flex flex-row mb-2'>
                        <div>
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="white" />
                            <Rating width={20} height={20} stroke="black" fill="white" />
                        </div>
                        <div className='ms-1 pt-1 review-title'>
                            Decent enough
                        </div>
                    </div>
                    <div className="review-status">Verified purchase</div>
                    <div>
                        A decent read overall. The first half was a bit slow but picked up momentum in the latter chapters. Would recommend to readers who enjoy slow-burn emotional stories.
                    </div>

                </div>
                <hr />

                {/* Review 5 */}
                <div className="container-md review-card p-3" >

                    <div className="d-flex flex-row mb-2">
                        <ProfileIcon width={25} height={25} stroke="black" fill="none" />
                        <div>Olivia Martinez</div>
                    </div>

                    <div className='d-flex flex-row mb-2'>
                        <div>
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                        </div>
                        <div className='ms-1 pt-1 review-title'>
                            Lovely
                        </div>
                    </div>
                    <div className="review-status">Verified purchase</div>
                    <div>
                        Absolutely loved this book! The characters felt so real, and the plot twists had me gasping out loud. I couldn’t put it down until I finished it in one sitting.
                    </div>

                </div>
                <hr />

                {/* Review 6 */}
                <div className="container-md review-card p-3" >

                    <div className="d-flex flex-row mb-2">
                        <ProfileIcon width={25} height={25} stroke="black" fill="none" />
                        <div>Liam Patel</div>
                    </div>

                    <div className='d-flex flex-row mb-2'>
                        <div>
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="yellow" />
                            <Rating width={20} height={20} stroke="black" fill="white" />
                            <Rating width={20} height={20} stroke="black" fill="white" />
                        </div>
                        <div className='ms-1 pt-1 review-title'>
                            Fractured Memories
                        </div>
                    </div>
                    <div className="review-status">Verified purchase</div>
                    <div>
                        A solid effort by the author. Some parts were predictable, but the emotional weight carried it through. Worth reading if you enjoy family dramas with a twist.
                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewReview