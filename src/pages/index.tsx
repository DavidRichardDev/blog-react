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
          {posts.map(post => (
            <a href={post.uid} key={post.id}>
              <h4>{post.data.title}</h4>
              <p>{post.data.subtitle}</p>
              <div>
                <time>
                  {format(new Date(post.last_publication_date), 'dd/MM/yyyy')}
                </time>
                <span>{post.data.author}</span>
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
  const posts = await client.getAllByType('post');
  console.log('postss', posts[0].data.title);
  return {
    props: { posts },
  };
};
