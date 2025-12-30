import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import "./FAQ.css";

const FAQ_DATA = [
  {
    id: 1,
    q: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry ?",
    a: `Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.
When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.`,
  },
  {
    id: 2,
    q: "Lorem Ipsum Is Simply Dummy Text ?",
    a: `Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
It Has Survived Not Only Five Centuries, But Also The Leap Into Electronic Typesetting.`,
  },
  {
    id: 3,
    q: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry ?",
    a: `Lorem Ipsum is simply dummy text. You can replace this with your real FAQ content later.`,
  },
  {
    id: 4,
    q: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry ?",
    a: `Lorem Ipsum is simply dummy text. Replace it with your own data.`,
  },
  {
    id: 5,
    q: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry ?",
    a: `Lorem Ipsum is simply dummy text. Replace it with your own data.`,
  },
  {
    id: 6,
    q: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry ?",
    a: `Lorem Ipsum is simply dummy text. Replace it with your own data.`,
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1); 

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <MainLayout pageTitle="Liste des FAQ" pageSubtitle="">
      <div className="faqPage">
        <div className="faqHeader">
          <h1 className="faqTitle">FAQs</h1>
        </div>

        <div className="faqList">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className={`faqItem ${isOpen ? "open" : ""}`}>
                <button className="faqQuestion" onClick={() => toggle(item.id)}>
                  <span className={`faqIcon ${isOpen ? "minus" : "plus"}`}>
                    {isOpen ? "−" : "+"}
                  </span>
                  <span className="faqQText">{item.q}</span>
                </button>

                {isOpen && (
                  <div className="faqAnswer">
                    <div className="faqAnswerInner">{item.a}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
