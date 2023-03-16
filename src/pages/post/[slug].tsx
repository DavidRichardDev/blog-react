import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import { createClient } from '../../services/prismic';

// import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
// import styles from './post.module.scss';

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
  console.log('props', props);

  const {
    post: { data },
  } = props;

  return (
    <div>
      <Header />
      <img src={data.banner.url} alt={data.title} />
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

  return {
    props: { post },
  };
};
