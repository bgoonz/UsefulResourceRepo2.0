import Head from "next/head";
import { About } from "../components/contents/About";
import { Social } from "../components/contents/Social";
import { Layout } from "../components/Layout";
import { Card } from "../components/ui/Card";
import { H2 } from "../components/ui/H2";
import { Prose } from "../components/ui/Prose";
import { Track } from "../components/ui/Soundcloud/Track";
import { Stack } from "../components/ui/Stack";
import * as data from "../data";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Tales from Within music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Side col */}
          <Stack spacing="xs">
            <H2 align="left">Latest tracks</H2>

            <Stack spacing="2xs">
              {data.tracks.latest.map((slug, i) => (
                <Card compact key={`${slug}-${i}`}>
                  <Track track={slug} />
                </Card>
              ))}
            </Stack>
          </Stack>

          {/* Main col */}
          <div className="col-span-2 md:order-first mt-12 md:mt-0">
            <div className="md:pr-3">
              {/* About */}
              <Stack spacing="xs">
                <H2 align="left">About</H2>

                <Card>
                  <Prose>
                    <About />
                  </Prose>
                </Card>
              </Stack>
              {/* /About */}

              {/* Social */}
              <Card transparent>
                <Prose>
                  <Social />
                </Prose>
              </Card>
              {/* /Social */}
            </div>
          </div>
          {/* /Main col */}
        </div>
      </main>
    </Layout>
  );
}
