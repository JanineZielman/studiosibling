import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@/components/PrismicRichText";


export type EmbedProps = SliceComponentProps<Content.EmbedSlice>;

const Embed: FC<EmbedProps> = ({ slice }) => {
  const embedHTML = slice.primary?.embed_link?.html || "";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="embed"
    >
      <div dangerouslySetInnerHTML={{ __html: embedHTML }} />
      <PrismicRichText field={slice.primary.caption}/>
    </section>
  );
};

export default Embed;
