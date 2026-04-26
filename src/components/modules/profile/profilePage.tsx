"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Shield, UserRound } from "lucide-react";
import { Profile } from "@/types/profile.type";
import ProfileForm from "./profileForm";



export default function ProfilePage({ profile }: { profile: Profile }) {
  const initials =
    profile.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 px-4 py-8 text-white md:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">
            Manage your account information and profile photo.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Left side card */}
          <Card className="overflow-hidden border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/20 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profile Overview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-orange-500/30 bg-zinc-800 shadow-lg">
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-zinc-300">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-semibold">{profile.name}</h2>
                  <p className="text-sm text-zinc-400">{profile.email}</p>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                      {profile.role || "CUSTOMER"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-zinc-300"
                    >
                      {profile.status || "ACTIVE"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                  <Mail className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="text-zinc-400">Email</p>
                    <p className="font-medium text-white">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                  <Phone className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="text-zinc-400">Phone</p>
                    <p className="font-medium text-white">
                      {profile.phone ? profile.phone : "Not added"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                  <Shield className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="text-zinc-400">Role</p>
                    <p className="font-medium text-white">
                      {profile.role || "CUSTOMER"}
                    </p>
                  </div>
                </div>

                {profile.providerProfile && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Provider Info
                    </p>
                    <div className="space-y-1 text-sm text-zinc-300">
                      <p>Shop: {profile.providerProfile.shopName}</p>
                      <p>Address: {profile.providerProfile.address}</p>
                      <p>Provider Phone: {profile.providerProfile.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right side form */}
          <Card className="border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserRound className="h-5 w-5 text-orange-400" />
                Update Profile
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ProfileForm profile={profile} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
