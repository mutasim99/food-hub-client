import { getMyProfile } from "@/actions/profile.action";
import ProfilePage from "@/components/modules/profile/profilePage";

export default async function Page() {
  const { data, error } = await getMyProfile();

  

  if (error || !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-red-500">
          Failed to load profile
        </div>
      </div>
    );
  }

  return <ProfilePage profile={data} />;
}
