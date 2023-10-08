'use client';

import { Avatar, Link } from '@nextui-org/react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { MouseEvent } from 'react';
import NextLink from 'next/link';
import {
  IconBrandFacebook as Facebook,
  IconBrandX as X,
  IconBrandLinkedin as Linkedin,
  IconMail as Mail,
} from '@tabler/icons-react';

export type Member = {
  name: string;
  role: string;
  avatar: string;
  description?: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    mail?: string;
  };
};

type Props = {
  member: Member;
};

export default function MemberCard({ member }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const getSocialIcon = (socialName: string) => {
    switch (socialName) {
      case 'facebook':
        return <Facebook />;
      case 'twitter':
        return <X />;
      case 'linkedin':
        return <Linkedin />;
      case 'mail':
        return <Mail />;
      default:
        return null;
    }
  };

  return (
    <div
      className="group relative max-w-md w-full rounded-medium bg-highlight border border-white px-8 py-16"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-medium opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(71, 108, 71, 0.25),
              transparent 80%
            )
          `,
        }}
      />
      <div className="flex flex-col items-center gap-5">
        <Avatar src={member.avatar} size="lg" className="w-20 h-20" />
        <div className="text-center">
          <p className="font-bold">{member.name}</p>
          <p>{member.role}</p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {Object.keys(member.socials).map((social, index) => (
            <Link
              key={index}
              href={member.socials[social as keyof typeof member.socials]}
              as={NextLink}
              className="text-black h-fit"
            >
              {getSocialIcon(social)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
