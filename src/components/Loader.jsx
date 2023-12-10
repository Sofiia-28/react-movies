import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Circles
      height="80"
      width="80"
      color="#9b2d6a"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
