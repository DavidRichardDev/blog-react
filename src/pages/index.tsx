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

export default function Home({
  postsPagination: { results, next_page },
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={styles.container}>
        <Header />
        <div className={styles.posts}>
          {results &&
            results.map(post => (
              <Link href={`/post/${post.uid}`}>
                <a key={post.id}>
                  <h4>{post.data.title}</h4>
                  <p>{post.data.subtitle}</p>
                  <div>
                    <time>{post.first_publication_date}</time>
                    <span>{post.data.author}</span>
                  </div>
                </a>
              </Link>
            ))}

          {next_page && (
            <button className={styles.seeMore}>Carregar mais posts</button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const response = await client.getByType('post');

  const posts: Post[] = response.results.map(post => {
    return {
      id: post.id,
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd/MM/yyyy'
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: posts,
      },
    },
  };
};
