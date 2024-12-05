'use client';
import { usePostTodoMutation, useUpdateTodoMutation } from '@/redux/api/camera';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Webcam from 'react-webcam';

interface IDataTodo {
  name: string;
  url: string;
  price: number;
  file: FileList;
}

const WebCamera = () => {
  const { register, handleSubmit, reset } = useForm<IDataTodo>();
  const [uploadFile] = useUpdateTodoMutation();
  const [saveDataUrl] = usePostTodoMutation();
  const [imageUrl, setImageUrl] = useState<string>('');
  const webcamRef = useRef<Webcam | null>(null);

  const saveData: SubmitHandler<IDataTodo> = async (data) => {
    try {
      const file = data.file[0];
      const formData = new FormData();
      formData.append('file', file);
      const { data: responseFile } = await uploadFile(formData);
      const newData = {
        name: data.name,
        url: data.url,
        price: data.price,
        file: responseFile.url,
      };
      await saveDataUrl(newData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleScreenshot = () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        setImageUrl(screenshot);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(saveData)}>
        <input type="url" placeholder="Enter URL" {...register('url')} />
        <input type="text" placeholder="Name" {...register('name')} />
        <input type="number" placeholder="Price" {...register('price')} />
        <input type="file" {...register('file')} />
        <button type="submit">Submit</button>
      </form>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1920,
          height: 1080,
          facingMode: 'user',
        }}
        style={{ width: 500, height: 500 }}
      />
      <button onClick={handleScreenshot}>Take Screenshot</button>

      {imageUrl && <img src={imageUrl} alt="Captured" />}
    </div>
  );
};

export default WebCamera;
