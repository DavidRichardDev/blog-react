// import { GetStaticProps } from 'next';
import { AnyARecord } from 'dns';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
        <div className={styles.posts}>
          <img
            className={styles.logoSpaceTraveling}
            src="/images/spacetraveling.svg"
            alt="Logo"
          />
          {posts.map(post => (
            <a href={post.slug} key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.subtitle}</p>
              <div>
                <time>{post.publicationDate}</time>
                <span>{post.author}</span>
              </div>
            </a>
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
