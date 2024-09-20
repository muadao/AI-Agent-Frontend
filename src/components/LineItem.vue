<script setup lang="ts">
import {marked} from 'marked'
import {playBase64} from '@/audio'
import {config} from "@/config";

const getContent = computed(() => marked(props.historyItem.text))

const props = defineProps({
  historyItem: Object
})

const getName = () => {
  return props.historyItem.from === 'user' ? 'You' : config.name;
}

const play = () => {
  playBase64(props.historyItem.audio)
}

const getState = () => {
  return props?.historyItem?.state
}

</script>

<template>
  <div class="container" :class="props.historyItem.from === 'assistant'? '':'container-right'">
    <div class="message"
         :class="props.historyItem.from+'-message'">
      <div
          style="display: flex; flex-direction: row; justify-items: start; align-items: center; gap: 0.5em; width: 100%">
        <div
            style="display: flex; flex-direction: row; justify-items: start; align-items: center; gap: 0.5em; width: 100%">
          <n-avatar size="small" round
                    :src="props.historyItem.from === 'assistant'?config.avatar: 'assets/user-avatar.png'"></n-avatar>
          <span
              style="font-weight: bold; color: gray"> {{ getName() }}  </span></div>
        <svg v-if="props.historyItem.from === 'assistant' && props.historyItem.audio" style="cursor: pointer"
             @click="play" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.04"/>
          <path
              d="M17.6667 23.2708V21.5625C18.9167 21.2014 19.9236 20.5069 20.6875 19.4792C21.4514 18.4514 21.8333 17.2847 21.8333 15.9792C21.8333 14.6736 21.4514 13.5069 20.6875 12.4792C19.9236 11.4514 18.9167 10.7569 17.6667 10.3958V8.6875C19.3889 9.07639 20.7917 9.94792 21.875 11.3021C22.9583 12.6562 23.5 14.2153 23.5 15.9792C23.5 17.7431 22.9583 19.3021 21.875 20.6562C20.7917 22.0104 19.3889 22.8819 17.6667 23.2708ZM8.5 18.5V13.5H11.8333L16 9.33333V22.6667L11.8333 18.5H8.5ZM17.6667 19.3333V12.625C18.3194 12.9306 18.8299 13.3889 19.1979 14C19.566 14.6111 19.75 15.2778 19.75 16C19.75 16.7083 19.566 17.3646 19.1979 17.9687C18.8299 18.5729 18.3194 19.0278 17.6667 19.3333Z"
              fill="white"/>
        </svg>
        <svg v-if="props.historyItem.from === 'assistant' && !props.historyItem.audio" width="32" height="32"
             viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="white" fill-opacity="0.04"/>
          <path
              d="M17.6667 23.2708V21.5625C18.9167 21.2014 19.9236 20.5069 20.6875 19.4792C21.4514 18.4514 21.8333 17.2847 21.8333 15.9792C21.8333 14.6736 21.4514 13.5069 20.6875 12.4792C19.9236 11.4514 18.9167 10.7569 17.6667 10.3958V8.6875C19.3889 9.07639 20.7917 9.94792 21.875 11.3021C22.9583 12.6562 23.5 14.2153 23.5 15.9792C23.5 17.7431 22.9583 19.3021 21.875 20.6562C20.7917 22.0104 19.3889 22.8819 17.6667 23.2708ZM8.5 18.5V13.5H11.8333L16 9.33333V22.6667L11.8333 18.5H8.5ZM17.6667 19.3333V12.625C18.3194 12.9306 18.8299 13.3889 19.1979 14C19.566 14.6111 19.75 15.2778 19.75 16C19.75 16.7083 19.566 17.3646 19.1979 17.9687C18.8299 18.5729 18.3194 19.0278 17.6667 19.3333Z"
              fill="grey"/>
        </svg>

      </div>
      <div style="width: auto; display: flex;min-height: 1.6em">
        <span v-if="getState()==='pending'"> &nbsp <img src="../../public/assets/loading.gif"
                                                        style="width: auto;height: 1.6em"/></span>
        <span v-else v-html="getContent"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 16px;
  height: 16px;
}

.container {
  width: 100%;
  display: flex;
}

.container-right {
  justify-content: flex-end;
}

.message {
  min-width: 20%;
  max-width: 80%;
  border-radius: 1em;
  display: flex;
  align-items: start;
  font-weight: bold;
  flex-direction: column;
  flex-basis: auto;
  height: fit-content;
  width: fit-content;
  padding: 1em;
  gap: 0.75em;
}

.user-message {
  background-color: #FF7B52;
  color: black;
}

.assistant-message {
  background-color: rgb(43, 46, 54);
  color: white;
}

.notification-message {
  background-color: #EB8D271A;
}


</style>