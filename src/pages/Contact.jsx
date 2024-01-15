import React from "react";
import ContactUsForm from "../components/common/ContactUsForm";
import { IoIosChatboxes, IoIosCall } from "react-icons/io";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import Reviews from "../components/common/Reviews";
import Footer from "../components/common/Footer";

const Contact = () => {
  const contactList = [
    {
      icon: <IoIosChatboxes />,
      heading: "Chat on us",
      des: "Our friendly team is here to help.",
      footer: "20bec061@gmail.com",
    },
    {
      icon: <BsGlobeCentralSouthAsia />,
      heading: "Visit us",
      des: "Come and say hello at our office HQ.",
      footer: "NIT Hamirpur, H.P",
    },
    {
      icon: <IoIosCall />,
      heading: "Call us",
      des: "Mon - Fri From 8am to 5pm",
      footer: "+91 62047 14782",
    },
  ];

  return (
    <div className="lg:mt-[100px] sm:mt-6">
      <div className="mx-auto flex lg:flex-row flex-col w-10/12 gap-[52px] items-start ">
        {/* section 1 */}
        <div className="flex flex-col lg:w-[40%] bg-richblack-800 p-[24px] rounded-md gap-[32px] w-full">
          {contactList.map((data, index) => (
            <div key={index} className="flex flex-row">
              <div>
                <div className=" text-richblack-600 text-3xl items-center px-3">
                  {data.icon}
                </div>
              </div>

              <div className="flex flex-col gap-2 ">
                <h1 className="text-xl text-richblack-25 items-center">
                  {data.heading}
                </h1>
                <div className="gap-1">
                  <p className=" text-richblack-400 ">{data.des}</p>
                  <p className=" text-richblack-400 font-semibold">
                    {data.footer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* form section */}
        <div className="flex flex-col lg:justify-start p-[52px] border-[1px] lg:w-[55%] border-richblack-600 rounded-md gap-[12px]">
          <h1 className="text-4xl font-bold text-richblack-5">
            Got a Idea? We’ve got the skills. Let’s team up
          </h1>
          <p className=" text-richblack-400">
            Tall us more about yourself and what you’re got in mind.
          </p>
          <ContactUsForm />
        </div>
      </div>

      <Reviews />
      <Footer />
    </div>
  );
};

export default Contact;
