<script lang="ts">
  import CreateProfileBtn from '$lib/CreateProfileBtn.svelte';
  import { getMyProfile } from '$lib/stores/profiles';
  import { onDestroy, onMount } from 'svelte';
  import defaultAvatarUrl from '$lib/assets/default_avatar.webp';
  import { isEmptyObj } from '$lib/utils';

  let profilePictureUrl: string;
  let myProfile = getMyProfile();

  onMount(() => {
    if (!isEmptyObj(myProfile?.profile_picture!)) {
      const uint8Array = new Uint8Array(Object.values(myProfile?.profile_picture!));
      let profilePictureBlob = new Blob([uint8Array], { type: 'image/*' });
      profilePictureUrl = URL.createObjectURL(profilePictureBlob);

      console.group('Profile Picture :');
      console.log('UInt8Array :', myProfile?.profile_picture);
      console.log('UInt8Array lenght :', Object.entries(myProfile?.profile_picture!).length);
      console.log('Blob', profilePictureBlob);
    } else {
      profilePictureUrl = defaultAvatarUrl;
    }

    console.log('profilePictureUrl :', profilePictureUrl);
    console.groupEnd();
  });

  onDestroy(() => {
    if (profilePictureUrl) {
      URL.revokeObjectURL(profilePictureUrl);
    }
  });
</script>

<section class="flex flex-col items-center">
  {#if !myProfile}
    <CreateProfileBtn />
  {:else}
    <div
      class="flex flex-col gap-5 items-center border-8 border-surface-600 rounded-xl p-5 w-1/2 min-w-96 bg-surface-400 drop-shadow-xl"
    >
      <h2 class="h2">{myProfile.name}</h2>
      <h3 class="h3">{myProfile.nickname}</h3>
      <!-- TODO: Use Avatar Skeleton component for display profile picture -->
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        class="rounded-full drop-shadow-lg"
        width="300"
        src={profilePictureUrl}
        alt="Profile Picture"
        on:load={() => URL.revokeObjectURL(profilePictureUrl)}
      />
      <p class="text-center">{myProfile.bio}</p>
      <p><b>Type :</b> {myProfile.individual_type}</p>
      <p><b>Skills :</b> {myProfile.skills?.join(', ')}</p>
      <p><b>Email :</b> {myProfile.email}</p>
      <p><b>Phone number :</b> {myProfile.phone}</p>
      <p><b>Timezone :</b> {myProfile.time_zone}</p>
      <p><b>Location :</b> {myProfile.location}</p>
    </div>
  {/if}
</section>
