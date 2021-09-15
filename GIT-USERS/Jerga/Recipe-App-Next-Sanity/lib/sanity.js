import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createCurrentUserHook,
  createClient,
} from "next-sanity";

const config = {
  projectId: "5vwvw9lr",
  dataset: "production",
  apiVersion: "2021-06-19",
  useCdn: false,
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const Portabletext = createPortableTextComponent({
  ...config,
  serializers: {},
});
