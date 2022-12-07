import ReactMarkdown from 'react-markdown'


interface MarkdownProps {
  text: string;
}


function Markdown({ text } : MarkdownProps) {
  return (
    <ReactMarkdown>
      { text }
    </ReactMarkdown>
  )
}


export default Markdown