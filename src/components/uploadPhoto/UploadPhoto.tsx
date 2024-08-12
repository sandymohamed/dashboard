import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import PressedIcon from "@/assets/Pressed.svg?react";
import styles from "./uploadPhoto.module.css";
import { ChangeEvent, useRef, useState } from "react";
// import { updateUserImg } from "@/store/profile/ProfileSlice";
// import { useAppDispatch } from "@/store/hooks";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

const { container, uploadBox, hiddenInput, previewBox } = styles;
const UploadPhoto = <T extends FieldValues>({
  img,
  register,
  name,
  setValue,
}: {
  img: string | undefined;
  register: UseFormRegister<T>;
  name: Path<T>,
  setValue: (name: Path<T>, value: any) => void
}) => {
  const [preview, setPreview] = useState<string | undefined>(img);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const dispatch = useAppDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue(name, file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className={container}>
      <input
        type="file"
        accept="image/*"
        {...register(name)}
        onChange={handleFileChange}
        ref={fileInputRef}
        className={hiddenInput}
      />
      <div className={uploadBox}>
        <div className={previewBox}>
          {preview ? <img src={preview as string} alt="Preview" /> : <UserPhoto />}
        </div>
        <button onClick={handleButtonClick} type="button">
          <PressedIcon />
        </button>
      </div>
      <span>صورة الملف الشخصي</span>
    </section>
  );
};

export default UploadPhoto;
