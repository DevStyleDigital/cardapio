import { GetServerSideProps } from 'next';

const TypeMenu = ({ tipo }: any) => {
  return (
    <div>
      <h1>{tipo}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context?.params?.type;
  const menu = context?.params?.menu;
  return {
    props: {
      type,
    },
  };
};

export default TypeMenu;
