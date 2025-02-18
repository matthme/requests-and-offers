import type { IndividualType, Profile } from '$lib/stores/profiles';
import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const data: FormData = await request.formData();
    const name = data.get('name') as string;
    const nickname = data.get('nickname') as string;
    const bio = data.get('bio') as string;
    const profile_picture = (await (data.get('picture') as File).arrayBuffer()) as Uint8Array;
    const individual_type = data.get('individual_type') as IndividualType;
    const skills = data.getAll('skills') as string[];
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const time_zone = data.get('timezone') as string;
    const location = data.get('location') as string;

    const profile: Profile = {
      name,
      nickname,
      bio,
      profile_picture,
      individual_type,
      skills,
      email,
      phone,
      time_zone,
      location
    };

    try {
      // TODO: create profile on the DHT

      console.log(profile_picture);

      return {
        profile: { ...profile, profile_picture: new TextDecoder().decode(profile_picture) },
        success: true
      };
    } catch (e) {
      console.error(e);
    }

    return { profile: null, success: false };
  }
};
