import fs from 'fs'
import path from 'path'
// import Link from 'next/link'
// import matter from 'gray-matter'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
// import { sortByDate } from '@/utils/index'
import { POSTS_PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'
import { getPosts } from '@/lib/posts'
import CategoryList from '@/components/CategoryList'

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5'>Blog</h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12'>
            {posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }

  // console.log(paths) // blog/page/2

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Herev "page/index" өгөгдөөгүй бол default 1 өгьщ
  const page = parseInt((params && params.page_index) || 1)

  const files = fs.readdirSync(path.join('posts'))

  // console.log(files)
  // const posts = files.map((filename) => {
  //   const slug = filename.replace('.md', '')

  //   const markdownWithMeta = fs.readFileSync(
  //     path.join('posts', filename),
  //     'utf-8'
  //   )
  //   const { data: frontmatter } = matter(markdownWithMeta)

  //   return {
  //     slug,
  //     frontmatter,
  //   }
  // })
  const posts = getPosts()

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category)

  const uniqueCategories = [...new Set(categories)]

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts
    // .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)
  // console.log(posts)

  // console.log(page) // yaltachgui current page bn "blog/page/2" => 2

  // console.log(orderedPosts)

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  }
}
