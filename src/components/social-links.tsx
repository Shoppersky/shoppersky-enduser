import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#40B86D] hover:text-white transition-colors"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#40B86D] hover:text-white transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#40B86D] hover:text-white transition-colors"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#40B86D] hover:text-white transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#40B86D] hover:text-white transition-colors"
      >
        <Youtube className="w-5 h-5" />
      </a>
    </div>
  );
}
