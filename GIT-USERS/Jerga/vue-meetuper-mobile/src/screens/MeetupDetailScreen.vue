<template>
  <nb-container v-if="isMeetupLoaded">
    <AppHeader screen="Meetup" :navigation="navigation" />
    <view :style="[styles.imageWrapper]">
      <ImageBackground
        resizeMode="cover"
        :style="styles.backgroundImage"
        :source="{ uri: meetup.image }"
      >
        <view
          :style="[
            styles.container,
            { backgroundColor: 'rgba(0,0,0,0.5)', height: '100%' },
          ]"
        >
          <nb-h1 :style="[styles.headerOne, { color: 'white' }]">{{
            meetup.title
          }}</nb-h1>
          <nb-thumbnail
            class="user-image"
            :style="{ marginTop: 10, marginBottom: 10 }"
            :source="{ uri: meetupCreator.avatar }"
          />
          <nb-text :style="[styles.label, { color: 'white' }]"
            >by {{ meetupCreator.name }}
          </nb-text>
        </view>
      </ImageBackground>
    </view>
    <nb-content>
      <nb-card>
        <nb-tabs>
          <nb-tab heading="Details">
            <MeetupDetailInfo :meetup="meetup" />
          </nb-tab>
          <nb-tab heading="Threads">
            <MeetupThreads :threads="threads" />
          </nb-tab>
          <nb-tab heading="Joined People">
            <MeetupPeople :people="meetup.joinedPeople" />
          </nb-tab>
        </nb-tabs>
      </nb-card>
    </nb-content>
  </nb-container>
</template>

<script>
import MeetupDetailInfo from "@/components/MeetupDetailInfo";
import MeetupThreads from "@/components/MeetupThreads";
import MeetupPeople from "@/components/MeetupPeople";
import { ImageBackground } from "react-native";
import styles from "@/styles";
export default {
  components: {
    MeetupDetailInfo,
    MeetupThreads,
    MeetupPeople,
    ImageBackground,
  },
  props: {
    navigation: {
      type: Object,
    },
  },
  data() {
    return {
      styles,
    };
  },
  computed: {
    meetup() {
      return this.$store.state.meetups.item;
    },
    threads() {
      return this.$store.state.threads.items;
    },
    isMeetupLoaded() {
      return Object.keys(this.meetup).length > 0;
    },
    meetupCreator() {
      return this.meetup.meetupCreator || {};
    },
  },
  created() {
    const meetupId = this.navigation.getParam("meetupId", "undefined");

    this.$store.dispatch("meetups/fetchMeetupById", meetupId);
    this.$store.dispatch("threads/fetchThreads", meetupId);
  },
};
</script>

<style></style>
