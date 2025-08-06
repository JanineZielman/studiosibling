import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@/components/PrismicRichText";

/**
 * Props for `Quote`.
 */
export type QuoteProps = SliceComponentProps<Content.QuoteSlice>;

/**
 * Component for "Quote" Slices.
 */
const Quote: FC<QuoteProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="quote"
    >
      <PrismicRichText field={slice.primary.quote} />
      <PrismicRichText field={slice.primary.caption} />
    </section>
  );
};

export default Quote;
