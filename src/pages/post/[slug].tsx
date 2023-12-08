import { GetStaticPaths, GetStaticProps } from 'next';
import { format } from 'date-fns';
import Header from '../../components/Header';
import { createClient } from '../../services/prismic';
// import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post(props: PostProps) {
  const {
    post: {
      data: { title, subtitle, author, banner, content },
      last_publication_date,
    },
  } = props;

  return (
    <div className={styles.postContent}>
      <Header />
      <img className={styles.banner} src={banner.url} alt={title} />
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div>
        <span>
          <time>{format(new Date(last_publication_date), 'dd/MM/yyyy')}</time>
          <span>{author}</span>
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.textPost}>
          <h4>{subtitle}</h4>
          {content.map(body => body.body.map(item => <p>{item.text}</p>))}
        </div>
      </div>
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType(TODO);

//   TO DO
// };

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], // indicates that no page needs be created at build time
    fallback: 'blocking', // indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({
  req,
  params,
}) => {
  const prismic = createClient({ req });
  const { slug } = params;

  const post = await prismic.getByUID('post', slug);
  // console.log('post', post);

  // : {
  //   data,
  //   last_publication_date: format(
  //     new Date(last_publication_date),
  //     'dd/MM/yyyy'
  //   ),
  // },

  return {
    props: {
      post,
    },
  };
};
