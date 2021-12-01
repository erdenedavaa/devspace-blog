import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'
import { useEffect } from 'react'
// const Prism = require('prismjs')
// const loadLanguages = require('prismjs/components/')
// loadLanguages(['javaScript'])

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     Prism.highlightAll()
  //   }
  // }, [])
  
  return (
    <Layout title={title}>
      <Link href='/blog'>Go Back</Link>
      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-5xl mb-6'>{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        {/* <img src={cover_image} alt='' className='w-full rounded' /> */}
        <Image
          src={cover_image}
          alt=''
          className='rounded w-full'
          layout='responsive'
          objectFit='cover'
          width='200'
          height='100'
        />

        <div className='max-w-screen-md mx-auto'>
          <div className='flex justify-between items-center bg-gray-100 p-4 my-8'>
            <div className='items-center flex space-x-4'>
              {/* <img src={author_image} alt="" className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block' /> */}
              <Image
                src={author_image}
                alt=''
                width={40}
                height={40}
                className='rounded-full hidden sm:flex object-cover'
              />
              <h4>{author}</h4>
            </div>
            <div>{date}</div>
          </div>

          <div className='blog-text mt-2'>
            <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  // console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  }
}
