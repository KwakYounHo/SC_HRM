import { FacebookQR } from "@/components/FacebookQR";

export default function Footer(): JSX.Element {
  const linkStyle = "hover:text-blue-200 transition-colors";
  const socialData = [
    {
      id: 0,
      title: "Facebook",
      link: "https://www.facebook.com/studioclip.official",
    },
    { id: 1, title: "YouTube", link: "https://www.youtube.com/@StudioClip_" },
    { id: 2, title: "TikTok", link: "https://www.tiktok.com/@studio.clip" },
    {
      id: 3,
      title: "instagram",
      link: "https://www.instagram.com/_studio_clip/",
    },
  ];
  return (
    <div
      className={
        "w-full bg-background border-t px-8 py-4 text-xs flex justify-between items-center"
      }
    >
      <div>
        <div>
          <a
            href={"https://studioclip.video/"}
            className={`${linkStyle} inline-block`}
            target={"_blank"}
          >
            <div className={"flex gap-1"}>
              <p className={"uppercase"}>studio clip</p>
              <p className={"capitalize"}>corp.</p>
            </div>
          </a>
          <p>
            Royal Mg Bamar Residence, Dhammar Yone Street, Hlaing, Yangon,
            Myanmar
          </p>
        </div>
        <div className={"mt-2"}>
          {socialData.map((element) => {
            return (
              <div key={element.id} className={"flex gap-1"}>
                <p className={"inline-block flex-none"}>{element.title} :</p>
                <a href={element.link} className={linkStyle} target={"_blank"}>
                  {element.link}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <FacebookQR className={"w-24 h-24"} />
    </div>
  );
}
