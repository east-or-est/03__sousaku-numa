import Markdown from "../../../function/Markdown"


interface TextProps {
  text: string;
}


function Text({ text } : TextProps) {
  return (
    <p>
      <Markdown
        text={text}
      />
    </p>
  )
}


export default Text