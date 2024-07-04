import aboutMainImage from "../assets/images/aboutMainImage.png";
import billGates from "../assets/images/billGates.png";
import pichai from "../assets/images/pichai.png";
import steveJobs from "../assets/images/steveJobs.png";
import whyUs from '../assets/images/whyUs.png'
import zuck from "../assets/images/zuck.png";
import HomeLayout from "../layouts/HomeLayout";

function AboutUs() {
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our mission is to empower learners and educators with a platform
                            that enhances the educational experience. We strive to provide a
                            seamless, user-friendly interface that supports a wide range of
                            learning styles and needs, ensuring that education is inclusive,
                            adaptable, and affordable.
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img src={aboutMainImage} alt="About Main Image" />
                    </div>
                </div>

                <div className="carousel w-1/2 my-32 mx-auto text-center">
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 rounded-full">
                            <img src={pichai} className="w-1/2 rounded-full border border-white" alt="Sundar Pichai" />
                            <h3 className="text-4xl font-semibold">Sundar Pichai</h3>
                            <p className="text-xl text-gray-400">“It is important to follow your dreams and heart. Do something that excites you.”</p>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide2" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 rounded-full">
                            <img src={billGates} className="w-1/2 rounded-full border border-white" alt="Bill Gates" />
                            <h3 className="text-4xl font-semibold">Bill Gates</h3>
                            <p className="text-xl text-gray-400">“Success is a lousy teacher. It seduces smart people into thinking they can&apos;t lose.”</p>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide3" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 rounded-full">
                            <img src={zuck} className="w-1/2 rounded-full border border-white" alt="Zuckerberg" />
                            <h3 className="text-4xl font-semibold">Mark Zuckerberg</h3>
                            <p className="text-xl text-gray-400">“Unless you are breaking stuff, you are not moving fast enough.”</p>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide4" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 rounded-full">
                            <img src={steveJobs} className="w-1/2 rounded-full border border-white" alt="Steve Jobs" />
                            <h3 className="text-4xl font-semibold">Steve Jobs</h3>
                            <p className="text-xl text-gray-400">“Design is not just what it looks like and feels like. Design is how it works.”</p>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide3" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide1" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-5 mx-10">
                <div className="w-2/5">
                        <img src={whyUs} alt="About Main Image" />
                    </div>
                    <section className="w-3/5 space-y-10 text-center my-32">
                    {/* <ul className="space-y-10">
                        <li className="text-5xl text-gray-400 font-semibold hover:text-gray-200">
                        Affordable Education
                        </li>
                        <li className="text-5xl text-gray-400 font-semibold hover:text-gray-200">
                        Quality Content
                        </li>
                        <li className="text-5xl text-gray-400 font-semibold hover:text-gray-200">
                        Continuous Innovation
                        </li>
                        <li className="text-5xl text-gray-400 font-semibold hover:text-gray-200">
                        Flexible Access
                        </li>
                        <li className="text-5xl text-gray-400 font-semibold hover:text-gray-200">
                        Support & Community
                        </li>

                    </ul> */}
                    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
  <li>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd" />
      </svg>
    </div>
    <div className="timeline-start mb-10 text-end text-gray-400 hover:text-gray-200">
      <div className="text-lg font-black">Continuous Innovation</div>
      We are committed to staying at the forefront of e-learning technology, constantly evolving to meet the changing needs of the educational landscape.
    </div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd" />
      </svg>
    </div>
    <div className="timeline-end mb-10 text-left text-gray-400 hover:text-gray-200">
      <div className="text-lg font-black">Quality Content</div>
      We prioritize high standards of content and instruction, ensuring that every learner receives the best possible educational experience.
    </div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd" />
      </svg>
    </div>
    <div className="timeline-start mb-10 text-end text-gray-400 hover:text-gray-200">
      <div className="text-lg font-black">Flexible Access</div>
      Learn at your own pace, on your own schedule. Our platform is accessible from any device, ensuring that you can study whenever and wherever you choose.
    </div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd" />
      </svg>
    </div>
    <div className="timeline-end mb-10 text-left text-gray-400 hover:text-gray-200">
      <div className="text-lg font-black">Affordable Education</div>
      We believe that quality education should be accessible to all. Our platform offers cost-effective solutions without compromising on the quality of learning.
    </div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd" />
      </svg>
    </div>
    <div className="timeline-start mb-10 text-end text-gray-400 hover:text-gray-200">
      <div className="text-lg font-black">Support and Community</div>
      Join a vibrant community of learners and educators. Our dedicated support team is always here to assist you, ensuring that you get the most out of our platform.
    </div>
  </li>
</ul>
                    </section>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AboutUs;
