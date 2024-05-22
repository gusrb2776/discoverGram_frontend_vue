import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        memberSeq: 2,
        profileImgage: null,
    }),
    actions: {
        setMemberSeq(seq) {
            this.memberSeq = seq
        },
        setProfileImgage(profileImgage){
            this.profileImgage = profileImgage
        }
    }
})