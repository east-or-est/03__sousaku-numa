import Markdown from "../../../function/Markdown"


interface LiProps {
  text: string;
}


function Li({ text } : LiProps) {
  return (
    <li>
      <Markdown
        text={text}
      />
    </li>
  )
}


export default Li