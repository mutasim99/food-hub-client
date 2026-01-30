import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bannerImg from "../../../../../public/assets/BannerImage/BannerImage.jpg";
import Image from "next/image";
import { Check } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="w-full p-16">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
        {/* Left content */}
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-orange-50 px-4 py-1 text-sm font-medium text-orange-500">
            Hungry?
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight
          text-gray-600"
          >
            The quickest way to{" "}
            <span className="text-orange-500">great food</span>
          </h1>
          <p className="text-gray-500 max-w-lg">
            Browse hundreds of local provider, order your favorite meals, and
            track them in real-time.From kitchen to your doorstep in mutes
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-width-md">
            <Input placeholder="Search food..." className="h-12" />
            <Button className="h-12 bg-orange-500 hover:bg-orange-600">
              Find Food
            </Button>
          </div>
        </div>
        {/* Right Image */}
        <div className="relative w-full h-96 mb-6">
          <Image
            src={bannerImg}
            alt="banner-img"
            fill
            className="object-cover"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-xl p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">200+ Food items</p>
              <p className="text-sm text-gray-500">verified local favorites</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
