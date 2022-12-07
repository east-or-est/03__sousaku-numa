import { Component } from "react";
import Markdown from "../../../function/Markdown"


interface HeadlineProps {
  text: string;
  Component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  en?: boolean;
}


function Headline({ text, Component = "h2", en = false } : HeadlineProps) {
  return (
    <>
      { en === true ?
        <Component className="en" data-title={Component}>
          {text}
        </Component>
        :
        <Component data-title={Component}>
          {text}
        </Component>
      }
    </>
  )
}


export default Headline