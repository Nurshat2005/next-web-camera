'use client';
import { useGetTodoQuery } from '@/redux/api/camera';
import scss from './WEbPoster.module.scss';

const WEbPoster = () => {
  const { data } = useGetTodoQuery();
  return (
    <div className={scss.WEbPoster}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.posterTodo}>
            {data?.map((el) => (
              <div key={el.name}>
                <img src={el.file} alt="file" />
                <img src={el.url} alt="url" />
                <h1>{el.name}</h1>
                <h1>{el.price}$</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WEbPoster;
