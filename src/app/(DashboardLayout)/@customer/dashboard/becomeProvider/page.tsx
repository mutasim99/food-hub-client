import BecomeProviderFrom from "@/components/modules/dashboard/Customer/BecomeProvider";

export default function BecomeAProvider() {
  return (
    <div className="mt-2">
      <h2 className="text-2xl text-center font-bold">
        Become a <span className="text-orange-500">Provider</span>
      </h2>
      <div className="mt-8">
        <BecomeProviderFrom />
      </div>
    </div>
  );
}
