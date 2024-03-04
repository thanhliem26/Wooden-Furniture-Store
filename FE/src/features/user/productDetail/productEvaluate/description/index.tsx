import Markdown from "react-markdown";
// import "react-markdown-editor-lite/lib/index.css";

interface Props {
  product: ProductState | null;
}

const Description = ({ product }: Props) => {
  return <Markdown children={product?.contentMarkdown} />;
};

export default Description;
