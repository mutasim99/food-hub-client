import { getProviders } from "@/actions/public.action";
import ProviderCard from "@/components/public/ProviderCard";

export default async function RestaurantPage() {
  const res = await getProviders() ||[];
  
  // if (res.length === 0) {
  //   return <h2 className="text-center mt-10">No Providers Found</h2>;
  // }

  return (
    <div className="px-6 md:px-16 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">All Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {res.map((provider: any) => (
          <ProviderCard key={provider.id} provider={provider}></ProviderCard>
        ))}
      </div>
    </div>
  );
}
