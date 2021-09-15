import { ProseLink } from "../ui/ProseLink";

export function About() {
  return (
    <>
      <p>
        The music of <b>Tales from Within</b> is a blend of natural sounds with
        electronic ones, arranged into floaty, dreamy, sometimes ominous
        atmospheres, as an invitation for listeners to explore their own
        imaginary worlds.
      </p>
      <p>
        It is inspired by other artists such as{" "}
        <ProseLink href="https://androcell.bandcamp.com/track/atmos-spheres">
          Androcell
        </ProseLink>
        ,{" "}
        <b>
          <ProseLink href="https://bluetech.bandcamp.com/track/turning-inside-out">
            Bluetech
          </ProseLink>
        </b>
        ,{" "}
        <ProseLink href="https://www.youtube.com/watch?v=noemEW3J1xI">
          Zero Cult
        </ProseLink>
        ,{" "}
        <ProseLink href="https://carbonbasedlifeforms.bandcamp.com/track/photosynthesis">
          Carbon Based Lifeforms
        </ProseLink>
        ,{" "}
        <ProseLink href="https://mysticcrock.bandcamp.com/track/extended-space-mystical-remastered">
          Mystic Crock
        </ProseLink>
        , and{" "}
        <ProseLink href="https://youtu.be/wWGKwNt9NY8">
          Dead can Dance
        </ProseLink>{" "}
        amongst others.
      </p>

      <p>
        Other influences include <b>World/Ethnic music</b>,{" "}
        <b>video games music</b>,{" "}
        <b>
          70<sup>ies</sup> progressive and{" "}
          <ProseLink href="https://youtu.be/9hmFzGTxod4">psychedelic</ProseLink>{" "}
          rock
        </b>
        , and{" "}
        <b>
          <ProseLink target="_blank" href="https://youtu.be/oS_EjMnYbSE">
            synthwave
          </ProseLink>
        </b>
        .
      </p>

      <p>
        <b>Tales from Within</b> is made by Daniel Reszka using a very simple
        setup made of an IPad running{" "}
        <ProseLink href="https://www.blipinteractive.co.uk/nanostudio2/">
          Nanostudio2
        </ProseLink>
        , using sound textures and electronic instruments mostly created by
        himself.
      </p>
    </>
  );
}
