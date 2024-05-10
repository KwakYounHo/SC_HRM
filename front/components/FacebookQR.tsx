import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

type Props = {
  className: string;
};

export async function FacebookQR({ className }: Props): Promise<JSX.Element> {
  const supabase = createClient();

  const {
    data: { publicUrl: imgURL },
  } = await supabase.storage
    .from("ST_HRM")
    .getPublicUrl("STUDIO_CLIP_QR_FACEBOOK-removebg-preview.png");

  return (
    <div>
      <Image
        src={imgURL}
        width={500}
        height={500}
        className={className}
        alt={"Facebook QR Code Img download failed"}
      />
    </div>
  );
}
