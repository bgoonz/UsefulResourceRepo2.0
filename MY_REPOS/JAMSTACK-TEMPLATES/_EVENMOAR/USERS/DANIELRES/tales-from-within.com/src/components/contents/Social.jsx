import Facebook from "../icons/Facebook";
import Soundcloud from "../icons/Soundcloud";
import { LinkSocial } from "../ui/LinkSocial";

export function Social() {
  return (
    <div className="grid grid-cols-2 text-white">
      <div className="text-right mr-4">
        <LinkSocial
          href="https://soundcloud.com/tales-from-within"
          Icon={Soundcloud}
          size={30}
        >
          Soundcloud
        </LinkSocial>
      </div>

      <div className="text-left ml-4">
        <LinkSocial
          href="https://soundcloud.com/tales-from-within"
          Icon={Facebook}
          size={18}
        >
          Facebook
        </LinkSocial>
      </div>
    </div>
  );
}
