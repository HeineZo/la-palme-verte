import { Prisma } from '@prisma/client'

const FullBlogPost = Prisma.validator<Prisma.BlogPostArgs>()({
  include: {
    categories: true,
    author: true,
  },
})

export type FullBlogPost = Prisma.BlogPostGetPayload<typeof FullBlogPost>

export interface SocialMedia {
  facebook?: string;
  x?: string;
  linkedin?: string;
  mail?: string;
}
