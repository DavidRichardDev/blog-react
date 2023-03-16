// import { GetStaticProps } from 'next';
import { AnyARecord } from 'dns';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import Header from '../components/Header';

import { createClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={styles.container}>
        <Header />
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/post/${post.slug}`}>
              <a key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.subtitle}</p>
                <div>
                  <time>{post.publicationDate}</time>
                  <span>{post.author}</span>
                </div>
              </a>
            </Link>
          ))}

          {/* <a href="" />
          <a href="" /> */}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  // const postsResponse = await prismic.getByType('Post');
  const response = await client.getAllByType('post');

  const posts = response.map(post => {
    return {
      id: post.id,
      slug: post.uid,
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
      publicationDate: format(
        new Date(post.last_publication_date),
        'dd/MM/yyyy'
      ),
    };
  });

  return {
    props: { posts },
  };
};
