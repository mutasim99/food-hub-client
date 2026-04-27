"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Shield, UserRound, Settings, Store, MapPin } from "lucide-react";
import { Profile } from "@/types/profile.type";
import ProfileForm from "./profileForm";

export default function ProfilePage({ profile }: { profile: Profile }) {
  const initials = profile.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b] text-white">
      {/* Background Decorative Elements */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-125 w-full max-w-7xl bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -left-20 top-1/4 h-64 w-64 bg-orange-600/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Account Settings
            </h1>
            <p className="text-zinc-400 font-medium">
              Update your personal details and manage your account preferences.
            </p>
          </div>
          <Badge variant="outline" className="w-fit border-zinc-800 bg-zinc-900/50 px-3 py-1 text-zinc-400">
            Last updated: Today
          </Badge>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* LEFT COLUMN: Identity Card */}
          <div className="space-y-6">
            <Card className="relative overflow-hidden border-zinc-800 bg-zinc-900/40 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 h-24 w-full bg-linear-to-r from-orange-600/20 to-orange-400/10" />
              
              <CardContent className="relative pt-12 text-center">
                {/* Avatar */}
                <div className="mx-auto relative h-32 w-32 mb-4 group">
                  <div className="absolute inset-0 rounded-full bg-linear-to-tr from-orange-500 to-orange-300 animate-pulse blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#09090b] bg-zinc-800 shadow-xl">
                    {profile.image ? (
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="128px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-black text-zinc-400">
                        {initials}
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <p className="text-zinc-400 text-sm mb-4">{profile.email}</p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className="bg-orange-600 font-bold hover:bg-orange-700">
                    {profile.role || "CUSTOMER"}
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    ● {profile.status || "ACTIVE"}
                  </Badge>
                </div>

                <Separator className="bg-zinc-800/50 mb-6" />

                {/* Quick Info List */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/50 text-orange-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Email</p>
                      <p className="truncate text-sm text-zinc-200">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/50 text-orange-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Phone</p>
                      <p className="text-sm text-zinc-200">{profile.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info Card (Only if exists) */}
            {profile.providerProfile && (
              <Card className="border-zinc-800 bg-zinc-900/40 backdrop-blur-xl">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4 text-orange-400">
                    <Store className="h-5 w-5" />
                    <h3 className="font-bold text-sm uppercase tracking-widest">Business Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1"><Store className="h-4 w-4 text-zinc-500" /></div>
                      <div>
                        <p className="text-sm font-semibold text-white">{profile.providerProfile.shopName}</p>
                        <p className="text-xs text-zinc-500">Shop Name</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1"><MapPin className="h-4 w-4 text-zinc-500" /></div>
                      <div>
                        <p className="text-sm font-semibold text-white">{profile.providerProfile.address}</p>
                        <p className="text-xs text-zinc-500">Business Address</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/20 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-zinc-800/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-orange-500/10 p-2">
                    <Settings className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Edit Profile</h3>
                    <p className="text-xs text-zinc-500">Your public information</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                <ProfileForm profile={profile} />
              </CardContent>
            </Card>

            {/* Extra Security/Tip Card */}
            <div className="rounded-2xl border border-orange-500/10 bg-orange-500/5 p-6">
              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-orange-500" />
                <div>
                  <h4 className="text-sm font-bold text-orange-100">Security Tip</h4>
                  <p className="text-xs text-orange-200/60 leading-relaxed mt-1">
                    Keep your phone number updated to ensure you can recover your account in case you lose access to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}