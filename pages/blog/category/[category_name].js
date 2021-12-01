import fs from 'fs'
// import Link from 'next/link'
import matter from 'gray-matter'
import path from 'path'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
import { capitalizeFirstLetter, sortByDate } from '@/utils/index'
import { getPosts } from '@/lib/posts'
import CategoryList from '@/components/CategoryList'

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  // const firstCapitalizedCategoryName =
  //   categoryName[0].toUpperCase() + categoryName.substring(1)

  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5'>
            Posts In {capitalizeFirstLetter(categoryName)}
          </h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12'>
            {posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </div>
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

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.toLowerCase()
  })

  // console.log(categories)
  const paths = categories.map((category) => ({
    params: { category_name: category },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { category_name } }) {
  // console.log(category_name)

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

  // Filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  )

  return {
    props: {
      // posts: categoryPosts.sort(sortByDate),
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  }
}
