"use client";

import { updateMyProfile } from "@/actions/profile.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Profile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: number | null;
  role: string | null;
  status: string | null;
  providerProfile?: {
    id: string;
    shopName: string;
    address: string;
    phone: string;
    image: string;
  } | null;
}

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>(profile.image || "");
  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(
    profile.phone ? String(profile.phone) : ""
  );
  const [file, setFile] = useState<File | null>(null);

  const initials = useMemo(() => {
    return (
      profile.name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  }, [profile.name]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (phone && !/^\d+$/.test(phone)) {
      toast.error("Phone must contain only numbers");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      if (phone.trim()) formData.append("phone", phone.trim());
      if (file) formData.append("image", file);

      const result = await updateMyProfile(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Profile updated successfully");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-zinc-300">
                {initials}
              </div>
            )}
          </div>

          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border-zinc-800 bg-zinc-900 text-zinc-200 file:border-0 file:bg-orange-500 file:text-white"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-zinc-800 bg-zinc-900 text-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-zinc-800 bg-zinc-900 text-white"
              placeholder="Your phone number"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Email</p>
              <p className="mt-1 text-white">{profile.email}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Status</p>
              <p className="mt-1 text-white">{profile.status || "ACTIVE"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-500 px-6 text-white hover:bg-orange-600"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}