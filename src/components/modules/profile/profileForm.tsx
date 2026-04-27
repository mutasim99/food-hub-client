"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Loader2, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Badge
} from "lucide-react";
import { toast } from "sonner";
import { updateMyProfile } from "@/actions/profile.action";
import { useRouter } from "next/navigation";

export default function ProfileForm({ profile }: { profile: any }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>(profile.image || "");
  const [name, setName] = useState(profile.name || "");
  const [phone, setPhone] = useState(profile.phone ? String(profile.phone) : "");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (file) formData.append("image", file);
      
      const result = await updateMyProfile(formData);
      if (result.error) toast.error(result.error);
      else {
        toast.success("Profile updated");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. PHOTO SECTION */}
      <section className="flex flex-col sm:flex-row items-center gap-6">
        <div 
          className="group relative h-24 w-24 shrink-0 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-zinc-800 bg-zinc-900 transition-colors group-hover:border-orange-500/50">
            {preview ? (
              <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-600"><User size={32} /></div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-full bg-orange-600 p-1.5 text-white shadow-lg">
            <Camera size={14} />
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-semibold text-zinc-200">Profile Picture</h4>
          <p className="text-xs text-zinc-500 mt-1">We support PNG, JPG or GIF (Max 2MB)</p>
        </div>
      </section>

      {/* 2. EDITABLE FIELDS SECTION */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <User size={12} className="text-orange-500" /> Full Name
          </label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="h-12 border-zinc-800 bg-zinc-900/50 focus:border-orange-500/40 focus:ring-0" 
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Phone size={12} className="text-orange-500" /> Phone Number
          </label>
          <Input 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="h-12 border-zinc-800 bg-zinc-900/50 focus:border-orange-500/40 focus:ring-0" 
            placeholder="+1 234 567 890"
          />
        </div>
      </section>

      {/* 3. ACCOUNT INFO (READ ONLY - FIXED OVERLAP) */}
      <section className="space-y-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6">
        <div className="flex items-center gap-2 text-zinc-400 mb-2">
          <ShieldCheck size={16} className="text-orange-500" />
          <h3 className="text-sm font-bold uppercase tracking-tighter">Account Security</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-zinc-600" />
            <div>
              <p className="text-[10px] font-bold uppercase text-zinc-500">Email Address</p>
              <p className="text-sm text-zinc-300 break-all">{profile.email}</p>
            </div>
          </div>
          <Badge values="outline" className="w-fit h-6 border-zinc-700 text-zinc-500 text-[10px]">VERIFIED</Badge>
        </div>

        <div className="flex items-center gap-3 py-1">
          <CheckCircle2 size={18} className="text-emerald-500/50" />
          <div>
            <p className="text-[10px] font-bold uppercase text-zinc-500">Account Status</p>
            <p className="text-sm text-emerald-400 font-medium">{profile.status || "ACTIVE"}</p>
          </div>
        </div>
      </section>

      {/* 4. ACTIONS */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
        <div className="hidden sm:flex items-center gap-2 text-zinc-500">
          <Info size={14} />
          <p className="text-xs">Your data is securely encrypted</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Button 
            type="submit" 
            disabled={loading}
            className="flex-1 sm:flex-none bg-orange-600 hover:bg-orange-500 text-white font-bold px-10 shadow-lg shadow-orange-600/20 transition-all active:scale-95 cursor-pointer"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Profile"}
          </Button>
        </div>
      </div>
    </form>
  );
}