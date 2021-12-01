import Link from 'next/link'
import Image from 'next/image'
import CategoryLabel from './CategoryLabel'

export default function Post({ post, compact }) {
  // console.log(post)
  return (
    <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6 flex flex-col'>
      <div className='mb-4'>
        {!compact && (
          <Image
            src={post.frontmatter.cover_image}
            alt=''
            height={420}
            width={600}
            className='rounded'
          />
        )}
      </div>

      <div className='flex justify-between items-center'>
        <span className='font-light text-gray-600'>
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className='mt-4 flex-1'>
        <Link href={`/blog/${post.slug}`}>
          <a
            className='text-2xl text-gray-700 font-bold hover:underline'
            // onClick={() => show(false)}
          >
            {post.frontmatter.title}
          </a>
        </Link>
        <p className='mt-2 text-gray-600'>{post.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className='flex justify-between items-center mt-6'>
          <Link href={`/blog/${post.slug}`}>
            <a className='text-gray-900 hover:text-blue-600'>Read more</a>
          </Link>

          <div className='flex items-center'>
            <div className='mx-4 hidden md:flex'>
              <Image
                src={post.frontmatter.author_image}
                alt=''
                width={40}
                height={40}
                className='mx-4 object-cover rounded-full'
              />
            </div>
            <h3 className='text-gray-700 font-bold'>
              {post.frontmatter.author}
            </h3>
            {/* <img
          src={post.frontmatter.author_image}
          alt=''
          className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
        /> */}
          </div>
        </div>
      )}
    </div>
  )
}
