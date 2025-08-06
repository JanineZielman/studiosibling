import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@/components/PrismicRichText";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock: FC<TextBlockProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-block"
    >
      <h2>{slice.primary.title}</h2>
      <PrismicRichText field={slice.primary.text} />
      <div className="columns">
        {slice.primary.columns.map((item, i) => (
          <div className="column" key={`column${i}`}>
            <PrismicRichText field={item.column} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TextBlock;
