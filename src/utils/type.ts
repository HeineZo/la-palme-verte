import { Prisma } from '@prisma/client'

const FullBlogPost = Prisma.validator<Prisma.BlogPostDefaultArgs>()({
  include: {
    categories: true,
    authors: true,
  },
})

const FullUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    posts: true,
    socials: true,
  },
})

const FullCategory = Prisma.validator<Prisma.CategoryDefaultArgs>()({
  include: {
    posts: true,
  },
})

const FullAlbum = Prisma.validator<Prisma.AlbumDefaultArgs>()({
  include: {
    author: true,
    photos: true,
  },
})

const FullPhoto = Prisma.validator<Prisma.PhotoDefaultArgs>()({
  include: {
    author: true,
    album: true,
  },
})

export type FullBlogPost = Prisma.BlogPostGetPayload<typeof FullBlogPost>
export type FullUser = Prisma.UserGetPayload<typeof FullUser>
export type FullCategory = Prisma.CategoryGetPayload<typeof FullCategory>
export type FullAlbum = Prisma.AlbumGetPayload<typeof FullAlbum>
export type FullPhoto = Prisma.PhotoGetPayload<typeof FullPhoto>
